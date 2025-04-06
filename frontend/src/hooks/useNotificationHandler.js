import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getItem } from '../services/authService'; // Import the function to check login status

Notifications.setNotificationHandler({
    handleNotification: async () => {
        const token = await getItem('token'); // Check if the user is logged in
        if (token) {
            console.log('User is logged in. Suppressing notification.');
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            };
            
        } else {
            console.log('User is not logged in. Suppressing notification.');
            return {
                shouldShowAlert: false,
                shouldPlaySound: false,
                shouldSetBadge: false,
            };
        }
    },
});

export const useNotificationHandler = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
            const { orderId } = response.notification.request.content.data;
            if (orderId) {
                navigation.navigate('OrderDetails', { orderId }); // Navigate to the order details screen
            }
        });

        return () => subscription.remove();
    }, [navigation]);
};