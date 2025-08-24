// Donation & Help System JavaScript

// Sample data - In a real application, this would come from a backend API
let donationData = {
    totalFunds: 15750,
    totalDonors: 892,
    helpedFamilies: 12,
    targetMembers: 50000,
    currentMembers: 2340
};

let helpRequests = [
    {
        id: 1,
        type: 'medical',
        title: 'Emergency Surgery for Priya',
        description: 'Priya needs immediate surgery after a severe car accident. Her family is struggling with mounting medical bills and needs community support.',
        amountNeeded: 5000,
        amountRaised: 3250,
        urgency: 'critical',
        location: 'Boston, MA',
        postedDate: '2024-01-15',
        donorCount: 87
    },
    {
        id: 2,
        type: 'bereavement',
        title: 'Support for Sharma Family',
        description: 'After the sudden loss of their father, the Sharma family needs help with funeral expenses and temporary financial support.',
        amountNeeded: 3500,
        amountRaised: 2100,
        urgency: 'urgent',
        location: 'New York, NY',
        postedDate: '2024-01-12',
        donorCount: 56
    },
    {
        id: 3,
        type: 'housing',
        title: 'Emergency Housing for Raj',
        description: 'Raj was unexpectedly evicted and needs immediate help securing temporary housing and deposits for a new apartment.',
        amountNeeded: 2000,
        amountRaised: 800,
        urgency: 'urgent',
        location: 'Los Angeles, CA',
        postedDate: '2024-01-10',
        donorCount: 23
    },
    {
        id: 4,
        type: 'medical',
        title: 'Cancer Treatment for Maya',
        description: 'Maya is battling cancer and her insurance doesn\'t cover all treatment costs. The family needs help with medical expenses.',
        amountNeeded: 8000,
        amountRaised: 4500,
        urgency: 'moderate',
        location: 'Chicago, IL',
        postedDate: '2024-01-08',
        donorCount: 134
    }
];

// Initialize the donation page
document.addEventListener('DOMContentLoaded', function() {
    updateStatistics();
    loadHelpRequests();
    initializeModals();
    initializeDonationForm();
    initializeHelpRequestForm();
    updateProgressCircle();
});

// Update statistics on the page
function updateStatistics() {
    document.getElementById('totalFunds').textContent = `$${donationData.totalFunds.toLocaleString()}`;
    document.getElementById('totalDonors').textContent = donationData.totalDonors.toLocaleString();
    document.getElementById('helpedFamilies').textContent = donationData.helpedFamilies;
}

// Update the circular progress indicator
function updateProgressCircle() {
    const progressCircle = document.getElementById('progressCircle');
    const percentage = (donationData.currentMembers / donationData.targetMembers) * 100;
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (percentage / 100) * circumference;
    
    progressCircle.style.strokeDashoffset = offset;
}

// Load and display help requests
function loadHelpRequests() {
    const grid = document.getElementById('helpRequestsGrid');
    grid.innerHTML = '';
    
    helpRequests.forEach(request => {
        const requestCard = createRequestCard(request);
        grid.appendChild(requestCard);
    });
}

// Create a help request card
function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'request-card';
    
    const progressPercentage = Math.round((request.amountRaised / request.amountNeeded) * 100);
    const daysAgo = Math.floor((new Date() - new Date(request.postedDate)) / (1000 * 60 * 60 * 24));
    
    card.innerHTML = `
        <div class="request-header">
            <div class="request-type ${request.type}">
                <i class="fas fa-${getTypeIcon(request.type)}"></i>
                ${getTypeLabel(request.type)}
            </div>
            <div class="request-amount">$${request.amountNeeded.toLocaleString()}</div>
        </div>
        <div class="request-body">
            <h3 class="request-title">${request.title}</h3>
            <p class="request-description">${request.description}</p>
            
            <div class="request-progress">
                <div class="progress-info">
                    <span class="progress-raised">$${request.amountRaised.toLocaleString()} raised</span>
                    <span class="progress-percentage">${progressPercentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
            
            <div class="request-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${request.location}</span>
                <span><i class="fas fa-calendar"></i> ${daysAgo} days ago</span>
                <span><i class="fas fa-users"></i> ${request.donorCount} donors</span>
            </div>
            
            <div class="request-footer">
                <button class="btn btn-primary" onclick="openDonateToRequestModal(${request.id})">
                    <i class="fas fa-heart"></i>
                    Donate Now
                </button>
                <button class="btn btn-secondary" onclick="shareRequest(${request.id})">
                    <i class="fas fa-share"></i>
                    Share
                </button>
                <div class="urgency-badge ${request.urgency}">
                    <i class="fas fa-${getUrgencyIcon(request.urgency)}"></i>
                    ${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Helper functions for request cards
function getTypeIcon(type) {
    const icons = {
        'medical': 'stethoscope',
        'bereavement': 'dove',
        'housing': 'home',
        'emergency': 'exclamation-triangle',
        'financial': 'dollar-sign'
    };
    return icons[type] || 'question-circle';
}

function getTypeLabel(type) {
    const labels = {
        'medical': 'Medical Emergency',
        'bereavement': 'Bereavement Support',
        'housing': 'Housing Crisis',
        'emergency': 'Emergency',
        'financial': 'Financial Hardship'
    };
    return labels[type] || 'Other';
}

function getUrgencyIcon(urgency) {
    const icons = {
        'critical': 'exclamation-circle',
        'urgent': 'clock',
        'moderate': 'info-circle'
    };
    return icons[urgency] || 'info-circle';
}

// Modal management
function initializeModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Donation modal functions
function openDonateModal() {
    document.getElementById('donateModal').style.display = 'flex';
    resetDonationForm();
}

function closeDonateModal() {
    document.getElementById('donateModal').style.display = 'none';
}

function openDonateToRequestModal(requestId) {
    const request = helpRequests.find(r => r.id === requestId);
    if (request) {
        openDonateModal();
        // Pre-fill some information for the specific request
        document.getElementById('donationForm').dataset.requestId = requestId;
    }
}

// Help request modal functions
function openHelpRequestModal() {
    document.getElementById('helpRequestModal').style.display = 'flex';
    resetHelpRequestForm();
}

function closeHelpRequestModal() {
    document.getElementById('helpRequestModal').style.display = 'none';
}

// Initialize donation form
function initializeDonationForm() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const customAmountDiv = document.querySelector('.custom-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            if (this.classList.contains('custom')) {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountDiv.style.display = 'none';
                customAmountInput.value = '';
            }
        });
    });
    
    // Handle donation form submission
    document.getElementById('donationForm').addEventListener('submit', handleDonationSubmission);
}

// Initialize help request form
function initializeHelpRequestForm() {
    document.getElementById('helpRequestForm').addEventListener('submit', handleHelpRequestSubmission);
    
    // Handle file upload display
    const fileInput = document.getElementById('supportingDocs');
    fileInput.addEventListener('change', function() {
        const fileCount = this.files.length;
        const label = this.parentElement.querySelector('.file-upload-label span');
        if (fileCount > 0) {
            label.textContent = `${fileCount} file(s) selected`;
        } else {
            label.textContent = 'Click to upload medical bills, death certificates, police reports, etc.';
        }
    });
}

// Handle donation form submission
function handleDonationSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const activeAmountBtn = document.querySelector('.amount-btn.active');
    const customAmount = document.getElementById('customAmount').value;
    
    let amount;
    if (activeAmountBtn && activeAmountBtn.classList.contains('custom')) {
        amount = parseFloat(customAmount);
    } else if (activeAmountBtn) {
        amount = parseFloat(activeAmountBtn.dataset.amount);
    }
    
    if (!amount || amount <= 0) {
        alert('Please select or enter a valid donation amount.');
        return;
    }
    
    const donationData = {
        amount: amount,
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        university: document.getElementById('donorUniversity').value,
        anonymous: document.getElementById('anonymousDonation').checked,
        message: document.getElementById('donationMessage').value,
        requestId: event.target.dataset.requestId || null
    };
    
    // Simulate donation processing
    processDonation(donationData);
}

// Handle help request form submission
function handleHelpRequestSubmission(event) {
    event.preventDefault();
    
    const requestData = {
        name: document.getElementById('requestorName').value,
        phone: document.getElementById('requestorPhone').value,
        email: document.getElementById('requestorEmail').value,
        location: document.getElementById('requestorLocation').value,
        type: document.getElementById('emergencyType').value,
        description: document.getElementById('emergencyDescription').value,
        amount: parseFloat(document.getElementById('amountNeeded').value),
        urgency: document.getElementById('urgencyLevel').value,
        additionalInfo: document.getElementById('additionalInfo').value,
        files: document.getElementById('supportingDocs').files
    };
    
    // Simulate request processing
    processHelpRequest(requestData);
}

// Simulate donation processing
function processDonation(data) {
    // Show loading state
    const submitBtn = document.querySelector('#donationForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update statistics
        donationData.totalFunds += data.amount;
        donationData.totalDonors += 1;
        updateStatistics();
        
        // Update specific request if applicable
        if (data.requestId) {
            const request = helpRequests.find(r => r.id === parseInt(data.requestId));
            if (request) {
                request.amountRaised += data.amount;
                request.donorCount += 1;
                loadHelpRequests(); // Reload to show updated progress
            }
        }
        
        // Show success message
        alert(`Thank you ${data.anonymous ? 'Anonymous' : data.name}! Your donation of $${data.amount} has been processed successfully.`);
        
        // Reset form and close modal
        resetDonationForm();
        closeDonateModal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Simulate help request processing
function processHelpRequest(data) {
    // Show loading state
    const submitBtn = document.querySelector('#helpRequestForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        alert(`Thank you ${data.name}! Your help request has been submitted successfully. Our review committee will evaluate your request within 24-48 hours and contact you via email.`);
        
        // Reset form and close modal
        resetHelpRequestForm();
        closeHelpRequestModal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Reset donation form
function resetDonationForm() {
    document.getElementById('donationForm').reset();
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.custom-amount').style.display = 'none';
    delete document.getElementById('donationForm').dataset.requestId;
}

// Reset help request form
function resetHelpRequestForm() {
    document.getElementById('helpRequestForm').reset();
    const fileLabel = document.querySelector('.file-upload-label span');
    fileLabel.textContent = 'Click to upload medical bills, death certificates, police reports, etc.';
}

// Share request functionality
function shareRequest(requestId) {
    const request = helpRequests.find(r => r.id === requestId);
    if (request) {
        const shareText = `Please help ${request.title}. They need $${request.amountNeeded.toLocaleString()} for ${request.description.substring(0, 100)}... Every donation counts! #NSACommunitySupport`;
        
        if (navigator.share) {
            navigator.share({
                title: request.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
                alert('Request details copied to clipboard! Share it on social media to help spread the word.');
            });
        }
    }
}

// Load more requests functionality
document.getElementById('loadMoreRequests')?.addEventListener('click', function() {
    // In a real application, this would load more requests from the API
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-plus"></i> Load More Requests';
        // For demo purposes, we'll just show a message
        alert('No more requests to load at this time.');
    }, 1000);
});

// Sidebar toggle functionality (inherited from main script)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Animation for statistics on page load
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.id === 'totalFunds') {
                stat.textContent = `$${Math.floor(current).toLocaleString()}`;
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 50);
    });
}

// Initialize animations when page loads
setTimeout(animateStatistics, 500);

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openDonateModal,
        closeDonateModal,
        openHelpRequestModal,
        closeHelpRequestModal,
        toggleSidebar
    };
}
