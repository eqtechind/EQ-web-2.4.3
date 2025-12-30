# Troubleshooting Guide

## Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This error occurs when the backend server returns an HTML page instead of JSON. Here's how to fix it:

### 1. Check if Backend Server is Running

**Test the backend connection:**
```javascript
// Open browser console and run:
window.testBackend()
```

**Or manually test:**
```bash
curl http://localhost:5001/api/health
```

### 2. Common Causes and Solutions

#### Backend Server Not Running
- **Problem**: No server running on port 5001
- **Solution**: Start your backend server
- **Check**: Look for server startup logs

#### Wrong Port or URL
- **Problem**: Backend running on different port
- **Solution**: Update the URL in the form
- **Check**: Verify the correct port in your backend configuration

#### API Endpoint Doesn't Exist
- **Problem**: `/api/register` endpoint not implemented
- **Solution**: Implement the endpoint in your backend
- **Check**: Verify your backend routes

#### CORS Issues
- **Problem**: Cross-origin requests blocked
- **Solution**: Configure CORS in your backend
- **Check**: Look for CORS errors in browser console

### 3. Quick Fix for Development

If you want to continue development without the backend:

1. **Modify the form to skip API calls temporarily:**
```javascript
// In PersonalDetailsForm.jsx, replace the try-catch with:
const onSubmit = async (data) => {
  // Skip API call for now
  console.log('Form data:', data);
  alert('Step 1 complete! (API call skipped for development)');
  
  onNext({
    ...data,
    _id: `temp_${Date.now()}`,
    _savedLocally: true
  });
};
```

### 4. Backend Server Setup

If you need to set up a basic backend server:

#### Node.js/Express Example:
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Registration endpoint
app.post('/api/register', (req, res) => {
  console.log('Registration data:', req.body);
  res.json({
    success: true,
    data: {
      _id: 'generated_id_' + Date.now(),
      ...req.body
    }
  });
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
```

### 5. Testing Steps

1. **Start your backend server**
2. **Test health endpoint**: `curl http://localhost:5001/api/health`
3. **Test registration endpoint**: 
   ```bash
   curl -X POST http://localhost:5001/api/register \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test User","phoneNumber":"1234567890","personalEmail":"test@example.com"}'
   ```
4. **Try the form again**

### 6. Debug Information

The updated form now includes better error handling:
- Checks if response is JSON before parsing
- Shows specific error messages
- Continues with temporary ID if backend fails
- Logs detailed error information to console

Check the browser console for detailed error information when the form fails.
