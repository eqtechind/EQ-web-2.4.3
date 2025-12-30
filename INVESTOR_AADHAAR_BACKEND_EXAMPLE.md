# Investor Aadhaar Verification Backend Example

## Overview
The Aadhaar verification investor page has been updated to be ready for backend integration. Here's what was implemented and how to set up the backend.

## Frontend Features Added

### ✅ **API Integration**
- Real-time backend health checking
- API status indicators (🟢 Connected, 🟠 Unavailable, 🔄 Checking)
- Automatic retry functionality
- Fallback to local storage when backend is unavailable

### ✅ **Enhanced Form Validation**
- Aadhaar number validation (12 digits only)
- CAPTCHA verification
- Real-time validation feedback
- Input length restrictions

### ✅ **Better User Experience**
- Loading states with spinner
- Disabled form during submission
- Success/error toast notifications
- Improved input styling with focus states

### ✅ **Data Management**
- Stores verification data in localStorage
- Passes data to next step in the flow
- Handles both successful API calls and fallback scenarios

## Backend Endpoint Required

### **POST** `/api/investor/aadhaar-verification`

**Request Body:**
```json
{
  "aadhaarNumber": "123456789012",
  "captcha": "abc123",
  "step": "aadhaar_verification",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Aadhaar verification successful",
  "data": {
    "_id": "aadhaar_12345",
    "aadhaarNumber": "123456789012",
    "verified": true,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Aadhaar verification failed",
  "error": "INVALID_AADHAAR"
}
```

## Backend Implementation Example (Node.js/Express)

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

// Aadhaar verification endpoint
app.post('/api/investor/aadhaar-verification', async (req, res) => {
  try {
    const { aadhaarNumber, captcha } = req.body;

    // Validate required fields
    if (!aadhaarNumber || !captcha) {
      return res.status(400).json({
        success: false,
        message: 'Aadhaar number and CAPTCHA are required'
      });
    }

    // Validate Aadhaar format (12 digits)
    const aadhaarPattern = /^\d{12}$/;
    if (!aadhaarPattern.test(aadhaarNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Aadhaar number format'
      });
    }

    // Here you would typically:
    // 1. Verify CAPTCHA (if using server-side validation)
    // 2. Check Aadhaar with UIDAI API
    // 3. Store the verification data

    // For now, simulate successful verification
    const verificationData = {
      _id: `aadhaar_${Date.now()}`,
      aadhaarNumber,
      verified: true,
      createdAt: new Date().toISOString()
    };

    // Save to database (example)
    // await saveAadhaarVerification(verificationData);

    res.json({
      success: true,
      message: 'Aadhaar verification successful',
      data: verificationData
    });

  } catch (error) {
    console.error('Aadhaar verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
```

## Data Flow

1. **User fills form** → Real-time validation
2. **Clicks Next** → API call to `/api/investor/aadhaar-verification`
3. **Success** → Data stored in localStorage, navigate to next step
4. **Error** → Show error message, fallback to local storage
5. **Next Step** → Data available in localStorage for personal information process

## Environment Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
NODE_ENV=development
```

## Testing

### With Backend Running:
1. Start your backend server on port 5001
2. Fill the form and click Next
3. Should see "Aadhaar verification successful!" message
4. Data will be stored in backend and localStorage

### Without Backend:
1. Leave backend server stopped
2. Fill the form and click Next
3. Should see "Backend unavailable" message
4. Data will be stored locally only
5. Form will still proceed to next step

## Next Steps

1. **Implement the backend endpoint** as shown above
2. **Add database integration** to store Aadhaar verification data
3. **Integrate with UIDAI API** for real Aadhaar verification
4. **Add CAPTCHA server-side validation** if needed
5. **Test the complete flow** with other investor process pages

The page is now fully ready for backend integration and will work seamlessly once you implement the required API endpoint!
