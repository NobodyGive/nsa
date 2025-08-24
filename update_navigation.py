#!/usr/bin/env python3
import os
import re

def update_navigation():
    """Update navigation structure across all HTML files"""
    
    # Main navigation structure
    main_nav = '''                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="home.html" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="about.html" class="nav-link">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="donation.html" class="nav-link">Donation & Help</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">Contact</a>
                    </li>
                </ul>'''
    
    # Sidebar structure
    sidebar = '''        <ul class="sidebar-menu">
            <li class="sidebar-item">
                <a href="search.html" class="sidebar-link">
                    <i class="fas fa-search"></i>
                    Find NSA
                </a>
            </li>
            <li class="sidebar-item">
                <a href="map.html" class="sidebar-link">
                    <i class="fas fa-map-marked-alt"></i>
                    Map View
                </a>
            </li>
            <li class="sidebar-item">
                <a href="chapter-map.html" class="sidebar-link">
                    <i class="fas fa-map"></i>
                    Chapter Map
                </a>
            </li>
            <li class="sidebar-item">
                <a href="events.html" class="sidebar-link">
                    <i class="fas fa-calendar-alt"></i>
                    Events Hub
                </a>
            </li>
            <li class="sidebar-item">
                <a href="alumni.html" class="sidebar-link">
                    <i class="fas fa-user-graduate"></i>
                    Alumni Spotlight
                </a>
            </li>
            <li class="sidebar-item">
                <a href="scholarships.html" class="sidebar-link">
                    <i class="fas fa-award"></i>
                    Scholarships
                </a>
            </li>
            <li class="sidebar-item">
                <a href="mentorship.html" class="sidebar-link">
                    <i class="fas fa-hands-helping"></i>
                    Mentorship
                </a>
            </li>
            <li class="sidebar-item">
                <a href="resources.html" class="sidebar-link">
                    <i class="fas fa-book"></i>
                    Resource Center
                </a>
            </li>
            <li class="sidebar-item">
                <a href="news.html" class="sidebar-link">
                    <i class="fas fa-newspaper"></i>
                    News & Updates
                </a>
            </li>
            <li class="sidebar-item">
                <a href="donation.html" class="sidebar-link">
                    <i class="fas fa-hand-holding-heart"></i>
                    Donation & Help
                </a>
            </li>
            <li class="sidebar-item">
                <a href="volunteer.html" class="sidebar-link">
                    <i class="fas fa-heart"></i>
                    Volunteer Board
                </a>
            </li>
            <li class="sidebar-item">
                <a href="marketplace.html" class="sidebar-link">
                    <i class="fas fa-store"></i>
                    Marketplace
                </a>
            </li>
        </ul>'''
    
    # Sidebar overlay
    sidebar_overlay = '''    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>'''
    
    # Files to update (excluding home.html and login.html which are already updated)
    files_to_update = [
        'about.html', 'contact.html', 'search.html', 'map.html', 'chapter-map.html',
        'events.html', 'alumni.html', 'scholarships.html', 'mentorship.html',
        'resources.html', 'news.html', 'donation.html', 'volunteer.html', 'marketplace.html'
    ]
    
    for filename in files_to_update:
        if os.path.exists(filename):
            print(f"Updating {filename}...")
            
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update main navigation
            content = re.sub(
                r'<ul class="nav-menu">.*?</ul>',
                main_nav,
                content,
                flags=re.DOTALL
            )
            
            # Update sidebar menu
            content = re.sub(
                r'<ul class="sidebar-menu">.*?</ul>',
                sidebar,
                content,
                flags=re.DOTALL
            )
            
            # Add sidebar overlay if not present
            if 'sidebar-overlay' not in content:
                content = re.sub(
                    r'(</div>\s*</div>\s*</div>)',
                    sidebar_overlay + r'\1',
                    content
                )
            
            # Update Home link to point to home.html
            content = content.replace('href="index.html"', 'href="home.html"')
            
            # Write updated content
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✓ Updated {filename}")
        else:
            print(f"⚠ File {filename} not found")

if __name__ == "__main__":
    update_navigation()
    print("\nNavigation update complete!")
