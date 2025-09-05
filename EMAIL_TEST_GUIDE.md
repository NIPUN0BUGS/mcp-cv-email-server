# 📧 Email Testing Guide

## How to Test the Send Email Functionality

Your MCP CV Chat Playground includes email functionality that works in **demo mode**. Here's how to test it:

### 🌐 Access Your Deployed App
Open your live application:
**https://mcp-cv-chat-playground-533uj3u3m-nipun0bugs-projects.vercel.app**

### 📝 Fill Out the Email Form

Navigate to the **"Send Email"** section and fill in these fields:

#### **Recipient:**
```
test@example.com
```
*Or use any email address - it won't actually send since it's in demo mode*

#### **Subject:**
```
Test Email from MCP CV Chat Playground
```

#### **Body:**
```
Hello,

This is a test email from my MCP CV Chat Playground application.

The app successfully:
- Processed my CV
- Answered questions about my resume
- Generated this email

Best regards,
[Your Name]
```

### 🚀 Send the Email

1. Click the **"Send Email"** button
2. Wait for the response (should be almost instant)
3. You should see a success message like:

```
Email sent successfully to test@example.com! 
Subject: "Test Email from MCP CV Chat Playground". 
Message ID: <1234567890-abc123@mcp-server.example.com> 
(Note: This is a demo - no actual email was sent)
```

## 🧪 Advanced Testing Scenarios

### Test 1: Missing Fields
Try leaving one field empty to test validation:
- **Recipient:** *(leave empty)*
- **Subject:** `Test Subject`
- **Body:** `Test Body`

**Expected Result:** Error message about missing required fields

### Test 2: CV-Based Email
1. First upload a CV file
2. Ask a question about your CV
3. Then compose an email with CV information:

**Subject:** `My CV Information`
**Body:**
```
Dear Hiring Manager,

Based on my uploaded CV, here are my key qualifications:

- [Copy information from CV chat responses]
- [Add your experience details]
- [Include your skills]

I would love to discuss opportunities with your company.

Best regards,
[Your Name]
```

### Test 3: Different Email Formats
Try different recipient formats:
- `user@domain.com`
- `first.last@company.co.uk`
- `test+tag@gmail.com`

## 🔍 What Happens Behind the Scenes

### Demo Mode Behavior
- ✅ **Validates** all required fields (recipient, subject, body)
- ✅ **Processes** the email request
- ✅ **Generates** a unique message ID
- ✅ **Returns** success confirmation
- ❌ **Does NOT** actually send real emails

### API Call Structure
The frontend sends this request to `/api/mcp`:
```json
{
  "tool": "send_email",
  "arguments": {
    "recipient": "test@example.com",
    "subject": "Test Subject",
    "body": "Test email body content"
  }
}
```

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. **Button Not Responding**
- Check browser console for JavaScript errors
- Ensure all fields are filled
- Try refreshing the page

#### 2. **Error Messages**
- `"Please fill in all email fields"` → Fill all required fields
- `"Failed to send email"` → Check browser network tab for API errors

#### 3. **Network Errors**
- Check your internet connection
- Verify the Vercel deployment is working
- Look at browser developer tools → Network tab

### Debug Steps
1. **Open Browser Developer Tools** (F12)
2. **Go to Network Tab**
3. **Send a test email**
4. **Check the API call** to `/api/mcp`
5. **Verify the response** shows success

## 🎯 Expected Test Results

### ✅ Successful Test
```
Email sent successfully to test@example.com! 
Subject: "Test Email from MCP CV Chat Playground". 
Message ID: <1703123456-xyz789@mcp-server.example.com> 
(Note: This is a demo - no actual email was sent)
```

### ❌ Error Test (Missing Fields)
```
Error: Please fill in all email fields
```

### ❌ API Error
```
Error: Failed to send email: [specific error message]
```

## 🔗 Integration with CV Chat

### Complete Workflow Test
1. **Upload CV** → Process successfully
2. **Ask CV Questions** → Get responses about your resume
3. **Compose Email** → Include CV information in email body
4. **Send Email** → Confirm demo email "sent"

### Sample CV-Integrated Email
After uploading your CV and asking questions, compose:

**Subject:** `Application for Software Developer Position`
**Body:**
```
Dear Hiring Manager,

I am writing to express my interest in the Software Developer position.

Based on my CV analysis:
- My most recent role: [Answer from CV chat]
- Key technical skills: [Answer from CV chat]
- Education background: [Answer from CV chat]

I believe my experience aligns well with your requirements.

Best regards,
[Your Name]
```

## 📊 Monitoring

### Vercel Function Logs
- Go to your Vercel dashboard
- Navigate to Functions → Logs
- Monitor email API calls in real-time

### Browser Console
- Check for any JavaScript errors
- Monitor network requests
- Verify API responses

---

🎉 **Your email functionality is working correctly in demo mode!**

The system validates inputs, processes requests, and provides feedback without actually sending emails - perfect for testing and demonstration purposes.