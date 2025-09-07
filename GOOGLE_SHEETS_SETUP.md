# Google Sheets Setup Guide

This guide will help you set up separate Google Sheets to manage your website's events and announcements data.

## 📊 Step 1: Create Your Google Sheets

You'll need to create **two separate Google Sheets** - one for events and one for announcements.

### Events Sheet
1. **Go to Google Sheets** (sheets.google.com)
2. **Create a new spreadsheet** and name it "Family Welcome Center Events"
3. **Set up columns** with these exact headers:
   - `id` (unique number for each event)
   - `day` (day of month, e.g., "15")
   - `month` (month abbreviation, e.g., "DEC")
   - `title` (event title)
   - `time` (time range, e.g., "6:00 PM - 8:00 PM")
   - `description` (event description)
   - `tags` (comma-separated tags, e.g., "Youth, Holiday")

### Announcements Sheet
1. **Create another new spreadsheet** and name it "Family Welcome Center Announcements"
2. **Set up columns** with these exact headers:
   - `id` (unique number for each announcement)
   - `title` (announcement title)
   - `date` (date, e.g., "December 10, 2024")
   - `description` (announcement description)
   - `priority` (high, medium, or low)

## 📤 Step 2: Publish Your Sheets

### Publish Events Sheet
1. **Open your Events sheet**
2. **Click "File" > "Share" > "Publish to the web"**
3. **Select "Entire document"**
4. **Choose "Comma-separated values (.csv)"** as the format
5. **Click "Publish"**
6. **Copy the generated URL** - it will look like:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-1vYOUR_EVENTS_SHEET_ID/pub?output=csv
   ```

### Publish Announcements Sheet
1. **Open your Announcements sheet**
2. **Click "File" > "Share" > "Publish to the web"**
3. **Select "Entire document"**
4. **Choose "Comma-separated values (.csv)"** as the format
5. **Click "Publish"**
6. **Copy the generated URL** - it will look like:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-1vYOUR_ANNOUNCEMENTS_SHEET_ID/pub?output=csv
   ```

## ⚙️ Step 3: Configure Your Website

1. **Open `assets/load-data.js`**
2. **Find these lines:**
   ```javascript
   const EVENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vYOUR_SHEET_ID/pub?output=csv';
   const ANNOUNCEMENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vYOUR_ANNOUNCEMENTS_SHEET_ID/pub?output=csv';
   ```
3. **Replace the URLs** with your published Google Sheets URLs
4. **Save the file**

## 📝 Step 4: Add Your Data

### Example Events Data (in Events Sheet):
| id | day | month | title | time | description | tags |
|----|----|-------|-------|------|-------------|------|
| 1 | 15 | DEC | Youth Christmas Party | 6:00 PM - 8:00 PM | Join us for a festive celebration with games, food, and holiday activities for youth of all ages. | Youth, Holiday |
| 2 | 22 | DEC | Family Welcome Dinner | 5:30 PM - 7:30 PM | A special dinner to welcome new families to our community. All are invited to share in fellowship. | Family, Dinner |

### Example Announcements Data (in Announcements Sheet):
| id | title | date | description | priority |
|----|-------|------|-------------|----------|
| 1 | Holiday Schedule Update | December 10, 2024 | Our center will have modified hours during the holiday season. Please check our calendar for specific dates and times. | high |
| 2 | New Volunteer Opportunities | December 8, 2024 | We're looking for volunteers to help with our youth programs and family support services. Contact us if you're interested in serving. | medium |

## ✅ Step 5: Test Your Setup

1. **Open your website** in a browser
2. **Check the browser console** (F12 > Console) for messages:
   - "Events loaded from Google Sheets successfully" = ✅ Events working
   - "Announcements loaded from Google Sheets successfully" = ✅ Announcements working
   - "Google Sheet not configured, using fallback data" = ⚠️ Need to configure URL
   - "Error loading data from Google Sheets" = ❌ Check your URL

## 🔄 Step 6: Update Content

**To add new events:**
1. **Open your Events Google Sheet**
2. **Add new rows** with the event data
3. **Save the sheet** (auto-saves)
4. **Refresh your events page** - changes appear immediately!

**To add new announcements:**
1. **Open your Announcements Google Sheet**
2. **Add new rows** with the announcement data
3. **Save the sheet** (auto-saves)
4. **Refresh your announcements page** - changes appear immediately!

## 🛡️ No Data Handling

If Google Sheets is unavailable or not configured, the website will display a friendly message indicating that no content is available. This ensures users understand the current state rather than showing outdated information.

## 📋 Tips for Success

- **Use consistent formatting** - follow the column headers exactly
- **Avoid commas in descriptions** - use periods or semicolons instead
- **Test with a few entries first** before adding all your data
- **Keep backups** - export your sheet regularly
- **Use clear, descriptive titles** for better user experience

## 🚨 Troubleshooting

### "Data not loading"
- Check that your Google Sheet is published correctly
- Verify the URL in `load-data.js` is correct
- Check browser console for error messages

### "Events/announcements not showing"
- Ensure your `type` column contains exactly "event" or "announcement"
- Check that all required columns are present
- Verify data is in the correct format

### "No events/announcements available"
- This is normal if Google Sheets isn't configured yet
- Once you set up the URL correctly, it will load from Google Sheets

## 🎉 You're Done!

Your website now uses Google Sheets for content management! Anyone with access to your Google Sheet can update events and announcements without touching any code.
