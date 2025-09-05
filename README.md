# MCP CV Chat Playground

A Model Context Protocol (MCP) server that allows users to upload their CV/resume and chat with it using natural language queries. Built with Next.js, TypeScript, and integrated MCP functionality.

## 🚀 Quick Deploy to Vercel

Deploy your MCP CV Chat Playground in minutes:

```bash
# Option 1: Automated deployment
npm run deploy

# Option 2: Manual deployment
npm install -g vercel
vercel --prod
```

## ✨ Features

- 📄 **CV Upload & Processing**: Upload CV files in various formats (.txt, .json)
- 💬 **Natural Language Chat**: Ask questions about your CV using natural language
- 📧 **Email Integration**: Send emails with CV information (demo mode)
- 🔍 **Smart CV Parsing**: Automatically extracts sections like experience, education, skills
- 🌐 **Web Interface**: Clean, responsive web interface for easy interaction
- 🚀 **MCP Protocol**: Built on the Model Context Protocol standard
- ☁️ **Serverless Ready**: Optimized for Vercel deployment

## 🛠️ Fixed Issues

### HTTP 400 Error Resolution
The HTTP 400 error you encountered has been fixed with:

1. **Enhanced Request Validation**: Proper validation of tool parameters
2. **CORS Support**: Added CORS headers for cross-origin requests
3. **Better Error Handling**: Detailed error messages for debugging
4. **Request Structure Validation**: Validates JSON structure and required fields

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

4. **Test the API** (optional):
   ```bash
   npm run test-api
   ```

## 📖 Usage

### 1. Upload Your CV
- Click the upload area on the homepage
- Select your CV file (.txt format recommended)
- Click "Process CV" to parse and load your resume

### 2. Chat with Your CV
- Use the chat interface to ask questions about your CV
- Try questions like:
  - "What role did I have at my last position?"
  - "What are my technical skills?"
  - "Where did I go to university?"
  - "What programming languages do I know?"

### 3. Send Emails
- Use the email section to send information from your CV
- Fill in recipient, subject, and body
- Click "Send Email" (demo mode - no actual emails sent)

## 📁 File Format Support

### ✅ Recommended: Plain Text (.txt)
```
John Doe
Software Engineer

Experience:
- Senior Developer at Tech Corp (2020-2023)
- Full-stack development with React and Node.js

Skills:
- JavaScript, TypeScript, React
- Node.js, Express, MongoDB
- Python, Django

Education:
- BS Computer Science, University of Tech (2016-2020)
```

### ✅ Also Supported:
- **JSON**: Structured CV data
- **PDF**: Convert to text first (copy-paste content into .txt file)
- **DOC/DOCX**: Convert to text first (copy-paste content into .txt file)

## 🔧 Project Architecture

### Unified Next.js Application
```
mcp-cv-chat-playground/
├── app/                    # Next.js app directory
│   ├── api/mcp/           # MCP API routes (integrated server)
│   │   └── route.ts       # Main API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── mcp-server/            # Standalone MCP server (legacy)
├���─ frontend/              # Alternative frontend (legacy)
├── deploy.js              # Automated deployment script
├── test-deployment.js     # API testing script
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment config
└── DEPLOYMENT.md         # Detailed deployment guide
```

## 🌐 API Endpoints

The integrated MCP server provides these tools via `/api/mcp`:

### `upload_cv`
Upload and process a CV file
```json
{
  "tool": "upload_cv",
  "arguments": {
    "filename": "my-cv.txt",
    "content": "CV content here...",
    "type": "text/plain"
  }
}
```

### `query_cv`
Ask questions about the loaded CV
```json
{
  "tool": "query_cv",
  "arguments": {
    "question": "What are my technical skills?"
  }
}
```

### `send_email`
Send an email (demo mode)
```json
{
  "tool": "send_email",
  "arguments": {
    "recipient": "hr@company.com",
    "subject": "My CV Information",
    "body": "Here is my CV information..."
  }
}
```

### `debug_cv`
Get debug information about the loaded CV
```json
{
  "tool": "debug_cv",
  "arguments": {}
}
```

## 🚀 Deployment

### Automated Deployment
```bash
npm run deploy
```

### Manual Deployment
```bash
npm install -g vercel
vercel login
npm run build
vercel --prod
```

### Environment Variables (Optional)
Set these in your Vercel dashboard:
```env
NODE_ENV=production
MCP_PORT=3001
SMTP_HOST=smtp.mailtrap.io  # For email functionality
SMTP_PORT=2525
SMTP_USER=your_username
SMTP_PASS=your_password
```

## 🧪 Testing

### Local API Testing
```bash
npm run test-api
```

### Manual Testing Checklist
- [ ] Upload a .txt CV file
- [ ] Process the CV successfully
- [ ] Ask questions about the CV
- [ ] Test email functionality
- [ ] Verify mobile responsiveness

## 🔍 Troubleshooting

### Common Issues

1. **HTTP 400 Error** ✅ FIXED
   - Enhanced request validation
   - Added CORS headers
   - Better error messages

2. **File Upload Issues**
   - Use .txt files for best compatibility
   - Check file size (under 4.5MB for Vercel)
   - Ensure UTF-8 encoding

3. **CV Processing Issues**
   - Make sure CV content is in plain text
   - Check that sections are clearly labeled
   - Use the debug tool to see parsed content

4. **Deployment Issues**
   - Run `npm run build` to check for build errors
   - Verify all dependencies are installed
   - Check Vercel function logs

### Debug Commands
```bash
# Test locally
npm run dev

# Test API endpoints
npm run test-api

# Build and check for errors
npm run build

# Deploy with verbose output
vercel --prod --debug
```

## 📊 Performance Features

- **Serverless Functions**: 30-second timeout for CV processing
- **Optimized Bundling**: Next.js automatic optimization
- **Fast Cold Starts**: Minimal dependencies in API routes
- **CORS Support**: Cross-origin request compatibility
- **Error Handling**: Comprehensive error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with `npm run test-api`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter issues:

1. **Check the logs**: Vercel dashboard → Functions → Logs
2. **Test locally**: `npm run dev` and `npm run test-api`
3. **Review the deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
4. **File format**: Ensure CV files are in .txt format
5. **Create an issue**: With detailed error information

## 🔗 Useful Links

- [Live Demo](https://your-app.vercel.app) (after deployment)
- [Deployment Guide](DEPLOYMENT.md)
- [Vercel Documentation](https://vercel.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

🎉 **Your MCP CV Chat Playground is ready for deployment!**

Run `npm run deploy` to get started, or see [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.