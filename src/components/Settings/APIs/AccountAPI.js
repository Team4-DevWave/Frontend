export async function changeEmailAPI(newEmail) {
  // Example API request to change email
  // Replace this with your actual backend API call
  // Make sure to handle response and error appropriately
  return fetch('https://www.threadit.tech/api/v1/users/me/settings/change-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newEmail }),
  }).then(response => response.json());
}

export async function changePreferenceAPI(prop, value) {
  // Example API request to change preference (gender, language, location)
  // Replace this with your actual backend API call
  // Make sure to handle response and error appropriately
  return fetch(`https://www.threadit.tech/api/v1/users/me/settings/change-preference/${prop}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),
  }).then(response => response.json());
}
