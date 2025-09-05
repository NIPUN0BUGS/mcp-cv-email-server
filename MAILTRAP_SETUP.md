# 📧 Mailtrap Integration Setup

## Step 1: Get Your Mailtrap Credentials

1. **Go to your Mailtrap inbox**: https://mailtrap.io/inboxes/4009361/messages/
2. **Click on "SMTP Settings"** (gear icon or settings tab)
3. **Select "Nodemailer"** from the integrations dropdown
4. **Copy the credentials** - you'll see something like:

```javascript
var transport = nodemailer.createTransporter({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "your_username_here",
    pass: "your_password_here"
  }
});
```

## Step 2: Configure Vercel Environment Variables

1. **Go to your Vercel dashboard**: https://vercel.com/nipun0bugs-projects/mcp-cv-chat-playground
2. **Click on "Settings"** tab
3. **Click on "Environment Variables"** in the left sidebar
4. **Add these 4 variables** (click "Add" for each):

### Variable 1:
- **Name**: `SMTP_HOST`
- **Value**: `sandbox.smtp.mailtrap.io`
- **Environment**: Production, Preview, Development (check all)

### Variable 2:
- **Name**: `SMTP_PORT`
- **Value**: `2525`
- **Environment**: Production, Preview, Development (check all)

### Variable 3:
- **Name**: `SMTP_USER`
- **Value**: `[YOUR_MAILTRAP_USERNAME]` (from step 1)
- **Environment**: Production, Preview, Development (check all)

### Variable 4:
- **Name**: `SMTP_PASS`
- **Value**: `[YOUR_MAILTRAP_PASSWORD]` (from step 1)
- **Environment**: Production, Preview, Development (check all)

## Step 3: Redeploy Your Application

After adding the environment variables:

1. **Go to "Deployments"** tab in Vercel
2. **Click the "..." menu** on your latest deployment
3. **Click "Redeploy"** to apply the new environment variables

OR run this command locally:
```bash
npm run deploy
```

## Step 4: Test Real Email Sending

1. **Visit your app**: https://mcp-cv-chat-playground-533uj3u3m-nipun0bugs-projects.vercel.app
2. **Go to the Send Email section**
3. **Fill in the form**:
   - **Recipient**: `test@example.com` (or any email)
   - **Subject**: `Test from MCP CV Chat`
   - **Body**: `This is a real email test!`
4. **Click "Send Email"**
5. **Look for success message**: `✅ Real email sent successfully...`
6. **Check your Mailtrap inbox**: https://mailtrap.io/inboxes/4009361/messages/

## Expected Results

### ✅ With SMTP Configuration (Real Emails)
```
✅ Real email sent successfully to test@example.com! 
Subject: "Test from MCP CV Chat". 
Message ID: <actual-message-id>. 
Check your Mailtrap inbox!
```

### 📧 Without SMTP Configuration (Demo Mode)
```
📧 Demo mode: Email "sent" to test@example.com! 
Subject: "Test from MCP CV Chat". 
Message ID: <demo-id>. 
(Configure SMTP environment variables to send real emails to Mailtrap)
```

## Troubleshooting

### If emails still don't appear in Mailtrap:

1. **Check environment variables** are set correctly in Vercel
2. **Verify Mailtrap credentials** are correct
3. **Check Vercel function logs**:
   - Go to Vercel Dashboard → Functions → View Function Logs
   - Look for email sending logs
4. **Try redeploying** after setting environment variables

### Common Issues:

- **Wrong credentials**: Double-check username/password from Mailtrap
- **Environment variables not applied**: Redeploy after adding them
- **Mailtrap inbox full**: Check if your inbox has space
- **Network issues**: Check Vercel function logs for errors

## Quick Test Commands

You can also test the API directly:

```bash
curl -X POST https://mcp-cv-chat-playground-533uj3u3m-nipun0bugs-projects.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "send_email",
    "arguments": {
      "recipient": "test@example.com",
      "subject": "API Test Email",
      "body": "This email was sent via API call to test the integration."
    }
  }'
```

---

Once you complete these steps, your emails will appear in your Mailtrap inbox at:
**https://mailtrap.io/inboxes/4009361/messages/**