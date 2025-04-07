import * as SQLite from 'expo-sqlite';
import { API_URL } from '../config/apiConfig';
import { registerForPushNotificationsAsync } from '../utils/notificationUtils'; // Import the notification utility
import { sendPushTokenToBackend } from './notificationService'; // Import the function to send the push token

let db;

// Initialize the SQLite database
const initDatabase = async () => {
  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync('teknorigAuth.db');

      // Create table if it doesn't exist
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS secure_store (
          key TEXT PRIMARY KEY NOT NULL,
          value TEXT NOT NULL
        );
      `);
    }
    return db;
  } catch (error) {
    console.error('Error initializing auth database:', error);
    throw error;
  }
};

// Helper function to set a key-value pair
export const setItem = async (key, value) => {
  try {
    const database = await initDatabase();

    // Use REPLACE to handle both inserts and updates
    await database.runAsync(
      'REPLACE INTO secure_store (key, value) VALUES (?, ?)',
      key,
      value.toString()
    );
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    throw error;
  }
};

// Helper function to get a value by key
export const getItem = async (key) => {
  try {
    const database = await initDatabase();

    const result = await database.getFirstAsync(
      'SELECT value FROM secure_store WHERE key = ?',
      key
    );

    return result ? result.value : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

// Helper function to delete a key-value pair
export const deleteItem = async (key) => {
  try {
    const database = await initDatabase();
    await database.runAsync('DELETE FROM secure_store WHERE key = ?', key);
  } catch (error) {
    console.error(`Error deleting item ${key}:`, error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User data (email, password, name, address, phoneNo)
 * @param {String} profileImageUri - Path to user's profile image 
 * @returns {Promise} Response from API
 */
// export const register = async (userData, profileImageUri) => {
//   try {
//     // Create form data for multi-part request (for image upload)
//     const formData = new FormData();

//     // Add user data to form
//     Object.keys(userData).forEach(key => {
//       formData.append(key, userData[key]);
//     });

//     // Add image if provided
//     if (profileImageUri) {
//       const uriParts = profileImageUri.split('.');
//       const fileType = uriParts[uriParts.length - 1];

//       formData.append('avatar', {
//         uri: profileImageUri,
//         name: `avatar.${fileType}`,
//         type: `image/${fileType}`
//       });
//     }

//     // Make the API request
//     const response = await fetch(`${API_URL}/users/register`, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         // Don't set Content-Type when using FormData
//         'Accept': 'application/json',
//       },
//     });

//     // Parse the response
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Registration failed');
//     }

//     return data;
//   } catch (error) {
//     console.error('Registration error:', error);
//     throw error;
//   }
// };
export const register = async (userData, profileImageUri) => {
  try {
    const formData = new FormData();

    // Add user data to form
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    // Add image if provided
    if (profileImageUri) {
      const uriParts = profileImageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('avatar', {
        uri: profileImageUri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Register for push notifications and send the token to the backend
    const pushToken = await registerForPushNotificationsAsync();
    if (pushToken) {
      await sendPushTokenToBackend(pushToken, data.user._id);
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
/**
 * Login a user
 * @param {Object} credentials - User credentials (email, password)
 * @returns {Promise} Response from API
 */
// export const login = async (credentials) => {
//   try {
//     const response = await fetch(`${API_URL}/users/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }

//     // Store token and user ID in SQLite database
//     await setItem('token', data.token);
//     if (data.user && data.user._id) {
//       await setItem('userId', data.user._id);
//     }

//     return data;
//   } catch (error) {
//     //console.error('Login error:', error);
//     throw error;
//   }
// };

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token and user ID in SQLite database
    await setItem('token', data.token);
    if (data._id) { // Adjust to match the current backend response structure
      console.log("User ID from login response:", data._id);
      await setItem('userId', data._id);

      const pushToken = await registerForPushNotificationsAsync();
      console.log("Push token salogin:", pushToken);
      if (pushToken) {
        await sendPushTokenToBackend(pushToken, data._id);
        console.log('Push token sent to backend:', pushToken);
      }
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Login a user with Google
 * @param {String} idToken - Google ID token
 * @returns {Promise} Response from API
 */
export const googleLogin = async (idToken) => {
  try {
    console.log("Sending Google ID token to backend:",
      typeof idToken,
      idToken ? idToken.substring(0, 20) + "..." : "undefined"
    );

    if (!idToken) {
      throw new Error("No ID token provided");
    }

    const response = await fetch(`${API_URL}/users/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    //console.log("Backend response:", response.status, data.success);

    if (!response.ok) {
      throw new Error(data.message || 'Google login failed');
    }

    // Store token and user ID in SQLite database
    await setItem('token', data.token);
    await setItem('userId', data._id);

    return data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};


/**
 * Fetch user by ID
 * @param {String} userId - User ID
 * @returns {Promise} Response from API
 */
export const getUserById = async (userId) => {
  try {
    const token = await getItem('token');
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }

    return data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Update user by ID
 * @param {String} userId - User ID
 * @param {Object} userData - User data (name, address, phoneNo)
 * @param {String} avatarUri - Path to user's avatar image
 * @returns {Promise} Response from API
 */
export const updateUser = async (userId, userData, avatarUri) => {
  try {
    const token = await getItem('token');
    const formData = new FormData();

    // Add user data to form
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    // Add avatar if provided
    if (avatarUri) {
      const uriParts = avatarUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('avatar', {
        uri: avatarUri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user');
    }

    // Store updated user data for consistent access
    await setItem('userData', JSON.stringify(data.user));

    // Set a timestamp to indicate fresh data
    await setItem('userDataTimestamp', Date.now().toString());

    return data.user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Get current user data from local storage or fetch from API
 * @param {Boolean} forceRefresh - Force fetch from server
 * @returns {Promise} User data
 */
export const getCurrentUser = async (forceRefresh = false) => {
  try {
    const userId = await getItem('userId');
    if (!userId) return null;

    // Get cached timestamp and data
    const timestamp = await getItem('userDataTimestamp');
    const now = Date.now();
    const userData = await getItem('userData');

    // Check if we have fresh data (less than 1 minute old)
    const isFreshData = timestamp && (now - parseInt(timestamp)) < 60000;

    // Return cached data if fresh and not forcing refresh
    if (userData && isFreshData && !forceRefresh) {
      return JSON.parse(userData);
    }

    // Otherwise fetch fresh data
    const user = await getUserById(userId);

    // Update the cache
    await setItem('userData', JSON.stringify(user));
    await setItem('userDataTimestamp', now.toString());

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Logout a user by removing the token and making an API call
 * @returns {Promise} Response from API
 */
// export const logout = async () => {
//   try {
//     const token = await getItem('token');

//     if (token) {
//       // Call logout endpoint (will fail silently if server is unavailable)
//       try {
//         await fetch(`${API_URL}/users/logout`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//       } catch (error) {
//         console.log('Server logout failed, continuing with local logout');
//       }
//     }

//     // Only clear the token, keep userId for cart persistence
//     await deleteItem('token');
//     // await deleteItem('userId'); // Commented out to keep userId for cart data

//     // Force a navigation reset by storing a timestamp to trigger app-wide updates
//     await setItem('lastLogoutTime', Date.now().toString());

//     return { success: true };
//   } catch (error) {
//     console.error('Logout error:', error);
//     throw error;
//   }
// };
export const logout = async () => {
  try {
    const token = await getItem('token');
    const userId = await getItem('userId'); // Retrieve the userId from storage

    if (token && userId) {
      // Call logout endpoint to remove pushToken
      try {
        const response = await fetch(`${API_URL}/users/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Include userId in the request body
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Server logout failed:', data.message);
        } else {
          console.log('Server logout successful:', data.message);
        }
      } catch (error) {
        console.log('Server logout failed, continuing with local logout');
      }
    }


    await deleteItem('token');
    //await deleteItem('userId');

    // Force a navigation reset by storing a timestamp to trigger app-wide updates
    await setItem('lastLogoutTime', Date.now().toString());

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Change user password
 * @param {String} currentPassword - Current password
 * @param {String} newPassword - New password
 * @returns {Promise} Response from API
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const token = await getItem('token');
    const userId = await getItem('userId');
    
    if (!token || !userId) {
      throw new Error('User not authenticated');
    }
    
    // Create password update data
    const passwordData = {
      currentPassword,
      newPassword,
      updatePassword: true // Flag to indicate this is a password update
    };

    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to change password');
    }
    
    return data;
  } catch (error) {
    //console.error('Password change error:', error);
    throw error;
  }
};
