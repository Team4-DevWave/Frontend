// Function to update profile information
export async function updateProfileInfoAPI(profileData) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/users/me/settings/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile information');
    }

    const data = await response.json();
    return data; // Return response data if needed
  } catch (error) {
    console.error('Error updating profile information:', error.message);
    throw error;
  }
}

// Function to add social link
export async function addSocialLinkAPI(link) {
  try {
    const response = await fetch('https://example.com/add-social-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link }),
    });

    if (!response.ok) {
      throw new Error('Failed to add social link');
    }

    const data = await response.json();
    return data; // Return response data if needed
  } catch (error) {
    console.error('Error adding social link:', error.message);
    throw error;
  }
}

// Function to upload image
export async function uploadImageAPI(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('https://example.com/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data; // Return response data if needed
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
}

// AdvancedSettingsAPI.js
export const clearHistoryAPI = async () => {
  try {
    // Example API request to clear history
    // Replace this with your actual backend API call
    const response = await fetch('https://example.com/clear-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Optionally, you can send data in the request body
      body: JSON.stringify({}),
    });
    // Example response handling
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: 'Failed to clear history' };
    }
  } catch (error) {
    console.error('Error clearing history:', error);
    return { success: false, message: 'An error occurred while clearing history. Please try again later.' };
  }
};
