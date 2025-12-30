# Investor PAN Verification Backend Example

## Overview
The PAN process investor page has been updated to be ready for backend integration. Here's what was implemented and how to set up the backend.

## Frontend Features Added

### ✅ **API Integration**
- Real-time backend health checking
- API status indicators (🟢 Connected, 🟠 Unavailable, 🔄 Checking)
- Automatic retry functionality
- Fallback to local storage when backend is unavailable

### ✅ **Enhanced Form Validation**
- PAN format validation (ABCDE1234F pattern)
- Name length validation (minimum 2 characters)
- Date validation (cannot be in the future)
- Real-time validation feedback

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

### **POST** `/api/investor/`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "0000000000",
  "personalEmail": "placeholder@example.com",
  "address": {
    "countryOfOrigin": "India",
    "state": "Placeholder",
    "district": "Placeholder",
    "pincode": "000000",
    "regionalAddress": "Placeholder Address",
    "permanentAddress": "Placeholder Address"
  },
  "occupationDetails": {
    "occupation": "Placeholder",
    "annualIncomeRange": "0-5 Lakhs"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Investor registered successfully",
  "data": {
    "_id": "investor_12345",
    "fullName": "John Doe",
    "phoneNumber": "0000000000",
    "personalEmail": "placeholder@example.com",
    "address": {
      "countryOfOrigin": "India",
      "state": "Placeholder",
      "district": "Placeholder",
      "pincode": "000000",
      "regionalAddress": "Placeholder Address",
      "permanentAddress": "Placeholder Address"
    },
    "occupationDetails": {
      "occupation": "Placeholder",
      "annualIncomeRange": "0-5 Lakhs"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Registration failed",
  "error": "VALIDATION_ERROR"
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

// Investor registration endpoint (Step 1)
app.post('/api/investor/', async (req, res) => {
  try {
    const { fullName, phoneNumber, personalEmail, address, occupationDetails } = req.body;

    // Validate required fields
    if (!fullName || !phoneNumber || !personalEmail || !address || !occupationDetails) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Here you would typically:
    // 1. Validate the data structure
    // 2. Check for duplicate investors
    // 3. Store the investor data in database

    // For now, simulate successful registration
    const investorData = {
      _id: `investor_${Date.now()}`,
      fullName: fullName.trim(),
      phoneNumber,
      personalEmail,
      address,
      occupationDetails,
      createdAt: new Date().toISOString()
    };

    // Save to database (example)
    // await saveInvestorData(investorData);

    res.json({
      success: true,
      message: 'Investor registered successfully',
      data: investorData
    });

  } catch (error) {
    console.error('Investor registration error:', error);
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
2. **Clicks Continue** → API call to `/api/investor/` (Step 1 registration)
3. **Success** → Data stored in localStorage, navigate to next step
4. **Error** → Show error message, fallback to local storage
5. **Next Step** → Data available in localStorage for digilocker process

## Environment Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
NODE_ENV=development
```

## Testing

### With Backend Running:
1. Start your backend server on port 5001
2. Fill the form and click Continue
3. Should see "Investor registration successful!" message
4. Data will be stored in backend and localStorage

### Without Backend:
1. Leave backend server stopped
2. Fill the form and click Continue
3. Should see "Backend unavailable" message
4. Data will be stored locally only
5. Form will still proceed to next step

## Next Steps

1. **Implement the backend endpoint** as shown above
2. **Add database integration** to store investor data
3. **Update the form** to collect actual phone, email, and address data instead of placeholders
4. **Add authentication** if needed
5. **Test the complete flow** with other investor process pages

The page is now fully ready for backend integration and will work seamlessly once you implement the required API endpoint!
