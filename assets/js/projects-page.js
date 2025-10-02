/**
 * Projects Page Functionality
 * Handles project display, filtering, and modal interactions
 */

$(document).ready(function() {
    // Initialize dark mode
    initializeDarkMode();
    
    // Populate projects grid
    populateProjects();
    
    // Initialize modal close handlers
    initializeModal();
});

// ============================================
// POPULATE PROJECTS GRID
// ============================================

function populateProjects() {
    const projectsGrid = $('#projects-grid');
    
    if (!data || !data.projects) {
        console.error('Project data not found');
        return;
    }
    
    // Loop through each project
    data.projects.forEach(function(project, index) {
        const card = createProjectCard(project, index);
        projectsGrid.append(card);
    });
    
    // Add stagger animation
    $('.project-card').each(function(index) {
        $(this).css({
            'animation': `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
            'opacity': '0'
        });
    });
}

// ============================================
// CREATE PROJECT CARD
// ============================================

function createProjectCard(project, index) {
    // Create card container
    const card = $('<div>').addClass('project-card');
    
    // Card header with gradient background
    const cardHeader = $('<div>').addClass('project-card-header');
    
    // Logo
    if (project.logo) {
        const logoDiv = $('<div>').addClass('project-logo');
        const logoImg = $('<img>').attr({
            'src': `./assets/icons/logos/${project.logo}`,
            'alt': project.title
        });
        logoDiv.append(logoImg);
        cardHeader.append(logoDiv);
    }
    
    // Title
    const title = $('<h3>').addClass('project-title').text(project.title);
    cardHeader.append(title);
    
    // Date
    if (project.from && project.to) {
        const date = $('<div>').addClass('project-date')
            .html(`<i class="far fa-calendar"></i> ${project.from} - ${project.to}`);
        cardHeader.append(date);
    }
    
    card.append(cardHeader);
    
    // Card body
    const cardBody = $('<div>').addClass('project-card-body');
    
    // Description (first item from desc array)
    if (project.desc && project.desc.length > 0) {
        const description = $('<div>').addClass('project-description')
            .text(project.desc[0]);
        cardBody.append(description);
    }
    
    // Tags (extract key technologies)
    const tags = extractTags(project);
    if (tags.length > 0) {
        const tagsContainer = $('<div>').addClass('project-tags');
        tags.forEach(tag => {
            tagsContainer.append($('<span>').addClass('tag').text(tag));
        });
        cardBody.append(tagsContainer);
    }
    
    // Actions
    const actions = $('<div>').addClass('project-actions');
    
    // View Details button
    const viewBtn = $('<button>')
        .addClass('action-btn primary')
        .html('<i class="fas fa-eye"></i> View Details')
        .on('click', function() {
            openProjectModal(project);
        });
    actions.append(viewBtn);
    
    // External links
    if (project.link && project.link.length > 0) {
        const linkBtn = $('<a>')
            .addClass('action-btn')
            .attr({
                'href': project.link[0],
                'target': '_blank',
                'rel': 'noopener noreferrer'
            })
            .html('<i class="fab fa-github"></i> GitHub')
            .on('click', function(e) {
                e.stopPropagation();
            });
        actions.append(linkBtn);
    }
    
    cardBody.append(actions);
    card.append(cardBody);
    
    return card;
}

// ============================================
// EXTRACT TAGS FROM PROJECT
// ============================================

function extractTags(project) {
    const tags = [];
    const description = project.desc.join(' ').toLowerCase();
    
    // Define keywords to look for
    const keywords = {
        'python': 'Python',
        'machine learning': 'ML',
        'xgboost': 'XGBoost',
        'lstm': 'LSTM',
        'cnn': 'CNN',
        'time series': 'Time Series',
        'clustering': 'Clustering',
        'backtesting': 'Backtesting',
        'portfolio': 'Portfolio',
        'derivatives': 'Derivatives',
        'options': 'Options',
        'risk': 'Risk Management',
        'heston': 'Heston Model',
        'monte carlo': 'Monte Carlo',
        'black-scholes': 'Black-Scholes',
        'django': 'Django',
        'nlp': 'NLP'
    };
    
    // Check for keywords in description
    for (const [keyword, tag] of Object.entries(keywords)) {
        if (description.includes(keyword) && !tags.includes(tag)) {
            tags.push(tag);
            if (tags.length >= 4) break; // Limit to 4 tags
        }
    }
    
    return tags;
}

// ============================================
// PROJECT MODAL
// ============================================

function openProjectModal(project) {
    // Set modal title
    $('#modal-title').text(project.title);
    
    // Set modal date
    if (project.from && project.to) {
        $('#modal-date').html(`<i class="far fa-calendar"></i> ${project.from} - ${project.to}`);
    }
    
    // Set modal description
    const descriptionHtml = '<ul>' + 
        project.desc.map(item => `<li>${item}</li>`).join('') + 
        '</ul>';
    $('#modal-description').html(descriptionHtml);
    
    // Set modal links
    let linksHtml = '';
    if (project.link && project.link.length > 0) {
        project.link.forEach(link => {
            const isGithub = link.includes('github');
            const icon = isGithub ? 'fab fa-github' : 'fas fa-link';
            const text = isGithub ? 'View on GitHub' : 'View Paper';
            linksHtml += `<a href="${link}" target="_blank" rel="noopener noreferrer">
                <i class="${icon}"></i> ${text}
            </a>`;
        });
    }
    
    if (project.doc) {
        linksHtml += `<a href="./assets/docs/${project.doc}" target="_blank">
            <i class="fas fa-file-pdf"></i> Download Document
        </a>`;
    }
    $('#modal-links').html(linksHtml);
    
    // Load PDF if available
    const pdfViewer = $('#pdf-viewer');
    pdfViewer.empty();
    
    if (project.doc) {
        const iframe = $('<iframe>')
            .attr('src', `./assets/docs/${project.doc}`)
            .attr('type', 'application/pdf');
        pdfViewer.append(iframe);
    } else {
        pdfViewer.html('<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No document available for preview.</p>');
    }
    
    // Show modal
    $('#project-modal').addClass('active');
    $('body').css('overflow', 'hidden');
}

function closeModal() {
    $('#project-modal').removeClass('active');
    $('body').css('overflow', '');
}

function initializeModal() {
    // Close modal when clicking outside
    $('#project-modal').on('click', function(e) {
        if (e.target.id === 'project-modal') {
            closeModal();
        }
    });
    
    // Close with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#project-modal').hasClass('active')) {
            closeModal();
        }
    });
}

// ============================================
// DARK MODE (REUSE FROM MAIN)
// ============================================

function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    $('#theme-toggle').on('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = $('#theme-toggle i');
    if (theme === 'dark') {
        icon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        icon.removeClass('fa-sun').addClass('fa-moon');
    }
}