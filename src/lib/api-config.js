// API Configuration for the application
// This file centralizes all API-related configuration

export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001',
  
  // API Endpoints
  ENDPOINTS: {
    // Health check endpoint
    HEALTH: '/api/health',
    
    // Registration endpoints
    REGISTER: '/api/register',
    PERSONAL_DETAILS: '/api/register',
    VERIFICATION: '/api/register/verification',
    STARTUP_DETAILS: '/api/register/startup-details',
    DOCUMENTS: '/api/register/documents',
    ADDITIONAL_INFO: '/api/register/additional-info',
    
    // Authentication endpoints
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    
    // User management endpoints
    USER_PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    
    // Payment endpoints
    CREATE_ORDER: '/api/payment/order',
    VERIFY_PAYMENT: '/api/payment/verify',
  },
  
  // Request configuration
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // File upload configuration
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB (increased for video files)
  ALLOWED_FILE_TYPES: ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.ppt', '.pptx', '.mp4', '.avi', '.mov', '.wmv'],
  
  // Development mode settings
  SKIP_API: true, // process.env.NODE_ENV === 'development' && 
           // process.env.NEXT_PUBLIC_SKIP_API === 'true',
};

// API Response status codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error messages for different scenarios
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to server. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
};

// Helper function to build API URL
export const buildApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Add query parameters if provided
  if (Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }
  
  return url;
};

// Helper function to handle API responses
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Helper function to create API request with timeout
export const createApiRequest = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Helper function to retry API requests
export const retryApiRequest = async (requestFn, maxRetries = API_CONFIG.RETRY_ATTEMPTS) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error.message.includes('400') || error.message.includes('401') || 
          error.message.includes('403') || error.message.includes('404')) {
        throw error;
      }
      
      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * attempt));
      }
    }
  }
  
  throw lastError;
};

// Helper function to validate file uploads
export const validateFile = (file, allowedTypes = API_CONFIG.ALLOWED_FILE_TYPES, maxSize = API_CONFIG.MAX_FILE_SIZE) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }
  
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return { 
      isValid: false, 
      error: `File type not supported. Allowed: ${allowedTypes.join(', ')}` 
    };
  }
  
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `File size too large. Maximum: ${maxSize / (1024 * 1024)}MB` 
    };
  }
  
  return { isValid: true, error: null };
};

// Specific validation for startup details form files
export const validateStartupDetailsFile = (file, fileType) => {
  console.log('validateStartupDetailsFile called with:', { file, fileType });
  
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }
  
  const validations = {
    boardResolution: {
      allowedTypes: ['.pdf', '.png', '.jpg', '.jpeg'],
      maxSize: 10 * 1024 * 1024, // 10MB
      errorPrefix: 'Board Resolution'
    },
    pitchVideo: {
      allowedTypes: ['.mp4', '.avi', '.mov', '.wmv'],
      maxSize: 10 * 1024 * 1024, // 10MB
      errorPrefix: 'Pitch Video'
    },
    pitchDeck: {
      allowedTypes: ['.pdf', '.ppt', '.pptx'],
      maxSize: 10 * 1024 * 1024, // 10MB
      errorPrefix: 'Pitch Deck'
    }
  };
  
  const config = validations[fileType];
  console.log('Config for fileType:', config);
  
  if (!config) {
    console.log('No config found, falling back to general validation');
    // Fallback to general validation
    return validateFile(file);
  }
  
  // Validate file extension
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  console.log('File extension:', fileExtension);
  console.log('Allowed types:', config.allowedTypes);
  
  if (!config.allowedTypes.includes(fileExtension)) {
    console.log('File type not allowed');
    return { 
      isValid: false, 
      error: `${config.errorPrefix}: File type not supported. Allowed: ${config.allowedTypes.join(', ')}` 
    };
  }
  
  // Validate file size
  if (file.size > config.maxSize) {
    console.log('File size too large');
    return { 
      isValid: false, 
      error: `${config.errorPrefix}: File size too large. Maximum: ${config.maxSize / (1024 * 1024)}MB` 
    };
  }
  
  console.log('File validation passed');
  return { isValid: true, error: null };
};

// Specific validation for additional info form files
export const validateAdditionalInfoFile = (file, fileType) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }
  
  const validations = {
    adtForm: {
      allowedTypes: ['.pdf', '.png', '.jpg', '.jpeg'],
      maxSize: 5 * 1024 * 1024, // 5MB
      errorPrefix: 'ADT Form'
    }
  };
  
  const config = validations[fileType];
  if (!config) {
    // Fallback to general validation
    return validateFile(file);
  }
  
  // Validate file extension
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!config.allowedTypes.includes(fileExtension)) {
    return { 
      isValid: false, 
      error: `${config.errorPrefix}: File type not supported. Allowed: ${config.allowedTypes.join(', ')}` 
    };
  }
  
  // Validate file size
  if (file.size > config.maxSize) {
    return { 
      isValid: false, 
      error: `${config.errorPrefix}: File size too large. Maximum: ${config.maxSize / (1024 * 1024)}MB` 
    };
  }
  
  return { isValid: true, error: null };
};

// Helper function to create FormData for file uploads
export const createFormData = (data, files = {}) => {
  const formData = new FormData();
  
  // Add text data
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  
  // Add files
  Object.keys(files).forEach(key => {
    if (files[key]) {
      formData.append(key, files[key]);
    }
  });
  
  return formData;
};

// Environment-specific configuration
export const getEnvironmentConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    isDevelopment,
    isProduction,
    skipApi: API_CONFIG.SKIP_API,
    enableDebug: isDevelopment,
    enableLogging: isDevelopment,
  };
};

export default API_CONFIG;
