const SUPABASE_URL = 'https://xfywjdvtmtzgiodenaik.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmeXdqZHZ0bXR6Z2lvZGVuYWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDgyNTQsImV4cCI6MjA3ODAyNDI1NH0.y0cZEymP-Zyxd5QJAEFPDJiSBjDpNB7LrcBxrGoVLgI';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('fade-out');
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);
});

// Search Staff Function with Supabase
async function searchStaff() {
    const staffId = document.getElementById('staffId').value.toUpperCase();
    const clearance = document.getElementById('clearanceLevel').value;
    const resultDiv = document.getElementById('staffResult');
    
    if (!staffId || !clearance) {
        resultDiv.innerHTML = '<p style="color: #ff6b6b;">⚠️ Please provide both Agent ID/Codename and Clearance Level</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Show loading state
    resultDiv.innerHTML = '<p style="color: #a89eff;">🔍 Searching database...</p>';
    resultDiv.classList.add('show');
    
    try {
        // Query Supabase for staff data
        const { data, error } = await supabaseClient
            .from('staff')
            .select('*')
            .eq('id', staffId)
            .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully
        
        if (error) {
            throw error;
        }
        
        if (data) {
            // Choose between emoji avatar or image
            const avatarDisplay = data.image 
                ? `<img src="${data.image}" alt="${data.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` 
                : data.avatar;
            
            resultDiv.innerHTML = `
                <div class="staff-profile">
                    <div class="staff-avatar">${avatarDisplay}</div>
                    <div class="staff-details">
                        <h4>${data.name}</h4>
                        <p><span class="label">Agent ID:</span> <span class="value">${data.id}</span></p>
                        <p><span class="label">Codename:</span> <span class="value">${data.codename}</span></p>
                        <p><span class="label">Rank:</span> <span class="value">${data.rank}</span></p>
                        <span class="clearance">CLEARANCE: ${data.clearance}</span>
                    </div>
                </div>
                <div style="margin-top: 1.5rem;">
                    <p><span class="label">Assigned Sector:</span> <span class="value">${data.sector}</span></p>
                    <p><span class="label">Status:</span> <span class="value" style="color: #00ff00;">${data.status}</span></p>
                    <p><span class="label">Specialization:</span> <span class="value">${data.specialization}</span></p>
                    <p><span class="label">Augmentations:</span> <span class="value">${data.augmentations}</span></p>
                    <p><span class="label">Mission Record:</span> <span class="value">${data.missions}</span></p>
                    <p style="margin-top: 1rem; line-height: 1.6;">
                        <span class="label">Personnel Bio:</span><br>
                        <span class="value">${data.bio}</span>
                    </p>
                </div>
            </div>
            ${data.profileLink ? `
            <div style="margin-top: 1.5rem; text-align: center;">
                 <a href="${data.profileLink}" target="_blank" class="more-info-btn">View Full Profile</a>
            </div>
            ` : ''}
            <div style="margin-top: 1.5rem; text-align: center;">
                 <a href="profiles/${data.id}.html" target="_blank" class="more-info-btn">View Full Profile</a>
            </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <p style="color: #ff6b6b;">❌ NO RECORDS FOUND</p>
                <p style="margin-top: 0.5rem; color: #888;">Agent ID "${staffId}" does not exist in the database or you lack sufficient clearance.</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching staff:', error);
        resultDiv.innerHTML = `
            <p style="color: #ff6b6b;">❌ DATABASE ERROR</p>
            <p style="margin-top: 0.5rem; color: #888;">Failed to connect to database. Please try again later.</p>
            <p style="margin-top: 1rem; color: #ff6b6b; font-size: 0.9rem; font-family: monospace;">
                Error Details: ${error.message || JSON.stringify(error)}
            </p>
            <p style="margin-top: 0.5rem; color: #666; font-size: 0.85rem;">
                Check browser console (F12) for more details.
            </p>
        `;
    }
    
    resultDiv.classList.add('show');
}

// Track Package Function with Supabase
async function trackPackage() {
    const trackingId = document.getElementById('trackingId').value.toUpperCase();
    const verifyCode = document.getElementById('verifyCode').value;
    const resultDiv = document.getElementById('packageResult');
    
    if (!trackingId || !verifyCode) {
        resultDiv.innerHTML = '<p style="color: #ff6b6b;">⚠️ Please provide both Tracking ID and Verification Code</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Show loading state
    resultDiv.innerHTML = '<p style="color: #a89eff;">🔍 Tracking package...</p>';
    resultDiv.classList.add('show');
    
    try {
        // Query Supabase for package data
        const { data, error } = await supabaseClient
            .from('packages')
            .select('*')
            .eq('id', trackingId)
            .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully
        
        if (error) {
            throw error;
        }
        
        if (data && verifyCode.length === 6) {
            // Optional: Add package icon if available
            const packageIcon = data.icon ? `<img src="${data.icon}" alt="Package" style="width: 50px; height: 50px; margin-bottom: 1rem;">` : '';
            
            // Parse timeline if it's stored as JSON string
            const timeline = typeof data.timeline === 'string' ? JSON.parse(data.timeline) : data.timeline;
            
            resultDiv.innerHTML = `
                ${packageIcon}
                <h4 style="color: #a89eff; font-family: Tektur, sans-serif; margin-bottom: 1rem;">Package Located</h4>
                <div class="package-info">
                    <div class="info-item">
                        <span class="label">Tracking ID</span>
                        <div class="value">${data.id}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Status</span>
                        <div class="value" style="color: ${data.status === 'Delivered' ? '#00ff00' : '#ffaa00'};">${data.status}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Contents</span>
                        <div class="value">${data.contents}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Classification</span>
                        <div class="value">${data.classification}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Origin</span>
                        <div class="value">${data.origin}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Destination</span>
                        <div class="value">${data.destination}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Handler</span>
                        <div class="value">${data.handler}</div>
                    </div>
                    <div class="info-item">
                        <span class="label">Weight</span>
                        <div class="value">${data.weight}</div>
                    </div>
                </div>
                <h4 style="color: #a89eff; font-family: Tektur, sans-serif; margin: 1.5rem 0 1rem;">Delivery Timeline</h4>
                <div class="timeline">
                    ${timeline.map(item => `
                        <div class="timeline-item ${item.active ? 'active' : ''}">
                            <div class="label">${item.time}</div>
                            <div class="value">${item.event}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <p style="color: #ff6b6b;">❌ TRACKING FAILED</p>
                <p style="margin-top: 0.5rem; color: #888;">Invalid tracking ID or verification code. Please verify your credentials.</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching package:', error);
        resultDiv.innerHTML = `
            <p style="color: #ff6b6b;">❌ DATABASE ERROR</p>
            <p style="margin-top: 0.5rem; color: #888;">Failed to connect to database. Please try again later.</p>
            <p style="margin-top: 1rem; color: #ff6b6b; font-size: 0.9rem; font-family: monospace;">
                Error Details: ${error.message || JSON.stringify(error)}
            </p>
            <p style="margin-top: 0.5rem; color: #666; font-size: 0.85rem;">
                Check browser console (F12) for more details.
            </p>
        `;
    }
    
    resultDiv.classList.add('show');
}

// Allow Enter key to submit
document.getElementById('staffId').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchStaff();
});

document.getElementById('trackingId').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') trackPackage();
});