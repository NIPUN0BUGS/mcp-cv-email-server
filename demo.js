#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎯 MCP CV Chat Server Demo');
console.log('==========================\n');

console.log('This demo shows a complete Model Context Protocol (MCP) server that:');
console.log('✅ Follows the official MCP specification');
console.log('✅ Loads and parses CV/resume files');
console.log('✅ Answers questions about CV content');
console.log('✅ Sends email notifications');
console.log('✅ Includes a Next.js playground frontend\n');

console.log('📁 Project Structure:');
console.log('├── mcp-server/');
console.log('│   ├── simple-mcp-server.js  # Main MCP server');
console.log('│   ├── sample-cv.txt         # Sample CV for testing');
console.log('│   └── full-test.js          # Test suite');
console.log('├── frontend/                 # Next.js playground');
console.log('│   ├── app/page.tsx          # Main UI');
console.log('│   └─��� app/api/mcp/route.ts  # MCP bridge API');
console.log('└── README.md                 # Documentation\n');

console.log('🚀 Quick Start Commands:');
console.log('');
console.log('1. Test the MCP server:');
console.log('   cd mcp-server');
console.log('   npm test');
console.log('');
console.log('2. Run the MCP server:');
console.log('   cd mcp-server');
console.log('   npm start');
console.log('');
console.log('3. Run the frontend playground:');
console.log('   cd frontend');
console.log('   npm run dev');
console.log('   # Then visit http://localhost:3000');
console.log('');

console.log('🔧 MCP Tools Available:');
console.log('');
console.log('• load_cv - Load and parse a CV file');
console.log('  Example: { "file_path": "./sample-cv.txt" }');
console.log('');
console.log('• query_cv - Ask questions about the loaded CV');
console.log('  Example: { "question": "What role did I have at my last position?" }');
console.log('');
console.log('• send_email - Send email notifications');
console.log('  Example: { "recipient": "test@example.com", "subject": "Hello", "body": "Test message" }');
console.log('');

console.log('💡 Example Usage with MCP Client:');
console.log('');
console.log('```javascript');
console.log('import { Client } from "@modelcontextprotocol/sdk/client/index.js";');
console.log('import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";');
console.log('');
console.log('const transport = new StdioClientTransport({');
console.log('  command: "node",');
console.log('  args: ["./mcp-server/simple-mcp-server.js"]');
console.log('});');
console.log('');
console.log('const client = new Client({');
console.log('  name: "cv-chat-client",');
console.log('  version: "1.0.0"');
console.log('}, { capabilities: {} });');
console.log('');
console.log('await client.connect(transport);');
console.log('');
console.log('// Load CV');
console.log('await client.callTool({');
console.log('  name: "load_cv",');
console.log('  arguments: { file_path: "./sample-cv.txt" }');
console.log('});');
console.log('');
console.log('// Ask question');
console.log('const response = await client.callTool({');
console.log('  name: "query_cv",');
console.log('  arguments: { question: "What are my skills?" }');
console.log('});');
console.log('```');
console.log('');

console.log('📧 Email Configuration:');
console.log('The server is configured with Mailtrap for testing.');
console.log('Update the SMTP settings in simple-mcp-server.js for production use.');
console.log('');

console.log('🎮 Interactive Playground:');
console.log('The Next.js frontend provides a user-friendly interface to:');
console.log('• Load CV files');
console.log('• Chat about CV content');
console.log('• Send test emails');
console.log('• View responses in real-time');
console.log('');

console.log('🔍 Testing the Server:');
console.log('Run the full test suite to verify all functionality:');

async function runQuickTest() {
  console.log('\n⚡ Running Quick Test...\n');
  
  const serverPath = path.join(__dirname, 'mcp-server', 'simple-mcp-server.js');
  const mcpProcess = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let responseData = '';

  mcpProcess.stdout.on('data', (data) => {
    responseData += data.toString();
  });

  mcpProcess.stderr.on('data', (data) => {
    console.log('Server started:', data.toString().trim());
  });

  // Test tools/list
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  };

  mcpProcess.stdin.write(JSON.stringify(request) + '\n');
  mcpProcess.stdin.end();

  setTimeout(() => {
    mcpProcess.kill();
    
    if (responseData) {
      try {
        const lines = responseData.trim().split('\n');
        for (const line of lines) {
          if (line.trim() && line.startsWith('{')) {
            const response = JSON.parse(line);
            if (response.result && response.result.tools) {
              console.log(`✅ MCP Server is working! Found ${response.result.tools.length} tools:`);
              response.result.tools.forEach(tool => {
                console.log(`   • ${tool.name} - ${tool.description}`);
              });
            }
            break;
          }
        }
      } catch (e) {
        console.log('❌ Error parsing response');
      }
    }
    
    console.log('\n🎉 Your MCP CV Chat Server is ready to use!');
    console.log('\nNext steps:');
    console.log('1. cd mcp-server && npm test    # Run full test suite');
    console.log('2. cd frontend && npm run dev   # Start the playground');
    console.log('3. Visit http://localhost:3000  # Try the web interface');
    
  }, 2000);
}

runQuickTest();