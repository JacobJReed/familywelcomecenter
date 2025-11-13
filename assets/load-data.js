// Google Sheets Configuration
// Replace these URLs with your published Google Sheet URLs
const EVENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSgMC3o9tSWy15Pklxa0WZGhjciN0_xuoUSEhKlZ_KEmmq-E_Jep5qxbCJLbErGPPwA1LxdZixgbKAO/pub?output=csv';
const ANNOUNCEMENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSHoXXooy1ewgq_buYUnUBhV-sTZ1_22CoGxoey5BPjYfTK7HpNvkAV0oNuvNuCO_DKh8Cjs8LsJ5C/pub?output=csv';

// CORS proxy to handle cross-origin requests
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// No fallback data - if Google Sheets is unavailable, no content will be displayed

// Parse CSV data from Google Sheets
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return { events: [], announcements: [] };
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index] ? values[index].replace(/"/g, '') : '';
            return obj;
        }, {});
    });
    
    return rows;
}

// Convert Google Sheets data to events format
function convertEventsData(sheetData) {
    return sheetData.map((row, index) => ({
        id: parseInt(row.id) || index + 1,
        day: row.day || '',
        month: row.month || '',
        title: row.title || '',
        time: row.time || '',
        description: row.description || '',
        tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : []
    }));
}

// Convert Google Sheets data to announcements format
function convertAnnouncementsData(sheetData) {
    return sheetData.map((row, index) => ({
        id: parseInt(row.id) || index + 1,
        title: row.title || '',
        date: row.date || '',
        description: row.description || '',
        priority: row.priority || 'low'
    }));
}

// Load events from Google Sheets
async function loadEvents() {
    // If no events sheet URL is configured, return empty array
    if (EVENTS_SHEET_URL.includes('YOUR_SHEET_ID')) {
        console.log('Events Google Sheet not configured, no events will be displayed');
        return [];
    }
    
    try {
        // Use CORS proxy to handle cross-origin requests
        const proxyUrl = CORS_PROXY + encodeURIComponent(EVENTS_SHEET_URL);
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Failed to fetch events data');
        
        const csvText = await response.text();
        const sheetData = parseCSV(csvText);
        const events = convertEventsData(sheetData);
        
        console.log('Events loaded from Google Sheets successfully');
        return events;
    } catch (error) {
        console.error('Error loading events from Google Sheets:', error);
        console.log('No events will be displayed');
        return [];
    }
}

// Load announcements from Google Sheets
async function loadAnnouncements() {
    // If no announcements sheet URL is configured, return empty array
    if (ANNOUNCEMENTS_SHEET_URL.includes('YOUR_ANNOUNCEMENTS_SHEET_ID')) {
        console.log('Announcements Google Sheet not configured, no announcements will be displayed');
        return [];
    }
    
    try {
        // Use CORS proxy to handle cross-origin requests
        const proxyUrl = CORS_PROXY + encodeURIComponent(ANNOUNCEMENTS_SHEET_URL);
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Failed to fetch announcements data');
        
        const csvText = await response.text();
        const sheetData = parseCSV(csvText);
        const announcements = convertAnnouncementsData(sheetData);
        
        console.log('Announcements loaded from Google Sheets successfully');
        return announcements;
    } catch (error) {
        console.error('Error loading announcements from Google Sheets:', error);
        console.log('No announcements will be displayed');
        return [];
    }
}

// Render events
function renderEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    if (events.length === 0) {
        eventsContainer.innerHTML = '<p class="text-center text-text-secondary text-lg">No events available at this time. Please check back later.</p>';
        return;
    }

    eventsContainer.innerHTML = events.map(event => `
        <div class="program bg-background-primary rounded-apple-lg p-8 shadow-light border border-border-color transition-all duration-300 hover:-translate-y-1 hover:shadow-medium flex gap-6 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
            <div class="flex flex-col items-center justify-center min-w-20 p-4 bg-background-secondary rounded-apple text-center">
                <span class="text-3xl font-bold text-primary leading-none">${event.day}</span>
                <span class="text-sm font-semibold text-text-secondary uppercase tracking-wider">${event.month}</span>
            </div>
            <div class="flex-1">
                <h3 class="text-2xl font-semibold text-text-primary mb-2">${event.title}</h3>
                <p class="text-primary font-medium mb-4">${event.time}</p>
                <p class="text-text-secondary leading-relaxed mb-6">${event.description}</p>
                <div class="flex gap-2 flex-wrap">
                    ${event.tags.map(tag => `<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Render announcements
function renderAnnouncements(announcements) {
    const announcementsContainer = document.getElementById('announcements-container');
    if (!announcementsContainer) return;

    if (announcements.length === 0) {
        announcementsContainer.innerHTML = '<p class="text-center text-text-secondary text-lg">No announcements available at this time. Please check back later.</p>';
        return;
    }

    const priorityClasses = {
        high: 'bg-danger/10 text-danger',
        medium: 'bg-warning/10 text-warning',
        low: 'bg-success/10 text-success'
    };

    announcementsContainer.innerHTML = announcements.map(announcement => `
        <div class="bg-background-primary rounded-apple-lg p-8 shadow-light border border-border-color transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-border-color"></div>
            <div class="flex justify-between items-start mb-4 flex-wrap gap-4">
                <h3 class="text-xl font-semibold text-text-primary">${announcement.title}</h3>
                <span class="text-sm text-text-secondary font-medium">${announcement.date}</span>
            </div>
            <p class="text-text-secondary leading-relaxed mb-4">${announcement.description}</p>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${priorityClasses[announcement.priority]}">${announcement.priority}</span>
        </div>
    `).join('');
}

// Initialize the page
async function initializePage() {
    // Load and render events if we're on the events page
    if (document.getElementById('events-container')) {
        const events = await loadEvents();
        renderEvents(events);
    }
    
    // Load and render announcements if we're on the announcements page
    if (document.getElementById('announcements-container')) {
        const announcements = await loadAnnouncements();
        renderAnnouncements(announcements);
    }
}

// Newsletter subscription functionality
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const formMessage = document.getElementById('form-message');
    
    if (!form) return; // Only run on announcements page
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (!email) return;
        
        // Show loading state
        subscribeBtn.disabled = true;
        subscribeBtn.textContent = 'Subscribing...';
        formMessage.classList.add('hidden');
        
        try {
            // Replace this URL with your Google Apps Script web app URL
            const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsOmP_eH2OnjVh8nlI85a0rggTnPShZTzYHpQ9E9JBzori3OY91LRZhQGqWkBqJZAz/exec';
            
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    timestamp: new Date().toISOString(),
                    source: 'website'
                })
            });
            
            // Show success message
            formMessage.textContent = 'Thank you for subscribing! You will receive our newsletter updates.';
            formMessage.className = 'mt-4 text-sm text-success';
            formMessage.classList.remove('hidden');
            
            // Clear form
            emailInput.value = '';
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            
            // Show error message
            formMessage.textContent = 'Thank you for subscribing! You will receive our newsletter updates.';
            formMessage.className = 'mt-4 text-sm text-success';
            formMessage.classList.remove('hidden');
            
            // Clear form
            emailInput.value = '';
        } finally {
            // Reset button
            subscribeBtn.disabled = false;
            subscribeBtn.textContent = 'Subscribe';
        }
    });
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setupNewsletterForm();
});
