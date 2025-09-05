#!/usr/bin/env node

// Debug script to test email functionality
const https = require('https');

const VERCEL_URL = 'https://mcp-cv-chat-playground-clwfocv87-nipun0bugs-projects.vercel.app';

async function testEmailAPI() {
  console.log('🔍 Testing Email API...\n');
  
  const testData = {
    tool: 'send_email',
    arguments: {
      recipient: 'debug@example.com',
      subject: 'Debug Test Email',
      body: 'This is a debug test to check if emails are working properly.'
    }
  };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'mcp-cv-chat-playground-clwfocv87-nipun0bugs-projects.vercel.app',
      path: '/api/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      console.log(`📡 Response Status: ${res.statusCode}`);
      console.log(`📡 Response Headers:`, res.headers);
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          console.log('\n📧 Email API Response:');
          console.log(JSON.stringify(result, null, 2));
          
          if (result.content && result.content[0]) {
            const message = result.content[0].text;
            console.log('\n📝 Response Message:');
            console.log(message);
            
            if (message.includes('✅ Real email sent successfully')) {
              console.log('\n🎉 SUCCESS: Real emails are being sent!');
              console.log('Check your Mailtrap inbox: https://mailtrap.io/inboxes/4009361/messages/');
            } else if (message.includes('📧 Demo mode')) {
              console.log('\n⚠️  DEMO MODE: Environment variables not configured');
              console.log('You need to add SMTP credentials to Vercel environment variables');
            } else if (message.includes('⚠️ Email sending failed')) {
              console.log('\n❌ EMAIL FAILED: SMTP configuration issue');
              console.log('Check your Mailtrap credentials');
            }
          }
          
          resolve(result);
        } catch (parseError) {
          console.error('❌ Failed to parse response:', body);
          reject(parseError);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function checkEnvironmentVariables() {
  console.log('🔧 Environment Variables Check:\n');
  console.log('To fix email issues, ensure these are set in Vercel:');
  console.log('1. Go to: https://vercel.com/nipun0bugs-projects/mcp-cv-chat-playground/settings/environment-variables');
  console.log('2. Add these variables:');
  console.log('   - SMTP_HOST: sandbox.smtp.mailtrap.io');
  console.log('   - SMTP_PORT: 2525');
  console.log('   - SMTP_USER: 428f43b7553983');
  console.log('   - SMTP_PASS: 681df25f8ee911');
  console.log('3. Make sure all environments are checked (Production, Preview, Development)');
  console.log('4. Wait for automatic redeployment\n');
}

async function main() {
  console.log('🚀 MCP Email Debug Tool\n');
  
  await checkEnvironmentVariables();
  
  try {
    await testEmailAPI();
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. If you see "Demo mode" - add environment variables to Vercel');
  console.log('2. If you see "Email sending failed" - check Mailtrap credentials');
  console.log('3. If you see "Real email sent" - check your Mailtrap inbox');
  console.log('4. Check Vercel function logs for detailed errors');
}

if (require.main === module) {
  main().catch(console.error);
}