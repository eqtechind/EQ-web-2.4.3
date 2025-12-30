# Backend Integration Guide

## Overview
All form components have been updated to be ready for backend integration. The forms now include:

1. **API Health Checks** - Each form checks backend availability on load
2. **Environment-based Configuration** - Can bypass API calls for development
3. **Comprehensive Error Handling** - Handles network, timeout, and server errors
4. **Retry Mechanisms** - Automatic retry for failed connections
5. **Fallback Behavior** - Continues with local data if backend is unavailable

## Environment Configuration

Create a `.env.local` file in your project root with:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001

# Development Settings (set to true to bypass API calls)
NEXT_PUBLIC_SKIP_API=false

# Environment
NODE_ENV=development
```

## API Endpoints

The forms are configured to use these endpoints:

1. **Personal Details**: `POST /api/register`
2. **Verification**: `PUT /api/register/verification/{startupId}`
3. **Startup Details**: `PUT /api/register/startup-details/{startupId}`
4. **Documents**: `PUT /api/register/documents/{startupId}`
5. **Additional Info**: `PUT /api/register/additional-info/{startupId}`
6. **Health Check**: `GET /api/health`

## Form Features

### API Status Indicators
Each form shows the backend connection status:
- 🟢 **Connected**: Backend is available
- 🟠 **Unavailable**: Backend is down, will save locally
- 🔄 **Checking**: Testing connection

### Error Handling
- **Network Errors**: Shows user-friendly messages
- **Timeout Errors**: Handles request timeouts gracefully
- **Server Errors**: Continues with local storage
- **Validation Errors**: Shows specific field errors

### Development Mode
When `NEXT_PUBLIC_SKIP_API=true`:
- Forms bypass API calls
- Data is saved locally with temporary IDs
- Debug information is shown
- Development-friendly messages are displayed

## Data Flow

1. **Step 1 (Personal Details)**: Creates initial startup record
2. **Step 2 (Verification)**: Updates with verification data
3. **Step 3 (Startup Details)**: Updates with business information
4. **Step 4 (Documents)**: Updates with document uploads
5. **Step 5 (Additional Info)**: Finalizes registration

## File Upload Support

- **Max File Size**: 10MB
- **Supported Formats**: PDF, PNG, JPG, JPEG, DOC, DOCX, PPT, PPTX, MP4, AVI, MOV, WMV
- **Validation**: Client-side validation before upload
- **Progress**: Visual indicators for upload status

## Testing

### With Backend
1. Set `NEXT_PUBLIC_SKIP_API=false`
2. Ensure backend is running on configured URL
3. Forms will attempt real API calls

### Without Backend
1. Set `NEXT_PUBLIC_SKIP_API=true`
2. Forms will work offline with local storage
3. Debug information will be visible

## Debug Information

In development mode, each form shows:
- API connection status
- Startup ID tracking
- File upload status
- Form validation state
- Error details

## Next Steps

1. **Backend Setup**: Implement the API endpoints as defined
2. **Database Schema**: Ensure backend matches expected data structure
3. **File Storage**: Configure file upload handling
4. **Authentication**: Add user authentication if needed
5. **Testing**: Test all forms with real backend

## Troubleshooting

### Common Issues
- **CORS Errors**: Configure backend CORS settings
- **File Upload Fails**: Check file size limits and formats
- **API Timeout**: Increase timeout in `api-config.js`
- **Connection Refused**: Verify backend URL and port

### Debug Mode
Enable debug mode by setting `NODE_ENV=development` to see detailed information about API calls and form state.
