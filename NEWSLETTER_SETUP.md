# Newsletter Subscription Setup Guide

This guide will help you set up automatic newsletter subscriptions that save email addresses to a Google Sheet.

## 📊 Step 1: Create a Google Sheet for Newsletter Subscriptions

1. **Go to Google Sheets** (sheets.google.com)
2. **Create a new spreadsheet** and name it "Newsletter Subscriptions"
3. **Set up columns** with these headers in row 1:
   - `email` (subscriber's email address)
   - `timestamp` (when they subscribed)
   - `source` (where they subscribed from)
   - `status` (active, unsubscribed, etc.)

## 🔧 Step 2: Create Google Apps Script

1. **Go to Google Apps Script** (script.google.com)
2. **Click "New Project"**
3. **Replace the default code** with this:

```javascript
function doPost(e) {
  try {
    // Get the data from the POST request
    const data = JSON.parse(e.postData.contents);
    
    // Open the Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add the new subscription data
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.source || 'website',
      'active'
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional)
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Newsletter subscription service is running'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## ⚙️ Step 3: Configure the Script

1. **Replace `YOUR_SHEET_ID`** with your actual Google Sheet ID
   - Find this in your sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
2. **Save the project** (Ctrl+S or Cmd+S)
3. **Name your project** "Newsletter Subscription Handler"

## 🚀 Step 4: Deploy the Script

1. **Click "Deploy" > "New deployment"**
2. **Choose type**: "Web app"
3. **Execute as**: "Me"
4. **Who has access**: "Anyone"
5. **Click "Deploy"**
6. **Copy the web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## 🔗 Step 5: Update Your Website

1. **Open `assets/load-data.js`**
2. **Find this line:**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. **Replace the URL** with your deployed web app URL
4. **Save the file**

## ✅ Step 6: Test the Setup

1. **Open your announcements page**
2. **Enter an email address** in the newsletter form
3. **Click "Subscribe"**
4. **Check your Google Sheet** - the email should appear in a new row
5. **Verify the data** includes email, timestamp, source, and status

## 📋 Step 7: Set Up Email Notifications (Optional)

You can add email notifications when someone subscribes by adding this to your Google Apps Script:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add to sheet
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.source || 'website',
      'active'
    ]);
    
    // Send email notification (optional)
    GmailApp.sendEmail(
      'your-email@example.com', // Replace with your email
      'New Newsletter Subscription',
      `New subscriber: ${data.email}\nTime: ${data.timestamp}\nSource: ${data.source || 'website'}`
    );
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 🔒 Step 8: Security Considerations

1. **Rate Limiting**: Google Apps Script has built-in rate limiting
2. **Validation**: The script validates email format
3. **Access Control**: Only you can modify the script
4. **Data Privacy**: Subscriber data is stored in your private Google Sheet

## 📊 Step 9: Managing Subscribers

### View Subscribers
- Open your "Newsletter Subscriptions" Google Sheet
- See all subscribers with timestamps and sources

### Export Data
- Use Google Sheets export features
- Download as CSV for use in email marketing tools

### Unsubscribe Management
- Add a "status" column to track subscription status
- Update status to "unsubscribed" when needed

## 🚨 Troubleshooting

### "Script not found" error
- Check that the script is deployed correctly
- Verify the web app URL is correct
- Ensure the script has "Anyone" access

### "Permission denied" error
- Make sure the script has access to your Google Sheet
- Check that the sheet ID is correct
- Verify the script is deployed as "Me"

### Emails not appearing in sheet
- Check the browser console for errors
- Verify the script is running without errors
- Test the script directly in Google Apps Script editor

## 🎉 You're Done!

Your newsletter subscription system is now fully functional! Subscribers will be automatically added to your Google Sheet, and you can manage them easily.

### What Happens When Someone Subscribes:
1. They enter their email and click "Subscribe"
2. The form sends their email to your Google Apps Script
3. The script adds their email to your Google Sheet
4. They see a success message
5. You can view all subscribers in your Google Sheet

### Next Steps:
- Set up email marketing tools (Mailchimp, Constant Contact, etc.)
- Export subscriber data from your Google Sheet
- Create automated email campaigns
- Monitor subscription growth over time
