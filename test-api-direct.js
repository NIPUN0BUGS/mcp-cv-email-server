#!/usr/bin/env node

// Direct test of the API without the frontend
async function testAPI() {
  console.log('🧪 Testing API directly...\n')

  const testCV = `John Doe
Software Engineer

Contact Information
Email: john@example.com
Phone: 555-0123

Professional Experience
Senior Developer - TechCorp (2020-Present)
- Built web applications
- Led development team

Skills
JavaScript, Python, React, Node.js

Education
Computer Science Degree - MIT (2018)`

  try {
    // Test upload_cv
    console.log('1️⃣ Testing upload_cv...')
    const uploadResponse = await fetch('http://localhost:3000/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'upload_cv',
        arguments: {
          filename: 'test-cv.txt',
          content: testCV,
          type: 'text/plain'
        }
      })
    })

    if (uploadResponse.ok) {
      const uploadResult = await uploadResponse.json()
      console.log('✅ Upload CV:', uploadResult.content?.[0]?.text || 'Success')
    } else {
      const error = await uploadResponse.text()
      console.log('❌ Upload CV Error:', uploadResponse.status, error)
      return
    }

    // Test query_cv
    console.log('\n2️⃣ Testing query_cv...')
    const queryResponse = await fetch('http://localhost:3000/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'query_cv',
        arguments: { question: 'What are my technical skills?' }
      })
    })

    if (queryResponse.ok) {
      const queryResult = await queryResponse.json()
      console.log('✅ Query CV:', queryResult.content?.[0]?.text || 'Success')
    } else {
      const error = await queryResponse.text()
      console.log('❌ Query CV Error:', queryResponse.status, error)
    }

    // Test send_email
    console.log('\n3️⃣ Testing send_email...')
    const emailResponse = await fetch('http://localhost:3000/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'send_email',
        arguments: {
          recipient: 'test@example.com',
          subject: 'API Test',
          body: 'This is a test email from the API'
        }
      })
    })

    if (emailResponse.ok) {
      const emailResult = await emailResponse.json()
      console.log('✅ Send Email:', emailResult.content?.[0]?.text || 'Success')
    } else {
      const error = await emailResponse.text()
      console.log('❌ Send Email Error:', emailResponse.status, error)
    }

    console.log('\n🎉 API testing completed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('\n💡 Make sure the frontend is running:')
    console.log('   cd frontend && npm run dev')
  }
}

testAPI()