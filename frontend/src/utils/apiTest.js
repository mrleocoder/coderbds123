// Test API endpoints
const API = process.env.REACT_APP_BACKEND_URL;

// Test upload image
async function testUploadImage() {
    try {
        // Create a dummy image file
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(0, 0, 100, 100);
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'test.png', { type: 'image/png' });
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API}/upload/image`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log('Upload test:', result);
        return result.success;
    } catch (error) {
        console.error('Upload test failed:', error);
        return false;
    }
}

// Test admin login and create property
async function testAdminProperty() {
    try {
        // Login
        const loginResponse = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });
        
        const loginData = await loginResponse.json();
        console.log('Login test:', loginData);
        
        if (!loginData.access_token) {
            throw new Error('Login failed');
        }
        
        // Create property
        const propertyData = {
            title: 'Test Property from Frontend',
            description: 'Test description',
            property_type: 'apartment',
            status: 'for_sale',
            price: 1000000,
            area: 50,
            bedrooms: 2,
            bathrooms: 1,
            address: 'Test Address',
            district: 'Test District',
            city: 'Test City',
            contact_phone: '0123456789',
            featured: false,
            images: []
        };
        
        const propertyResponse = await fetch(`${API}/admin/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.access_token}`
            },
            body: JSON.stringify(propertyData)
        });
        
        const propertyResult = await propertyResponse.json();
        console.log('Property creation test:', propertyResult);
        
        return propertyResult.message === 'Property created successfully';
    } catch (error) {
        console.error('Admin property test failed:', error);
        return false;
    }
}

// Add to window for testing in browser console
window.testAPI = {
    testUploadImage,
    testAdminProperty
};

export { testUploadImage, testAdminProperty };