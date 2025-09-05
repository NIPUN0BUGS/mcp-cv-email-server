#!/usr/bin/env node

// Debug script to identify the 400 error issue
const http = require('http');

async function testLocalAPI() {
  console.log('🔍 Testing Local API (http://localhost:3000)...\n');
  
  const testCases = [
    {
      name: 'Upload CV Test',
      data: {
        tool: 'upload_cv',
        arguments: {
          filename: 'test-cv.txt',
          content: 'John Doe\nSoftware Engineer\n\nExperience:\n- Senior Developer at Tech Corp\n- Full-stack development\n\nSkills:\n- JavaScript, React, Node.js\n- Python, Django\n\nEducation:\n- BS Computer Science, University of Tech',
          type: 'text/plain'
        }
      }
    },
    {
      name: 'Query CV Test',
      data: {
        tool: 'query_cv',
        arguments: {
          question: 'What are my technical skills?'
        }
      }
    },
    {
      name: 'Send Email Test',
      data: {
        tool: 'send_email',
        arguments: {
          recipient: 'test@example.com',
          subject: 'Test Email',
          body: 'This is a test email from the MCP server.'
        }
      }
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`📧 Testing: ${testCase.name}`);
      
      const result = await makeLocalRequest('/api/mcp', testCase.data);
      
      if (result.error) {
        console.log(`❌ ${testCase.name}: ${result.error}`);
      } else if (result.content && result.content[0]) {
        console.log(`✅ ${testCase.name}: ${result.content[0].text.substring(0, 100)}...`);
      } else {
        console.log(`⚠️  ${testCase.name}: Unexpected response format`);
        console.log('Response:', JSON.stringify(result, null, 2));
      }
    } catch (error) {
      console.log(`❌ ${testCase.name}: ${error.message}`);
      if (error.message.includes('ECONNREFUSED')) {
        console.log('💡 Local server not running. Start it with: npm run dev');
        break;
      }
    }
    console.log('');
  }
}

function makeLocalRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      
      console.log(`   Status: ${res.statusCode}`);
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode === 400) {
            console.log(`   Raw Response: ${body}`);
          }
          const result = JSON.parse(body);
          resolve(result);
        } catch (parseError) {
          console.log(`   Raw Response: ${body}`);
          reject(new Error(`Failed to parse response: ${parseError.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function checkEnvironmentVariables() {
  console.log('🔧 Environment Variables Check:\n');
  
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${varName === 'SMTP_PASS' ? '***hidden***' : value}`);
    } else {
      console.log(`❌ ${varName}: Not set`);
    }
  }
  console.log('');
}

async function main() {
  console.log('🚀 MCP 400 Error Debug Tool\n');
  
  await checkEnvironmentVariables();
  
  console.log('📋 Instructions:');
  console.log('1. Make sure your local server is running: npm run dev');
  console.log('2. Check that .env.local file exists with SMTP credentials');
  console.log('3. Test each API endpoint\n');
  
  await testLocalAPI();
  
  console.log('🔍 Common 400 Error Causes:');
  console.log('1. Missing "tool" parameter in request');
  console.log('2. Missing "arguments" parameter in request');
  console.log('3. Invalid JSON in request body');
  console.log('4. Missing required fields in arguments');
  console.log('5. Server validation errors');
}

if (require.main === module) {
  // Load environment variables from .env.local
  require('dotenv').config({ path: '.env.local' });
  main().catch(console.error);
}