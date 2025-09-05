#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('📦 Installing Vercel CLI...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI. Please install it manually: npm install -g vercel');
    process.exit(1);
  }
}

// Build the project
console.log('\n🔨 Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (buildError) {
  console.error('❌ Build failed. Please fix the build errors and try again.');
  process.exit(1);
}

// Deploy to Vercel
console.log('\n🌐 Deploying to Vercel...');
try {
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('\n✅ Deployment completed successfully!');
  console.log('\n🎉 Your MCP CV Chat Playground is now live on Vercel!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the CV upload functionality');
  console.log('2. Try asking questions about your CV');
  console.log('3. Test the email functionality');
  console.log('\n💡 If you encounter any issues:');
  console.log('- Check the Vercel function logs in your dashboard');
  console.log('- Ensure your CV files are in .txt format for best results');
  console.log('- Use the browser developer tools to debug API calls');
} catch (deployError) {
  console.error('❌ Deployment failed. Please check the error messages above.');
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Make sure you\'re logged into Vercel: vercel login');
  console.log('2. Check your project settings in vercel.json');
  console.log('3. Verify all dependencies are properly installed');
  process.exit(1);
}