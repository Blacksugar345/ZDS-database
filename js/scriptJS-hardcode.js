// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('fade-out');
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);
});

// Staff Database
const staffDatabase = {
    'ZDS-4734': {
        name: 'Valeria Cross',
        id: 'ZDS-4734',
        codename: 'NIGHTY',
        rank: 'Senior Field Operative',
        clearance: 'ALPHA-1',
        sector: 'Sector A-1',
        status: 'Active Duty',
        specialization: 'High-Risk Quantum Cargo',
        augmentations: 'Neural Interface (Gen-4)',
        missions: 'Manages delivery system in responsible zone A',
        bio: 'Specialized in delivering experimental tech through unstable energy field. Known for unconventional problem-solving.',
        avatar: '🌙',
        image: 'img/agent4734.png',
        profileLink: 'profiles/ZDS-4734.html'
    },
    'ZDS-4533': {
        name: 'Marcus Kundent',
        id: 'ZDS-4533',
        codename: 'PHANTOM',
        rank: 'Senior Field Operative',
        clearance: 'ALPHA-1',
        sector: 'Sector A-3',
        status: 'Active Duty',
        specialization: 'Working under high pressure',
        augmentations: 'Neural Interface (Gen-4)',
        missions: 'Deliver supplies',
        bio: 'Identity classified.',
        avatar: '👻',
        image: 'img/agent4533.jpg',
        profileLink: 'profiles/ZDS-4533.html'
    },
    'ZDS-2156': {
        name: 'Dr. Kiera Wong',
        id: 'ZDS-2156',
        codename: 'CIPHER',
        rank: 'Technical Specialist',
        clearance: 'ALPHA-3',
        sector: 'HQ',
        status: 'Active Duty',
        specialization: 'Hazardous Materials',
        augmentations: 'Quantum Analysis Suite, Protection suit',
        missions: 'Handle Hazardous Supplies',
        bio: 'Scientist specializing in dangerous experimental materials. Expert in containment protocols.',
        avatar: '🔬',
        image: 'img/agent2156.jpg',
        profileLink: 'profiles/ZDS-2156.html'
    },
    'ZDS-6201': {
        name: 'Dominik Burgstaller',
        id: 'ZDS-6201',
        codename: 'KUROSATOU',
        rank: 'Delivery Agent',
        clearance: 'BETA-2',
        sector: 'Sector A-6',
        status: 'Active Duty',
        specialization: 'Expert in routes, fast parcel delivery',
        augmentations: 'Neural Interface (Gen-4)',
        missions: 'Delivery packages in responsible zone',
        bio: 'Graduated from Zwasonia Institute of Technology with advanced product management knowledge and a keen interest in science.',
        avatar: '🐈',
        image: 'img/agent6201.png',
        profileLink: 'profiles/ZDS-6201.html'
    },
    'ZDS-6289': {
        name: 'Benedict Kent',
        id: 'ZDS-6289',
        codename: 'SPOT',
        rank: 'Delivery Agent Trainee',
        clearance: 'BETA-1',
        sector: 'Sector A-6',
        status: 'Active Duty',
        specialization: 'Not specify yet',
        augmentations: 'Neural Interface (Gen-4)',
        missions: 'Assist delivery',
        bio: '-',
        avatar: '🐈',
        image: 'img/agent6298.png',
        profileLink: 'profiles/ZDS-6289.html'
    },
};

// Package Database
const packageDatabase = {
    'ZDS-PKG-89274': {
        id: 'ZDS-PKG-89274',
        contents: 'Prototype Neural Interface Components',
        classification: 'ALPHA CLEARANCE',
        origin: 'Sector E - TechCore Research Facility',
        destination: 'Sector A - TechCore Head Quarter',
        weight: '2.4 kg',
        handler: 'ZDS-4734',
        status: 'In Transit',
        icon: 'img/package-icon-89274.png', 
        timeline: [
            { time: '2487.11.04 08:23', event: 'Package secured at origin', active: false },
            { time: '2487.11.04 14:15', event: 'Quantum encryption applied', active: false },
            { time: '2487.11.05 06:47', event: 'Departed Sector E via hyperlane', active: false },
            { time: '2487.11.06 11:32', event: 'En route - Passing through Sector C', active: true },
            { time: '2487.11.07 08.00 EST', event: 'Expected arrival at destination', active: false }
        ]
    },
    'ZDS-PKG-45612': {
        id: 'ZDS-PKG-45612',
        contents: 'Medical Supplies - Nano-serum',
        classification: 'RESTRICTED',
        origin: 'Sector B - BioMed Station',
        destination: 'Sector A - Jashon sector A Hospital',
        weight: '0.8 kg',
        handler: 'ZDS-4533',
        status: 'Delivered',
        icon: 'img/package-icon-45612.png',
        timeline: [
            { time: '2487.11.01 13:20', event: 'Package secured at origin', active: false },
            { time: '2487.11.02 09:15', event: 'Priority clearance granted', active: false },
            { time: '2487.11.03 16:42', event: 'Successfully delivered', active: false }
        ]
    }
};

// Search Staff Function
function searchStaff() {
    const staffId = document.getElementById('staffId').value.toUpperCase();
    const clearance = document.getElementById('clearanceLevel').value;
    const resultDiv = document.getElementById('staffResult');
    
    if (!staffId || !clearance) {
        resultDiv.innerHTML = '<p style="color: #ff6b6b;">⚠️ Please provide both Agent ID/Codename and Clearance Level</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    const staff = staffDatabase[staffId];
    
    if (staff) {
        // Choose between emoji avatar or image
        const avatarDisplay = staff.image 
            ? `<img src="${staff.image}" alt="${staff.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` 
            : staff.avatar;
        
        resultDiv.innerHTML = `
            <div class="staff-profile">
                <div class="staff-avatar">${avatarDisplay}</div>
                <div class="staff-details">
                    <h4>${staff.name}</h4>
                    <p><span class="label">Agent ID:</span> <span class="value">${staff.id}</span></p>
                    <p><span class="label">Codename:</span> <span class="value">${staff.codename}</span></p>
                    <p><span class="label">Rank:</span> <span class="value">${staff.rank}</span></p>
                    <span class="clearance">CLEARANCE: ${staff.clearance}</span>
                </div>
            </div>
            <div style="margin-top: 1.5rem;">
                <p><span class="label">Assigned Sector:</span> <span class="value">${staff.sector}</span></p>
                <p><span class="label">Status:</span> <span class="value" style="color: #00ff00;">${staff.status}</span></p>
                <p><span class="label">Specialization:</span> <span class="value">${staff.specialization}</span></p>
                <p><span class="label">Augmentations:</span> <span class="value">${staff.augmentations}</span></p>
                <p><span class="label">Mission Record:</span> <span class="value">${staff.missions}</span></p>
                <p style="margin-top: 1rem; line-height: 1.6;">
                    <span class="label">Personnel Bio:</span><br>
                    <span class="value">${staff.bio}</span>
                </p>
                <div style="margin-top: 1.5rem; text-align: center;">
                     <a href="${staff.profileLink}" target="_blank" class="more-info-btn">View Full Profile</a>
                </div>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <p style="color: #ff6b6b;">❌ NO RECORDS FOUND</p>
            <p style="margin-top: 0.5rem; color: #888;">Agent ID "${staffId}" does not exist in the database or you lack sufficient clearance.</p>
        `;
    }
    
    resultDiv.classList.add('show');
}

// Track Package Function
function trackPackage() {
    const trackingId = document.getElementById('trackingId').value.toUpperCase();
    const verifyCode = document.getElementById('verifyCode').value;
    const resultDiv = document.getElementById('packageResult');
    
    if (!trackingId || !verifyCode) {
        resultDiv.innerHTML = '<p style="color: #ff6b6b;">⚠️ Please provide both Tracking ID and Verification Code</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    const pkg = packageDatabase[trackingId];
    
    if (pkg && verifyCode.length === 6) {
        // Optional: Add package icon if available
        const packageIcon = pkg.icon ? `<img src="${pkg.icon}" alt="Package" style="width: 50px; height: 50px; margin-bottom: 1rem;">` : '';
        
        resultDiv.innerHTML = `
            ${packageIcon}
            <h4 style="color: #a89eff; font-family: Tektur, sans-serif; margin-bottom: 1rem;">Package Located</h4>
            <div class="package-info">
                <div class="info-item">
                    <span class="label">Tracking ID</span>
                    <div class="value">${pkg.id}</div>
                </div>
                <div class="info-item">
                    <span class="label">Status</span>
                    <div class="value" style="color: ${pkg.status === 'Delivered' ? '#00ff00' : '#ffaa00'};">${pkg.status}</div>
                </div>
                <div class="info-item">
                    <span class="label">Contents</span>
                    <div class="value">${pkg.contents}</div>
                </div>
                <div class="info-item">
                    <span class="label">Classification</span>
                    <div class="value">${pkg.classification}</div>
                </div>
                <div class="info-item">
                    <span class="label">Origin</span>
                    <div class="value">${pkg.origin}</div>
                </div>
                <div class="info-item">
                    <span class="label">Destination</span>
                    <div class="value">${pkg.destination}</div>
                </div>
                <div class="info-item">
                    <span class="label">Handler</span>
                    <div class="value">${pkg.handler}</div>
                </div>
                <div class="info-item">
                    <span class="label">Weight</span>
                    <div class="value">${pkg.weight}</div>
                </div>
            </div>
            <h4 style="color: #a89eff; font-family: Tektur, sans-serif; margin: 1.5rem 0 1rem;">Delivery Timeline</h4>
            <div class="timeline">
                ${pkg.timeline.map(item => `
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
            <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">Try: ZDS-PKG-89274-X or ZDS-PKG-45612-A with any 6-digit code</p>
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