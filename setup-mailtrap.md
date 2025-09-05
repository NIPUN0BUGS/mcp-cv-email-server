# 🚀 Quick Mailtrap Setup for Your MCP App

## Your Mailtrap Credentials (from curl command):

- **SMTP_HOST**: `sandbox.smtp.mailtrap.io`
- **SMTP_PORT**: `2525`
- **SMTP_USER**: `428f43b7553983`
- **SMTP_PASS**: `681df25f8ee911`

## Step 1: Add Environment Variables to Vercel

1. **Go to your Vercel project**: https://vercel.com/nipun0bugs-projects/mcp-cv-chat-playground
2. **Click "Settings"** tab
3. **Click "Environment Variables"** in the left sidebar
4. **Add these 4 variables** (click "Add" button for each):

### Variable 1:
- **Name**: `SMTP_HOST`
- **Value**: `sandbox.smtp.mailtrap.io`
- **Environment**: ✅ Production ✅ Preview ✅ Development

### Variable 2:
- **Name**: `SMTP_PORT`
- **Value**: `2525`
- **Environment**: ✅ Production ✅ Preview ✅ Development

### Variable 3:
- **Name**: `SMTP_USER`
- **Value**: `428f43b7553983`
- **Environment**: ✅ Production ✅ Preview ✅ Development

### Variable 4:
- **Name**: `SMTP_PASS`
- **Value**: `681df25f8ee911`
- **Environment**: ✅ Production ✅ Preview ✅ Development

## Step 2: Redeploy Your App

After adding all 4 environment variables, Vercel will automatically trigger a new deployment. You can also manually redeploy by:

1. Going to the **"Deployments"** tab
2. Clicking the **"..."** menu on the latest deployment
3. Clicking **"Redeploy"**

## Step 3: Test Real Email Sending

1. **Visit your app**: https://mcp-cv-chat-playground-clwfocv87-nipun0bugs-projects.vercel.app
2. **Go to the "Send Email" section**
3. **Fill in the form**:
   - **Recipient**: `test@example.com`
   - **Subject**: `Real Mailtrap Test`
   - **Body**: `This email should appear in my Mailtrap inbox!`
4. **Click "Send Email"**

## Expected Success Message:
```
✅ Real email sent successfully to test@example.com! 
Subject: "Real Mailtrap Test". 
Message ID: <actual-message-id>. 
Check your Mailtrap inbox!
```

## Step 4: Check Your Mailtrap Inbox

After sending the email, check: https://mailtrap.io/inboxes/4009361/messages/

You should see your new email appear with:
- ✅ Proper HTML formatting
- ✅ MCP CV Chat branding
- ✅ Timestamp
- ✅ Your custom subject and body

## Troubleshooting

If you still see demo mode messages:
1. **Verify all 4 environment variables** are added correctly
2. **Wait for automatic redeployment** (usually 1-2 minutes)
3. **Check Vercel function logs** for any errors
4. **Try a hard refresh** of your app (Ctrl+F5)

---

Once configured, every email sent through your MCP CV Chat Playground will appear in your Mailtrap inbox!