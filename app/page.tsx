'use client'

import { useState } from 'react'

interface MCPResponse {
  content?: Array<{ type: string; text: string }>
  error?: string
}

export default function Home() {
  const [cvQuestion, setCvQuestion] = useState('')
  const [cvResponse, setCvResponse] = useState<string>('')
  const [cvLoading, setCvLoading] = useState(false)
  
  const [emailRecipient, setEmailRecipient] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [emailResponse, setEmailResponse] = useState<string>('')
  const [emailLoading, setEmailLoading] = useState(false)
  
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [loadCvResponse, setLoadCvResponse] = useState<string>('')
  const [loadCvLoading, setLoadCvLoading] = useState(false)

  // Mock MCP client - in a real implementation, this would connect to the MCP server
  const callMCPTool = async (toolName: string, args: any): Promise<MCPResponse> => {
    // Simulate API call to MCP server
    // In a real implementation, you would use the MCP client SDK
    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: toolName,
          arguments: args,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      return { error: `Failed to call MCP tool: ${error}` }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCvFile(file)
      setLoadCvResponse('')
    }
  }

  const handleLoadCV = async () => {
    if (!cvFile) {
      setLoadCvResponse('Please select a CV file to upload')
      return
    }

    setLoadCvLoading(true)
    setLoadCvResponse('')

    try {
      console.log('Processing file:', cvFile.name, 'Size:', cvFile.size, 'Type:', cvFile.type)
      
      // Read file content
      const fileContent = await cvFile.text()
      console.log('File content length:', fileContent.length)
      
      const result = await callMCPTool('upload_cv', { 
        filename: cvFile.name,
        content: fileContent,
        type: cvFile.type
      })
      
      console.log('MCP Tool result:', result)
      
      if (result.error) {
        setLoadCvResponse(`Error: ${result.error}`)
      } else if (result.content && result.content[0]) {
        setLoadCvResponse(result.content[0].text)
      } else {
        setLoadCvResponse('CV processed successfully, but no response content received')
      }
    } catch (error) {
      console.error('Load CV Error:', error)
      setLoadCvResponse(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoadCvLoading(false)
    }
  }

  const handleCvQuestion = async () => {
    if (!cvQuestion.trim()) {
      setCvResponse('Please enter a question')
      return
    }

    setCvLoading(true)
    setCvResponse('')

    try {
      const result = await callMCPTool('query_cv', { question: cvQuestion })
      
      if (result.error) {
        setCvResponse(`Error: ${result.error}`)
      } else if (result.content && result.content[0]) {
        setCvResponse(result.content[0].text)
      } else {
        setCvResponse('No response received')
      }
    } catch (error) {
      setCvResponse(`Error: ${error}`)
    } finally {
      setCvLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!emailRecipient.trim() || !emailSubject.trim() || !emailBody.trim()) {
      setEmailResponse('Please fill in all email fields')
      return
    }

    setEmailLoading(true)
    setEmailResponse('')

    try {
      const result = await callMCPTool('send_email', {
        recipient: emailRecipient,
        subject: emailSubject,
        body: emailBody,
      })
      
      if (result.error) {
        setEmailResponse(`Error: ${result.error}`)
      } else if (result.content && result.content[0]) {
        setEmailResponse(result.content[0].text)
      } else {
        setEmailResponse('Email sent successfully')
      }
    } catch (error) {
      setEmailResponse(`Error: ${error}`)
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>MCP CV Chat Playground</h1>
        <p>Upload your CV and chat with it using Model Context Protocol</p>
      </div>

      {/* Load CV Section */}
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#374151' }}>Upload CV/Resume</h2>
        <div className="input-group">
          <label htmlFor="cvFile">Choose CV File:</label>
          <div 
            className="file-upload"
            onClick={() => document.getElementById('cvFile')?.click()}
          >
            <input
              id="cvFile"
              type="file"
              accept=".txt,.json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            {cvFile ? (
              <div>
                <strong>📄 {cvFile.name}</strong>
                <br />
                <small>Size: {(cvFile.size / 1024).toFixed(1)} KB</small>
                {cvFile.name.toLowerCase().endsWith('.pdf') && (
                  <div style={{ marginTop: '8px', padding: '8px', background: '#fff3cd', borderRadius: '4px', fontSize: '12px' }}>
                    ⚠️ PDF files need to be converted to text format for processing
                  </div>
                )}
              </div>
            ) : (
              <div>
                <strong>📁 Click to upload your CV</strong>
                <br />
                <small>Best: .txt files | Also supports: .json</small>
                <br />
                <small style={{ color: '#666' }}>For PDF/DOC: Copy text and save as .txt file</small>
              </div>
            )}
          </div>
        </div>
        <button 
          className="btn" 
          onClick={handleLoadCV}
          disabled={loadCvLoading || !cvFile}
        >
          {loadCvLoading && <span className="loading"></span>}
          {cvFile ? 'Process CV' : 'Select CV First'}
        </button>
        {loadCvResponse && (
          <div className={`response ${loadCvResponse.startsWith('Error:') ? 'error' : 'success'}`}>
            {loadCvResponse}
          </div>
        )}
      </div>

      <div className="chat-container">
        {/* CV Chat Section */}
        <div className="card">
          <h2 style={{ marginBottom: '20px', color: '#374151' }}>CV Chat</h2>
          <div className="input-group">
            <label htmlFor="cvQuestion">Ask about your CV:</label>
            <textarea
              id="cvQuestion"
              value={cvQuestion}
              onChange={(e) => setCvQuestion(e.target.value)}
              placeholder="e.g., What role did I have at my last position?"
            />
          </div>
          <button 
            className="btn" 
            onClick={handleCvQuestion}
            disabled={cvLoading}
          >
            {cvLoading && <span className="loading"></span>}
            Ask Question
          </button>
          {cvResponse && (
            <div className={`response ${cvResponse.startsWith('Error:') ? 'error' : ''}`}>
              {cvResponse}
            </div>
          )}
        </div>

        {/* Email Section */}
        <div className="card">
          <h2 style={{ marginBottom: '20px', color: '#374151' }}>Send Email</h2>
          <div className="input-group">
            <label htmlFor="emailRecipient">Recipient:</label>
            <input
              id="emailRecipient"
              type="email"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailSubject">Subject:</label>
            <input
              id="emailSubject"
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailBody">Body:</label>
            <textarea
              id="emailBody"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Email content..."
            />
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={handleSendEmail}
            disabled={emailLoading}
          >
            {emailLoading && <span className="loading"></span>}
            Send Email
          </button>
          {emailResponse && (
            <div className={`response ${emailResponse.startsWith('Error:') ? 'error' : 'success'}`}>
              {emailResponse}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: '#374151' }}>How to Use</h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>Upload your CV:</strong> Click the upload area and select your CV file (.txt, .pdf, .doc, .docx, .json)</li>
          <li><strong>Process CV:</strong> Click "Process CV" to load and parse your resume</li>
          <li><strong>Ask questions:</strong> Use the chat section to ask about your CV content</li>
          <li><strong>Send emails:</strong> Test the email functionality with any recipient</li>
        </ol>
        
        <div style={{ marginTop: '16px', padding: '12px', background: '#e3f2fd', borderRadius: '6px', border: '1px solid #2196f3' }}>
          <strong>💡 Try these questions:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>"What role did I have at my last position?"</li>
            <li>"What are my technical skills?"</li>
            <li>"Where did I go to university?"</li>
            <li>"What programming languages do I know?"</li>
          </ul>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '6px' }}>
          <strong>📧 Email Testing:</strong> The server uses Mailtrap for testing. 
          Emails won't be delivered but you'll see confirmation messages.
        </div>
      </div>
    </div>
  )
}