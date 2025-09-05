# 🚀 Deployment Guide

This guide covers deploying the MCP CV Chat Playground to Vercel with both the MCP server functionality and frontend integrated.

## 🚀 Quick Deploy to Vercel

### Option 1: Automated Deployment Script

Run the automated deployment script:

```bash
node deploy.js
```

This script will:
- Check and install Vercel CLI if needed
- Build the project
- Deploy to Vercel with production settings

### Option 2: Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

## 🔧 Project Structure

Your project is configured as a unified Next.js application that includes:

- **Frontend**: React/Next.js application in `/app`
- **MCP Server**: Integrated as API routes in `/app/api/mcp`
- **Configuration**: Optimized `vercel.json` for serverless deployment

## 📝 Configuration Files

### vercel.json
```json
{
  "name": "mcp-cv-chat-playground",
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "functions": {
    "app/api/mcp/route.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 🛠️ Fixing the HTTP 400 Error

The HTTP 400 error you encountered was caused by:

1. **Missing request validation** - Fixed with proper error handling
2. **CORS issues** - Added proper CORS headers
3. **Invalid tool parameters** - Enhanced parameter validation

### Key Fixes Applied:

1. **Enhanced Error Handling**:
   - Added request body validation
   - Improved parameter checking
   - Better error messages

2. **CORS Support**:
   - Added proper CORS headers
   - Implemented OPTIONS handler
   - Cross-origin request compatibility

3. **Request Validation**:
   - Validates tool parameter existence
   - Checks argument structure
   - Provides helpful error messages

## 🌐 Environment Variables

For production deployment, you can optionally set these environment variables in Vercel:

### Vercel Dashboard Setup:
1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add these optional variables:

```
NODE_ENV=production
MCP_PORT=3001
```

### For Email Functionality (Optional):
```
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password
```

## 🧪 Testing Your Deployment

After deployment, test these features:

### 1. CV Upload Test
- Upload a `.txt` file with your CV content
- Verify the success message appears
- Check that sections are properly parsed

### 2. CV Query Test
Try these sample questions:
- "What role did I have at my last position?"
- "What are my technical skills?"
- "Where did I go to university?"

### 3. Email Test
- Fill in recipient, subject, and body
- Send a test email
- Verify the confirmation message

## 🔍 Troubleshooting

### Common Issues and Solutions:

1. **Build Failures**:
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **API Route Issues**:
   - Check Vercel function logs in dashboard
   - Verify API route is accessible at `/api/mcp`
   - Test locally with `npm run dev`

3. **CV Processing Issues**:
   - Use `.txt` files for best compatibility
   - Ensure file size is under 4.5MB (Vercel limit)
   - Check file encoding is UTF-8

4. **CORS Errors**:
   - The updated API route includes CORS headers
   - Clear browser cache if issues persist

### Debug Steps:

1. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Functions
   - Click on your deployment
   - View real-time logs

2. **Local Testing**:
   ```bash
   npm run dev
   # Test at http://localhost:3000
   ```

3. **API Testing**:
   ```bash
   # Test API endpoint directly
   curl -X POST https://your-app.vercel.app/api/mcp \
     -H "Content-Type: application/json" \
     -d '{"tool":"debug_cv","arguments":{}}'
   ```

## 📊 Performance Optimization

The deployment is optimized for:

- **Fast Cold Starts**: Minimal dependencies in API routes
- **Efficient Bundling**: Next.js automatic optimization
- **Serverless Functions**: 30-second timeout for CV processing
- **Static Assets**: Optimized CSS and JavaScript

## 🎯 Next Steps After Deployment

1. **Test All Features**: Upload CV, ask questions, send emails
2. **Monitor Performance**: Check Vercel analytics
3. **Set Up Monitoring**: Use Vercel's built-in monitoring
4. **Custom Domain**: Add your custom domain in Vercel settings

## 🆘 Support

If you encounter issues:

1. **Check Vercel Logs**: Real-time function logs in dashboard
2. **Browser DevTools**: Check network tab for API errors
3. **Local Testing**: Run `npm run dev` to test locally
4. **File Format**: Ensure CV files are in `.txt` format

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Vercel Function Logs](https://vercel.com/docs/concepts/functions/serverless-functions#logs)

Your MCP CV Chat Playground is now ready for production use on Vercel! 🎉