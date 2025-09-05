import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { createServer } from 'http'
import { parse } from 'url'

// MCP Server configuration
const MCP_PORT = process.env.MCP_PORT || 3001

// Simple in-memory CV storage for the demo
let cvData: any = null

function parseCV(text: string) {
  try {
    const sections: any = {}
    const lines = text.split('\n').map(line => line.trim()).filter(line => line)
    
    let currentSection = 'general'
    sections[currentSection] = []

    for (const line of lines) {
      const lowerLine = line.toLowerCase()
      if (lowerLine.includes('experience') || lowerLine.includes('work history')) {
        currentSection = 'experience'
        sections[currentSection] = []
      } else if (lowerLine.includes('education')) {
        currentSection = 'education'
        sections[currentSection] = []
      } else if (lowerLine.includes('skills')) {
        currentSection = 'skills'
        sections[currentSection] = []
      } else if (lowerLine.includes('contact') || lowerLine.includes('personal')) {
        currentSection = 'contact'
        sections[currentSection] = []
      } else {
        sections[currentSection].push(line)
      }
    }

    return sections
  } catch (error) {
    console.error('Parse CV Error:', error)
    return { general: [text] }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Add CORS headers for better compatibility
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const body = await request.json()
    
    // Validate request structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400, headers }
      )
    }

    const { tool, arguments: args } = body
    
    // Validate required fields
    if (!tool || typeof tool !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid tool parameter' },
        { status: 400, headers }
      )
    }

    console.log('API Call:', tool, 'Args keys:', Object.keys(args || {}))

    let result
    switch (tool) {
      case 'upload_cv':
        result = await handleUploadCV(args)
        break
      case 'query_cv':
        result = await handleQueryCV(args)
        break
      case 'debug_cv':
        result = await handleDebugCV(args)
        break
      case 'send_email':
        result = await handleSendEmail(args)
        break
      default:
        return NextResponse.json(
          { error: `Unknown tool: ${tool}. Available tools: upload_cv, query_cv, debug_cv, send_email` },
          { status: 400, headers }
        )
    }

    // Return result with headers
    return result
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: `API error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }}
    )
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

async function handleUploadCV(args: any) {
  try {
    console.log('handleUploadCV called with args:', args)
    
    if (!args) {
      throw new Error('No arguments provided')
    }

    const { filename, content, type } = args
    
    if (!filename || !content) {
      throw new Error('Missing filename or content')
    }

    console.log('Processing CV:', filename, 'Content length:', content.length, 'Type:', type)

    // Parse the uploaded content
    const ext = path.extname(filename).toLowerCase()

    if (ext === '.json') {
      try {
        cvData = JSON.parse(content)
      } catch (jsonError) {
        throw new Error(`Invalid JSON format: ${jsonError}`)
      }
    } else if (ext === '.pdf') {
      // For PDF files, we can't extract text directly in the browser
      // In a real implementation, you'd use a PDF parsing library like pdf-parse
      // For now, we'll provide a helpful message and suggest using text files
      return NextResponse.json({
        error: 'PDF files cannot be processed directly. Please convert your PDF to a text file (.txt) or copy and paste the content into a text file for upload. This is a limitation of the current demo implementation.'
      }, { status: 400 })
    } else {
      // Check if content looks like binary data (common with PDF/DOC files)
      const isBinary = content.includes('\0') || content.includes('�') || 
                      (content.length > 100 && content.split('').filter((c: string) => c.charCodeAt(0) > 127).length > content.length * 0.3)
      
      if (isBinary) {
        return NextResponse.json({
          error: `The file "${filename}" appears to contain binary data and cannot be processed as text. Please use a plain text file (.txt) or convert your document to text format.`
        }, { status: 400 })
      }

      // Treat as plain text and parse
      cvData = {
        raw_text: content,
        parsed_sections: parseCV(content)
      }
    }

    console.log('CV processed successfully. Sections:', Object.keys(cvData.parsed_sections || {}))
    console.log('Sample content from each section:')
    Object.entries(cvData.parsed_sections || {}).forEach(([section, lines]) => {
      console.log(`  ${section}:`, Array.isArray(lines) ? lines.slice(0, 2) : lines)
    })

    // Provide more detailed feedback about what was found
    const sections = cvData.parsed_sections || {}
    const sectionSummary = Object.entries(sections).map(([section, lines]) => {
      const count = Array.isArray(lines) ? lines.length : 0
      return `${section} (${count} items)`
    }).join(', ')

    return NextResponse.json({
      content: [
        {
          type: 'text',
          text: `CV "${filename}" uploaded and processed successfully! Found sections: ${sectionSummary}. Total content length: ${content.length} characters. Ready to answer questions about your resume.`
        }
      ]
    })
  } catch (error) {
    console.error('Upload CV Error:', error)
    return NextResponse.json(
      { error: `Failed to process uploaded CV: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

async function handleQueryCV(args: any) {
  try {
    console.log('handleQueryCV called with args:', args)
    
    const { question } = args

    if (!cvData) {
      return NextResponse.json(
        { error: 'No CV loaded. Please upload a CV first.' },
        { status: 400 }
      )
    }

    const lowerQuestion = question.toLowerCase()
    let response = ''

    if (lowerQuestion.includes('last position') || lowerQuestion.includes('recent job') || lowerQuestion.includes('current role')) {
      const experience = cvData.parsed_sections?.experience || []
      if (experience.length > 0) {
        response = `Based on your CV, your most recent position information: ${experience[0]}`
      } else {
        response = 'I could not find specific information about your last position in the loaded CV.'
      }
    } else if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('university')) {
      const education = cvData.parsed_sections?.education || []
      if (education.length > 0) {
        response = `Your education background: ${education.join(', ')}`
      } else {
        response = 'I could not find specific education information in the loaded CV.'
      }
    } else if (lowerQuestion.includes('skills') || lowerQuestion.includes('technologies')) {
      const skills = cvData.parsed_sections?.skills || []
      if (skills.length > 0) {
        response = `Your skills include: ${skills.join(', ')}`
      } else {
        response = 'I could not find specific skills information in the loaded CV.'
      }
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('phone')) {
      const contact = cvData.parsed_sections?.contact || []
      if (contact.length > 0) {
        response = `Your contact information: ${contact.join(', ')}`
      } else {
        response = 'I could not find specific contact information in the loaded CV.'
      }
    } else {
      // General search
      const allText = cvData.raw_text || JSON.stringify(cvData)
      const searchTerms = question.split(' ').filter((term: string) => term.length > 2)
      const relevantLines: string[] = []

      for (const term of searchTerms) {
        try {
          const regex = new RegExp(term, 'gi')
          const lines = allText.split('\n')
          for (const line of lines) {
            if (line.toLowerCase().includes(term.toLowerCase()) && !relevantLines.includes(line)) {
              relevantLines.push(line.trim())
            }
          }
        } catch (regexError) {
          console.warn('Regex error for term:', term, regexError)
        }
      }

      if (relevantLines.length > 0) {
        response = `Based on your question "${question}", here's what I found in your CV:\n${relevantLines.slice(0, 3).join('\n')}`
      } else {
        response = `I couldn't find specific information related to "${question}" in your CV. Try asking about experience, education, skills, or contact information.`
      }
    }

    return NextResponse.json({
      content: [
        {
          type: 'text',
          text: response
        }
      ]
    })
  } catch (error) {
    console.error('Query CV Error:', error)
    return NextResponse.json(
      { error: `Failed to query CV: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

async function handleDebugCV(args: any) {
  try {
    if (!cvData) {
      return NextResponse.json(
        { error: 'No CV loaded. Please upload a CV first.' },
        { status: 400 }
      )
    }

    const debugInfo = {
      hasRawText: !!cvData.raw_text,
      rawTextLength: cvData.raw_text?.length || 0,
      rawTextPreview: cvData.raw_text?.substring(0, 200) + '...',
      sections: Object.keys(cvData.parsed_sections || {}),
      sectionDetails: Object.entries(cvData.parsed_sections || {}).map(([section, lines]) => ({
        section,
        count: Array.isArray(lines) ? lines.length : 0,
        preview: Array.isArray(lines) ? lines.slice(0, 2) : lines
      }))
    }

    return NextResponse.json({
      content: [
        {
          type: 'text',
          text: `Debug Info for loaded CV:
          
Raw Text: ${debugInfo.hasRawText ? 'Yes' : 'No'} (${debugInfo.rawTextLength} characters)
Preview: ${debugInfo.rawTextPreview}

Sections Found: ${debugInfo.sections.join(', ')}

Section Details:
${debugInfo.sectionDetails.map(s => `- ${s.section}: ${s.count} items - ${JSON.stringify(s.preview)}`).join('\n')}

This debug info shows exactly what was extracted from your CV file.`
        }
      ]
    })
  } catch (error) {
    console.error('Debug CV Error:', error)
    return NextResponse.json(
      { error: `Failed to debug CV: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

async function handleSendEmail(args: any) {
  try {
    console.log('handleSendEmail called with args:', args)
    
    const { recipient, subject, body } = args

    if (!recipient || !subject || !body) {
      throw new Error('Missing required email fields: recipient, subject, or body')
    }

    // Check if we have SMTP configuration for real email sending
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      // Real email sending with nodemailer
      try {
        const nodemailer = require('nodemailer')
        
        const transporter = nodemailer.createTransporter({
          host: smtpHost,
          port: parseInt(smtpPort),
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        })

        const mailOptions = {
          from: `"MCP CV Chat" <${smtpUser}>`,
          to: recipient,
          subject: subject,
          text: body,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Email from MCP CV Chat Playground</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <pre style="white-space: pre-wrap; font-family: inherit;">${body}</pre>
              </div>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="color: #666; font-size: 12px;">
                This email was sent from the MCP CV Chat Playground application.
                <br>Timestamp: ${new Date().toISOString()}
              </p>
            </div>
          `
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Real email sent successfully:', info.messageId)
        
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: `✅ Real email sent successfully to ${recipient}! Subject: "${subject}". Message ID: ${info.messageId}. Check your Mailtrap inbox!`
            }
          ]
        })
      } catch (emailError) {
        console.error('Real email sending failed:', emailError)
        // Fall back to demo mode if real email fails
        const messageId = `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@mcp-server.example.com>`
        
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: `⚠️ Email sending failed (${emailError instanceof Error ? emailError.message : String(emailError)}). Demo mode: Email "sent" to ${recipient}! Subject: "${subject}". Message ID: ${messageId}`
            }
          ]
        })
      }
    } else {
      // Demo mode - no SMTP configuration
      const messageId = `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@mcp-server.example.com>`
      
      console.log('Demo mode: Simulating email send to:', recipient)
      
      return NextResponse.json({
        content: [
          {
            type: 'text',
            text: `📧 Demo mode: Email "sent" to ${recipient}! Subject: "${subject}". Message ID: ${messageId}. (Configure SMTP environment variables to send real emails to Mailtrap)`
          }
        ]
      })
    }
  } catch (error) {
    console.error('Send Email Error:', error)
    return NextResponse.json(
      { error: `Failed to send email: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
