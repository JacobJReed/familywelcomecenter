# Family Welcome Center Website

Website for Family Welcome Center El Cajon

## 🚀 Easy Content Updates

### Updating Events and Announcements

To update events or announcements, simply edit your Google Sheets directly:

**Events Sheet:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vSgMC3o9tSWy15Pklxa0WZGhjciN0_xuoUSEhKlZ_KEmmq-E_Jep5qxbCJLbErGPPwA1LxdZixgbKAO/edit](https://docs.google.com/spreadsheets/d/e/2PACX-1vSgMC3o9tSWy15Pklxa0WZGhjciN0_xuoUSEhKlZ_KEmmq-E_Jep5qxbCJLbErGPPwA1LxdZixgbKAO/edit)

**Announcements Sheet:** [https://docs.google.com/spreadsheets/d/e/2PACX-1vTSHoXXooy1ewgq_buYUnUBhV-sTZ1_22CoGxoey5BPjYfTK7HpNvkAV0oNuvNuCO_DKh8Cjs8LsJ5C/edit](https://docs.google.com/spreadsheets/d/e/2PACX-1vTSHoXXooy1ewgq_buYUnUBhV-sTZ1_22CoGxoey5BPjYfTK7HpNvkAV0oNuvNuCO_DKh8Cjs8LsJ5C/edit)

#### Adding a New Event
1. **Open the Events Google Sheet** (link above)
2. **Add a new row** with these columns:
   - `id` - Unique number (e.g., 4)
   - `day` - Day of month (e.g., 12)
   - `month` - Month abbreviation (e.g., JAN)
   - `title` - Event title (e.g., "New Year Celebration")
   - `time` - Time range (e.g., "7:00 PM - 9:00 PM")
   - `description` - Event description
   - `tags` - Comma-separated tags (e.g., "Celebration, All Ages")
3. **Save the sheet** - changes appear immediately on the website

#### Adding a New Announcement
1. **Open the Announcements Google Sheet** (link above)
2. **Add a new row** with these columns:
   - `id` - Unique number (e.g., 7)
   - `title` - Announcement title (e.g., "New Program Launch")
   - `date` - Date (e.g., "January 15, 2025")
   - `description` - Announcement description
   - `priority` - high, medium, or low
3. **Save the sheet** - changes appear immediately on the website

### Priority Levels for Announcements
- `"high"` - Red badge
- `"medium"` - Orange badge
- `"low"` - Green badge 

### File Structure
```
familywelcomecenter/
├── index.html              # Mission Statement
├── events.html             # Upcoming Events (data-driven)
├── announcements.html      # Announcements (data-driven)
├── programs.html           # Our Programs
├── giving.html             # Giving
├── calendar.html           # Calendar
├── assets/
│   ├── styles.css          # Custom CSS (50 lines)
│   └── load-data.js        # Events & Announcements data + loader
└── images/                 # All images
```

## 🎨 Design Features

- **Apple-inspired aesthetic** with clean, modern design
- **Christian-themed blue colors** with welcoming gradients
- **Fully responsive** - works on all devices
- **Tailwind CSS** - utility-first styling
- **Minimal custom CSS** - only complex effects that can't be done with Tailwind

## 📱 Responsive Design

The website automatically adapts to different screen sizes:
- **Desktop** - Full grid layouts and spacing
- **Tablet** - Adjusted columns and spacing
- **Mobile** - Single column layouts with touch-friendly buttons

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** - No build process required
- **Tailwind CDN** - No local installation needed
- **Static hosting** - Works on GitHub Pages, Netlify, Vercel, etc.
- **Fast loading** - Optimized for performance

## 📝 Content Management

### Events
- Edit the [Events Google Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vSgMC3o9tSWy15Pklxa0WZGhjciN0_xuoUSEhKlZ_KEmmq-E_Jep5qxbCJLbErGPPwA1LxdZixgbKAO/edit) directly
- Each event needs: `id`, `day`, `month`, `title`, `time`, `description`, `tags`
- Tags are displayed as colored badges
- Changes appear immediately on the website

### Announcements
- Edit the [Announcements Google Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vTSHoXXooy1ewgq_buYUnUBhV-sTZ1_22CoGxoey5BPjYfTK7HpNvkAV0oNuvNuCO_DKh8Cjs8LsJ5C/edit) directly
- Each announcement needs: `id`, `title`, `date`, `description`, `priority`
- Priority determines the badge color
- Changes appear immediately on the website

### Newsletter Subscriptions
- Newsletter signups automatically save to a Google Sheet
- Set up Google Apps Script to handle form submissions
- See `NEWSLETTER_SETUP.md` for detailed instructions
- Subscribers are added with timestamp and source information

### Other Pages
- Mission Statement, Programs, Giving, Calendar are static HTML
- Edit directly in the respective HTML files

## 🚀 Deployment

Simply upload all files to any static hosting service:
- **GitHub Pages** - Push to repository, enable Pages
- **Netlify** - Drag and drop the folder
- **Vercel** - Connect your repository
- **Any web server** - Upload files to public directory

No build process or server-side code required!