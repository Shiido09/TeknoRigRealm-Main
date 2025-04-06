// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';

// export const registerForPushNotificationsAsync = async () => {
//     let token;

//     if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }

//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notifications!');
//         return;
//     }

//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log('Expo Push Token:', token);

//     return token;
// };

// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';

// export const registerForPushNotificationsAsync = async () => {
//     let token;

//     if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }

//     // Check existing permissions
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     console.log('Existing notification permission status:', existingStatus);

//     let finalStatus = existingStatus;

//     // Request permissions if not already granted
//     if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//         console.log('Updated notification permission status:', finalStatus);
//     }

//     // If permission is not granted, alert the user and return
//     if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notifications! Permission not granted.');
//         console.error('Notification permission not granted.');
//         return null;
//     }

//     // Get the Expo push token
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log('Expo Push Token:', token);

//     return token;
// };



import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const registerForPushNotificationsAsync = async () => {
    try {
        if (!Device.isDevice) {
            console.error('Must use physical device for Push Notifications');
            return null;
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.error('Failed to get push token for push notifications!');
            return null;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Generated Push Token:', token);
        return token;
    } catch (error) {
        console.error('Error registering for push notifications:', error);
        return null;
    }
};