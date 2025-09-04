#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 MCP CV Chat Deployment Script\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Run this script from the frontend directory.');
  process.exit(1);
}

// Check if git is initialized
if (!fs.existsSync('.git')) {
  console.log('📁 Initializing git repository...');
  execSync('git init', { stdio: 'inherit' });
}

// Check if vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI found');
} catch (error) {
  console.log('📦 Installing Vercel CLI...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

// Build the project
console.log('🔨 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Deploy to Vercel
console.log('🚀 Deploying to Vercel...');
try {
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('\n🎉 Deployment successful!');
  console.log('\n📋 Next steps:');
  console.log('1. Your app is now live on Vercel');
  console.log('2. Test the CV upload and chat functionality');
  console.log('3. Share your URL with others');
  console.log('4. Consider adding a custom domain');
} catch (error) {
  console.error('❌ Deployment failed');
  console.log('\n💡 Try manual deployment:');
  console.log('1. Go to https://vercel.com');
  console.log('2. Import your GitHub repository');
  console.log('3. Set root directory to "frontend"');
  process.exit(1);
}