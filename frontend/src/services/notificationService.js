import axios from 'axios';
import { API_URL } from '../config/apiConfig'; // Ensure the API_URL is correctly imported

export const sendPushTokenToBackend = async (token, userId) => {
    try {
        await axios.post(`${API_URL}/users/update-push-token`, {
            userId,
            pushToken: token,
        });
        console.log('Push token sent to backend successfully');
    } catch (error) {
        console.error('Error sending push token to backend:', error);
    }
};