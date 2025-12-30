# Backend Connection Setup Guide

This guide explains how to configure the backend connection for the EQvisor application, specifically for the `StartupAdditionalInfoForm` and other forms.

## Overview

The application has been enhanced with robust backend connection capabilities that include:

- **Centralized API Configuration**: All API settings are managed in `src/lib/api-config.js`
- **Environment-based Configuration**: Different settings for development and production
- **Fallback Mechanisms**: Forms work even when the backend is unavailable
- **Error Handling**: Comprehensive error handling for various scenarios
- **File Upload Support**: Secure file upload with validation

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001

# Development Mode Settings
NEXT_PUBLIC_SKIP_API=false

# Payment Configuration (if using Razorpay)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here

# Firebase Configuration (if using Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here

# Backend API Keys (if required)
NEXT_PUBLIC_API_KEY=your_api_key_here

# Environment
NODE_ENV=development
```

## API Configuration

The API configuration is centralized in `src/lib/api-config.js` and includes:

### Endpoints
- `HEALTH`: `/api/health` - Health check endpoint
- `REGISTER`: `/api/register` - Main registration endpoint
- `PERSONAL_DETAILS`: `/api/register` - Personal details submission
- `VERIFICATION`: `/api/register/verification` - Verification data
- `STARTUP_DETAILS`: `/api/register/startup-details` - Startup information
- `DOCUMENTS`: `/api/register/documents` - Document uploads
- `ADDITIONAL_INFO`: `/api/register/additional-info` - Additional information

### Configuration Options
- **Timeout**: 30 seconds for API requests
- **Retry Attempts**: 3 attempts for failed requests
- **File Upload**: 5MB maximum file size
- **Allowed File Types**: PDF, PNG, JPG, JPEG, DOC, DOCX

## Backend Requirements

Your backend should implement the following endpoints:

### 1. Health Check Endpoint
```
GET /api/health
Response: 200 OK
```

### 2. Registration Endpoints
```
POST /api/register
PUT /api/register/verification/:id
PUT /api/register/startup-details/:id
PUT /api/register/documents/:id
PUT /api/register/additional-info/:id
```

### 3. Expected Request Format
The forms send data as `FormData` with the following structure:

```javascript
// Text fields
formData.append('fieldName', 'value');

// Arrays (like stakeholders)
formData.append('stakeholders', JSON.stringify([
  { name: 'John Doe', designation: 'CEO' }
]));

// Files
formData.append('fileField', fileObject);
```

### 4. Expected Response Format
```javascript
{
  success: true,
  data: {
    _id: 'startup_id',
    // ... other fields
  },
  message: 'Success message'
}
```

## Development Mode

During development, you can:

1. **Skip API Calls**: Set `NEXT_PUBLIC_SKIP_API=true` to bypass backend calls
2. **Use Local Storage**: Forms will save data locally when backend is unavailable
3. **Debug Information**: Development mode shows debug information in forms

## Production Deployment

For production:

1. Set `NODE_ENV=production`
2. Configure `NEXT_PUBLIC_API_BASE_URL` to your production backend URL
3. Ensure all environment variables are properly set
4. Test the health check endpoint

## Error Handling

The application handles various error scenarios:

- **Network Errors**: Shows user-friendly messages and falls back to local storage
- **Timeout Errors**: Retries requests with exponential backoff
- **Server Errors**: Graceful degradation with local storage
- **Validation Errors**: Client-side validation with helpful error messages

## File Upload Security

File uploads include:

- **Type Validation**: Only allowed file types are accepted
- **Size Validation**: Files are limited to 5MB
- **Client-side Validation**: Immediate feedback on file selection
- **Server-side Validation**: Backend should also validate files

## Testing

To test the backend connection:

1. Start your backend server
2. Set `NEXT_PUBLIC_API_BASE_URL` to your backend URL
3. Navigate to the startup registration form
4. Check the API status indicator in the form
5. Submit the form and verify data is saved

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **Connection Refused**: Check if your backend server is running
3. **Timeout Errors**: Increase `TIMEOUT` in `api-config.js` if needed
4. **File Upload Failures**: Check file size and type restrictions

### Debug Information

In development mode, forms show debug information including:
- API status
- Connection retries
- Form validation status
- File upload status

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **API Keys**: Use secure methods to store and transmit API keys
3. **File Uploads**: Implement proper file validation on the backend
4. **CORS**: Configure CORS properly for production domains
5. **HTTPS**: Use HTTPS in production for all API communications

## Migration Guide

If you're upgrading from the previous version:

1. The form will continue to work with existing backend endpoints
2. New features are backward compatible
3. Environment variables are optional (defaults are provided)
4. No breaking changes to the existing API structure

## Support

For issues or questions:
1. Check the debug information in development mode
2. Review the browser console for error messages
3. Verify your backend endpoints are working correctly
4. Ensure environment variables are properly configured
