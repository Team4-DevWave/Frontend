export const fetchBlockedUsers = async (setSnackbarInfo) => {
  let data = []; // Initialize data variable outside the try block
  try {
    const response = await fetch('/api/blockedUsers');
    if (response.ok) {
      data = await response.json();
      setSnackbarInfo({ isOpen: true, message: 'Blocked users fetched successfully.', severity: 'success' });
    } else {
      throw new Error('Failed to fetch blocked users');
    }
  } catch (error) {
    setSnackbarInfo({ isOpen: true, message: 'An error occurred while fetching blocked users. Please try again later.', severity: 'error' });
  }
  return data; // Return data variable
};

export const fetchMutedCommunities = async (setSnackbarInfo) => {
  let data = []; // Initialize data variable outside the try block
  try {
    const response = await fetch('/api/mutedCommunities');
    if (response.ok) {
      data = await response.json();
      setSnackbarInfo({ isOpen: true, message: 'Muted communities fetched successfully.', severity: 'success' });
    } else {
      throw new Error('Failed to fetch muted communities');
    }
  } catch (error) {
    setSnackbarInfo({ isOpen: true, message: 'An error occurred while fetching muted communities. Please try again later.', severity: 'error' });
  }
  return data; // Return data variable
};
