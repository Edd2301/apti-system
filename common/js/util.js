// Utility Functions for APTI Property Management System

// Email validation using regex
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength validation
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        score: 0,
        feedback: []
    };
    
    if (password.length < minLength) {
        strength.feedback.push(`Password must be at least ${minLength} characters long`);
    } else {
        strength.score += 25;
    }
    
    if (!hasUpperCase) {
        strength.feedback.push('Password must contain at least one uppercase letter');
    } else {
        strength.score += 25;
    }
    
    if (!hasLowerCase) {
        strength.feedback.push('Password must contain at least one lowercase letter');
    } else {
        strength.score += 25;
    }
    
    if (!hasNumbers) {
        strength.feedback.push('Password must contain at least one number');
    } else {
        strength.score += 25;
    }
    
    if (hasSpecialChar) {
        strength.score += 10;
    }
    
    return strength;
}

// Show error message in a container
function showError(container, message) {
    try {
        clearMessages(container);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.textContent = message;
        container.insertBefore(errorDiv, container.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    } catch (error) {
        console.error('Error showing error message:', error);
    }
}

// Show success message in a container
function showSuccess(container, message) {
    try {
        clearMessages(container);
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = message;
        container.insertBefore(successDiv, container.firstChild);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    } catch (error) {
        console.error('Error showing success message:', error);
    }
}

// Show warning message in a container
function showWarning(container, message) {
    try {
        clearMessages(container);
        const warningDiv = document.createElement('div');
        warningDiv.className = 'alert alert-warning';
        warningDiv.textContent = message;
        container.insertBefore(warningDiv, container.firstChild);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            if (warningDiv.parentNode) {
                warningDiv.remove();
            }
        }, 4000);
    } catch (error) {
        console.error('Error showing warning message:', error);
    }
}

// Clear all alert messages from container
function clearMessages(container) {
    try {
        const alerts = container.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
    } catch (error) {
        console.error('Error clearing messages:', error);
    }
}

// Format date to readable string
function formatDate(date) {
    try {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
}

// Format currency
function formatCurrency(amount) {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return '$0.00';
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Safe localStorage operations
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// Form validation helpers
function validateForm(formData, rules) {
    const errors = {};
    
    for (const field in rules) {
        const value = formData[field];
        const rule = rules[field];
        
        // Required field validation
        if (rule.required && (!value || value.trim() === '')) {
            errors[field] = `${rule.label || field} is required`;
            continue;
        }
        
        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') continue;
        
        // Email validation
        if (rule.type === 'email' && !validateEmail(value)) {
            errors[field] = `${rule.label || field} must be a valid email address`;
        }
        
        // Password validation
        if (rule.type === 'password') {
            const passwordCheck = validatePassword(value);
            if (!passwordCheck.isValid) {
                errors[field] = passwordCheck.feedback[0];
            }
        }
        
        // Minimum length validation
        if (rule.minLength && value.length < rule.minLength) {
            errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters long`;
        }
        
        // Maximum length validation
        if (rule.maxLength && value.length > rule.maxLength) {
            errors[field] = `${rule.label || field} must be no more than ${rule.maxLength} characters long`;
        }
        
        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value)) {
            errors[field] = rule.message || `${rule.label || field} format is invalid`;
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

// File validation
function validateFile(file, options = {}) {
    const {
        maxSize = 5 * 1024 * 1024, // 5MB default
        allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
    } = options;
    
    const errors = [];
    
    if (!file) {
        errors.push('No file selected');
        return { isValid: false, errors };
    }
    
    // Check file size
    if (file.size > maxSize) {
        errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
        errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }
    
    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext.toLowerCase()));
    if (!hasValidExtension) {
        errors.push(`File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Simulate API delay
function simulateApiDelay(min = 500, max = 1500) {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Show loading state
function showLoading(button, text = 'Loading...') {
    try {
        if (button) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = text;
        }
    } catch (error) {
        console.error('Error showing loading state:', error);
    }
}

// Hide loading state
function hideLoading(button) {
    try {
        if (button && button.dataset.originalText) {
            button.disabled = false;
            button.textContent = button.dataset.originalText;
            delete button.dataset.originalText;
        }
    } catch (error) {
        console.error('Error hiding loading state:', error);
    }
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format phone number
function formatPhoneNumber(phone) {
    try {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    } catch (error) {
        console.error('Error formatting phone number:', error);
        return phone;
    }
}

// Capitalize first letter of each word
function capitalizeWords(str) {
    try {
        return str.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    } catch (error) {
        console.error('Error capitalizing words:', error);
        return str;
    }
}

// Get status badge class
function getStatusBadgeClass(status) {
    const statusMap = {
        'active': 'badge-success',
        'paid': 'badge-success',
        'completed': 'badge-success',
        'pending': 'badge-warning',
        'in-progress': 'badge-warning',
        'overdue': 'badge-danger',
        'failed': 'badge-danger',
        'cancelled': 'badge-danger',
        'inactive': 'badge-danger',
        'draft': 'badge-info',
        'scheduled': 'badge-info'
    };
    
    return statusMap[status.toLowerCase()] || 'badge-info';
}

// Initialize tooltips (simple implementation)
function initTooltips() {
    try {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    } catch (error) {
        console.error('Error initializing tooltips:', error);
    }
}

function showTooltip(event) {
    const element = event.target;
    const tooltipText = element.getAttribute('data-tooltip');
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    
    element._tooltip = tooltip;
}

function hideTooltip(event) {
    const element = event.target;
    if (element._tooltip) {
        element._tooltip.remove();
        delete element._tooltip;
    }
}

// Export functions for use in other scripts
window.APTI_Utils = {
    validateEmail,
    validatePassword,
    showError,
    showSuccess,
    showWarning,
    clearMessages,
    formatDate,
    formatCurrency,
    generateId,
    storage,
    validateForm,
    validateFile,
    simulateApiDelay,
    showLoading,
    hideLoading,
    debounce,
    formatPhoneNumber,
    capitalizeWords,
    getStatusBadgeClass,
    initTooltips
};

// Initialize tooltips when DOM is loaded
document.addEventListener('DOMContentLoaded', initTooltips);

//buttons
// ===== Terms Modal Functions =====
function showTermsModal() {
    const modal = document.getElementById("termsModal");
    if (modal) modal.style.display = "flex";
}

function acceptTerms() {
    const modal = document.getElementById("termsModal");
    if (modal) modal.style.display = "none";
    alert("You accepted the terms ✅");
    // Optional: enable signup form here
    const signupBtn = document.querySelector("#signupForm button[type='submit']");
    if (signupBtn) signupBtn.disabled = false;
}

function closeTermsModal() {
    const modal = document.getElementById("termsModal");
    if (modal) modal.style.display = "none";
}
