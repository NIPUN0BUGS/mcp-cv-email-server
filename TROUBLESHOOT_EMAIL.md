# 🔍 Email Troubleshooting Guide

## Issue Identified: Vercel Authentication Protection

Your API is returning a 401 authentication error, which means Vercel has deployment protection enabled. This is blocking external API calls.

## Quick Fix Options:

### Option 1: Test Directly in Browser (Recommended)

1. **Go to your app**: https://mcp-cv-chat-playground-clwfocv87-nipun0bugs-projects.vercel.app
2. **Use the web interface** to test email sending
3. **Fill out the Send Email form**:
   - **Recipient**: `test@example.com`
   - **Subject**: `Mailtrap Test`
   - **Body**: `Testing email from MCP CV Chat`
4. **Click "Send Email"**
5. **Check the response message**

### Option 2: Disable Vercel Protection (Temporary)

1. **Go to Vercel Dashboard**: https://vercel.com/nipun0bugs-projects/mcp-cv-chat-playground
2. **Click "Settings"** tab
3. **Click "Deployment Protection"** in sidebar
4. **Disable protection** temporarily for testing
5. **Test the API** again

### Option 3: Add Environment Variables First

Even with protection, you should add the SMTP environment variables:

1. **Go to**: https://vercel.com/nipun0bugs-projects/mcp-cv-chat-playground/settings/environment-variables
2. **Add these 4 variables**:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `sandbox.smtp.mailtrap.io` |
| `SMTP_PORT` | `2525` |
| `SMTP_USER` | `428f43b7553983` |
| `SMTP_PASS` | `681df25f8ee911` |

3. **Check all environments** (Production, Preview, Development)
4. **Wait for auto-redeploy** (1-2 minutes)

## Testing Steps:

### Step 1: Add Environment Variables
Complete Option 3 above first.

### Step 2: Test in Browser
1. **Visit**: https://mcp-cv-chat-playground-clwfocv87-nipun0bugs-projects.vercel.app
2. **Go to "Send Email" section**
3. **Fill the form and send**

### Step 3: Check Response Messages

**✅ Success (Real Email Configured):**
```
✅ Real email sent successfully to test@example.com! 
Subject: "Mailtrap Test". 
Message ID: <actual-message-id>. 
Check your Mailtrap inbox!
```

**📧 Demo Mode (Need Environment Variables):**
```
📧 Demo mode: Email "sent" to test@example.com! 
Subject: "Mailtrap Test". 
Message ID: <demo-id>. 
(Configure SMTP environment variables to send real emails to Mailtrap)
```

**⚠️ Error (Wrong Credentials):**
```
⚠️ Email sending failed (error details). 
Demo mode: Email "sent" to test@example.com!
```

### Step 4: Check Mailtrap Inbox
If you see the success message, check: https://mailtrap.io/inboxes/4009361/messages/

## Common Issues:

1. **Authentication Error (401)**: Use browser interface instead of API calls
2. **Demo Mode**: Environment variables not configured
3. **Email Failed**: Wrong SMTP credentials
4. **No Response**: Deployment protection blocking access

## Quick Browser Test:

1. **Open**: https://mcp-cv-chat-playground-clwfocv87-nipun0bugs-projects.vercel.app
2. **Scroll to "Send Email" section**
3. **Enter**:
   - Recipient: `debug@test.com`
   - Subject: `Browser Test`
   - Body: `Testing from browser interface`
4. **Click "Send Email"**
5. **Read the response message carefully**

The response message will tell you exactly what's happening:
- ✅ = Real emails working, check Mailtrap
- 📧 = Demo mode, add environment variables
- ⚠️ = Error, check credentials

---

**Next Action**: Go to your app in the browser and test the email form directly!