# MCP CV Chat Playground

A Next.js application that demonstrates Model Context Protocol (MCP) functionality with CV/resume chat and email capabilities.

## Features

- 📄 **CV Upload & Processing**: Upload text files and get intelligent parsing
- 💬 **CV Chat**: Ask questions about your resume content
- 📧 **Email Notifications**: Send test emails (demo mode)
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js

## Live Demo

🚀 **[View Live Demo](https://your-app.vercel.app)**

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Usage

1. **Upload CV**: Click to upload a `.txt` file with your resume
2. **Ask Questions**: Try questions like:
   - "What are my technical skills?"
   - "What role did I have at my last position?"
   - "Where did I go to university?"
3. **Send Emails**: Test the email functionality (demo mode)

## Deployment

This app is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/mcp-cv-chat)

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: CSS Modules with modern design
- **API**: Next.js API Routes
- **Deployment**: Vercel (recommended)

## Environment Variables

Create a `.env.local` file:

```env
# Optional: Email configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## File Support

- ✅ **Text files (.txt)**: Full support with intelligent parsing
- ✅ **JSON files (.json)**: Structured CV data
- ⚠️ **PDF files**: Convert to text first (limitation of browser-based processing)

## API Endpoints

- `POST /api/mcp` - Main MCP tool handler
  - `upload_cv` - Process uploaded CV content
  - `query_cv` - Answer questions about CV
  - `send_email` - Send email notifications
  - `debug_cv` - Debug CV parsing (development)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Next.js and the Model Context Protocol