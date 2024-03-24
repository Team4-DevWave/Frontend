export const fetchFeedSettings = async (setSnackbarInfo) => {
  try {
    const response = await fetch('/api/feedSettings');
    if (response.ok) {
      const data = await response.json();
      setSnackbarInfo({ isOpen: true, message: 'Feed settings fetched successfully.', severity: 'success' });
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch feed settings');
    }
  } catch (error) {
    setSnackbarInfo({ isOpen: true, message: error.message || 'An error occurred while fetching feed settings. Please try again later.', severity: 'error' });
    // Return an empty object here to ensure that the component continues to render
    return {};
  }
};

export const updateFeedSettings = async (newSettings, setSnackbarInfo) => {
  try {
    const response = await fetch('/api/updateFeedSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSettings),
    });
    if (response.ok) {
      setSnackbarInfo({ isOpen: true, message: 'Feed settings updated successfully.', severity: 'success' });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update feed settings');
    }
  } catch (error) {
    setSnackbarInfo({ isOpen: true, message: error.message || 'An error occurred while updating feed settings. Please try again later.', severity: 'error' });
  }
};
