# Getting Started with MCP CV Chat Server

## 🎯 What You've Built

A complete **Model Context Protocol (MCP) server** that:

- ✅ **Chats about your CV**: Load and parse resume files, then answer questions like "What role did I have at my last position?"
- ✅ **Sends email notifications**: Expose an endpoint to send emails (recipient, subject, body)
- ✅ **Next.js playground**: A minimal frontend to chat with the MCP server and trigger emails
- ✅ **MCP Protocol Compliant**: Follows the official Model Context Protocol specification

## 🚀 Quick Start (3 Steps)

### 1. Test the MCP Server
```bash
cd mcp-server
npm test
```

### 2. Run the Frontend Playground
```bash
cd frontend
npm run dev
```
Then visit: **http://localhost:3000**

### 3. Try the Demo
```bash
# From the root directory
npm run demo
```

## 🎮 Using the Playground

1. **Load your CV**: Enter the path to your CV file (try `../mcp-server/sample-cv.txt`)
2. **Ask questions**: "What role did I have at my last position?", "What are my skills?"
3. **Send emails**: Test the email functionality with any recipient

## 🔧 MCP Tools Available

| Tool | Description | Example |
|------|-------------|---------|
| `load_cv` | Load and parse a CV file | `{ "file_path": "./sample-cv.txt" }` |
| `query_cv` | Ask questions about CV content | `{ "question": "What are my skills?" }` |
| `send_email` | Send email notifications | `{ "recipient": "test@example.com", "subject": "Hello", "body": "Test" }` |

## 📁 Project Structure

```
mvp/
├── mcp-server/              # MCP Server
│   ├── simple-mcp-server.js # Main server (follows MCP spec)
│   ├── sample-cv.txt        # Sample CV for testing
│   ├── full-test.js         # Complete test suite
│   └── package.json         # Server dependencies
├── frontend/                # Next.js Playground
│   ├── app/page.tsx         # Main UI interface
│   ├── app/api/mcp/route.ts # Bridge to MCP server
│   └── package.json         # Frontend dependencies
├── README.md               # Detailed documentation
├── GETTING_STARTED.md      # This file
└── demo.js                 # Interactive demo
```

## 💻 Using with MCP Clients

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// Connect to server
const transport = new StdioClientTransport({
  command: 'node',
  args: ['./mcp-server/simple-mcp-server.js']
});

const client = new Client({
  name: 'cv-chat-client',
  version: '1.0.0'
}, { capabilities: {} });

await client.connect(transport);

// Load CV
await client.callTool({
  name: 'load_cv',
  arguments: { file_path: './sample-cv.txt' }
});

// Ask questions
const response = await client.callTool({
  name: 'query_cv',
  arguments: { question: 'What role did I have at my last position?' }
});

console.log(response.content[0].text);
```

## 📧 Email Configuration

The server uses **Mailtrap** for testing emails. For production:

1. Update SMTP settings in `mcp-server/simple-mcp-server.js`
2. Replace the `transporter` configuration with your email provider

```javascript
this.transporter = nodemailer.createTransport({
  host: "your-smtp-host.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-username",
    pass: "your-password"
  }
});
```

## 🧪 Testing

### Full Test Suite
```bash
cd mcp-server
npm test
```

### Manual Testing
```bash
# Test individual tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node simple-mcp-server.js
```

## 📝 CV Format Support

### Plain Text (Recommended)
```
John Doe
Software Engineer

Contact Information
Email: john.doe@email.com

Professional Experience
Senior Software Engineer - Tech Corp (2022-Present)
- Led development of microservices

Skills
JavaScript, Python, React
```

### JSON Format
```json
{
  "name": "John Doe",
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "period": "2022-Present"
    }
  ],
  "skills": ["JavaScript", "Python", "React"]
}
```

## 🎯 Example Questions

Try asking these questions about your CV:
- "What role did I have at my last position?"
- "What are my technical skills?"
- "Where did I go to university?"
- "What programming languages do I know?"
- "What companies have I worked for?"

## 🔍 Troubleshooting

### Common Issues

1. **"No CV loaded"**: Make sure to load a CV first using the `load_cv` tool
2. **File not found**: Use absolute paths or paths relative to the server directory
3. **Email not sending**: Check SMTP configuration and internet connection
4. **Frontend errors**: Ensure the MCP server path in the API route is correct

### Debug Mode

Add logging to the MCP server:
```javascript
console.error('Debug:', JSON.stringify(request, null, 2));
```

## 🎉 What's Next?

Your MCP server is fully functional! You can:

1. **Integrate with MCP clients** like Claude Desktop or other MCP-compatible tools
2. **Extend functionality** by adding more tools (calendar, file management, etc.)
3. **Deploy to production** with proper SMTP configuration
4. **Customize the frontend** with additional features

## 📚 Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs/learn/architecture)
- [MCP SDK on GitHub](https://github.com/modelcontextprotocol/sdk)
- [Next.js Documentation](https://nextjs.org/docs)

---

**🎊 Congratulations!** You've successfully built a complete MCP server with CV chat and email capabilities!