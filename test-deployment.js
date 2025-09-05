#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Test configuration
const TEST_CONFIG = {
  local: 'http://localhost:3000',
  // Replace with your actual Vercel URL after deployment
  production: 'https://your-app.vercel.app'
};

async function testAPI(baseUrl, testName) {
  console.log(`\n🧪 Testing ${testName} at ${baseUrl}`);
  
  const testCases = [
    {
      name: 'Upload CV Test',
      tool: 'upload_cv',
      arguments: {
        filename: 'test-cv.txt',
        content: 'John Doe\nSoftware Engineer\n\nExperience:\n- Senior Developer at Tech Corp\n- Full-stack development\n\nSkills:\n- JavaScript, React, Node.js\n- Python, Django\n\nEducation:\n- BS Computer Science, University of Tech',
        type: 'text/plain'
      }
    },
    {
      name: 'Query CV Test',
      tool: 'query_cv',
      arguments: {
        question: 'What are my technical skills?'
      }
    },
    {
      name: 'Send Email Test',
      tool: 'send_email',
      arguments: {
        recipient: 'test@example.com',
        subject: 'Test Email from MCP Server',
        body: 'This is a test email from the MCP CV Chat Playground.'
      }
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`  ⏳ ${testCase.name}...`);
      
      const result = await makeRequest(baseUrl + '/api/mcp', {
        tool: testCase.tool,
        arguments: testCase.arguments
      });

      if (result.error) {
        console.log(`  ❌ ${testCase.name}: ${result.error}`);
      } else if (result.content && result.content[0]) {
        console.log(`  ✅ ${testCase.name}: Success`);
        console.log(`     Response: ${result.content[0].text.substring(0, 100)}...`);
      } else {
        console.log(`  ⚠️  ${testCase.name}: Unexpected response format`);
      }
    } catch (error) {
      console.log(`  ❌ ${testCase.name}: ${error.message}`);
    }
  }
}

function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve(result);
        } catch (parseError) {
          reject(new Error(`Failed to parse response: ${body}`));
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

async function main() {
  console.log('🚀 MCP CV Chat Playground API Test Suite\n');
  
  // Test local development server
  try {
    await testAPI(TEST_CONFIG.local, 'Local Development');
  } catch (error) {
    console.log(`\n❌ Local test failed: ${error.message}`);
    console.log('💡 Make sure to run "npm run dev" in another terminal first');
  }

  // Instructions for production testing
  console.log('\n📝 To test your production deployment:');
  console.log('1. Deploy to Vercel using: node deploy.js');
  console.log('2. Update the production URL in this script');
  console.log('3. Run this script again to test production');
  
  console.log('\n🎯 Manual Testing Steps:');
  console.log('1. Open your deployed app in a browser');
  console.log('2. Upload a .txt file with CV content');
  console.log('3. Ask questions about your CV');
  console.log('4. Test the email functionality');
  
  console.log('\n🔧 Debugging Tips:');
  console.log('- Check browser developer tools for network errors');
  console.log('- View Vercel function logs in your dashboard');
  console.log('- Ensure CV files are in plain text format');
}

if (require.main === module) {
  main().catch(console.error);
}