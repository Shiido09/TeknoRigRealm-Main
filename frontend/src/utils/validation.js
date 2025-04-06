/**
 * Validates an email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password strength
 * @param {string} password - Password to validate
 * @returns {object} - Object containing validation result and message
 */
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { 
      isValid: false, 
      message: 'Password must be at least 6 characters long'
    };
  }
  
  // Check for stronger password (optional enforcement)
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
    return {
      isValid: true,
      strong: false,
      message: 'For stronger security, include uppercase letters, numbers, and special characters'
    };
  }
  
  return { isValid: true, strong: true };
};

/**
 * Validates a phone number format
 * @param {string} phoneNo - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPhoneNumber = (phoneNo) => {
  // Basic validation - can be adjusted for country-specific formats
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phoneNo.replace(/[-\s]/g, ''));
};

/**
 * Validates if a field is not empty
 * @param {string} value - Value to check
 * @param {string} fieldName - Name of the field for error message
 * @returns {object} - Object containing validation result and message
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`
    };
  }
  return { isValid: true };
};
