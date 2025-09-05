#!/usr/bin/env node

// Simple test script to verify the frontend API works
async function testFrontendAPI() {
  console.log('🧪 Testing Frontend API...\n')

  const baseUrl = 'http://localhost:3000/api/mcp'

  try {
    // Test 1: Load CV
    console.log('1️⃣ Testing load_cv...')
    const loadResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'load_cv',
        arguments: { file_path: '../mcp-server/sample-cv.txt' }
      })
    })

    if (loadResponse.ok) {
      const loadResult = await loadResponse.json()
      console.log('✅ Load CV:', loadResult.content[0].text)
    } else {
      const error = await loadResponse.json()
      console.log('❌ Load CV Error:', error.error)
    }

    // Test 2: Query CV
    console.log('\n2️⃣ Testing query_cv...')
    const queryResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'query_cv',
        arguments: { question: 'What are my technical skills?' }
      })
    })

    if (queryResponse.ok) {
      const queryResult = await queryResponse.json()
      console.log('✅ Query CV:', queryResult.content[0].text.substring(0, 100) + '...')
    } else {
      const error = await queryResponse.json()
      console.log('❌ Query CV Error:', error.error)
    }

    // Test 3: Send Email
    console.log('\n3️⃣ Testing send_email...')
    const emailResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'send_email',
        arguments: {
          recipient: 'test@example.com',
          subject: 'Frontend API Test',
          body: 'This email was sent via the frontend API!'
        }
      })
    })

    if (emailResponse.ok) {
      const emailResult = await emailResponse.json()
      console.log('✅ Send Email:', emailResult.content[0].text)
    } else {
      const error = await emailResponse.json()
      console.log('❌ Send Email Error:', error.error)
    }

    console.log('\n🎉 Frontend API testing completed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('\n💡 Make sure the frontend is running:')
    console.log('   cd frontend && npm run dev')
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testFrontendAPI()
}