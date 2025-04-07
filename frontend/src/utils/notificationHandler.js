import * as Notifications from 'expo-notifications';
import { getItem } from '../services/authService'; // Ensure correct path to authService

export const setupNotificationListeners = (navigation) => {
  // Listener for receiving notifications
  const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
    console.log('Notification received:', JSON.stringify(notification, null, 2)); // Log the full notification object
    const token = await getItem('token');
    if (token) {
      console.log('Notification data:', notification.request.content.data); // Log the data field explicitly
    } else {
      console.log('User is not logged in. Ignoring notification.');
    }
  });

  // Listener for responding to notification interactions
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
    console.log('Notification response listener triggered:', JSON.stringify(response, null, 2)); // Log the full response object
    const token = await getItem('token');
    if (token) {
      const { orderId } = response.notification.request.content.data;
      console.log('Order ID:', orderId); // Log the orderId explicitly
      if (orderId) {
        console.log('Navigate to OrderDetails with orderId:', orderId);
        navigation.navigate('OrderDetails', { orderId }); // Navigate to the order details screen
        console.log('Navigated', orderId);
      }
    } else {
      console.log('User is not logged in. Ignoring notification response.');
    }
  });

  // Cleanup function to remove listeners
  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
};

export const configureNotificationHandler = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const { status } = await Notifications.getPermissionsAsync();
  console.log('Notification Permission Status:', status);
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    console.log('Updated Notification Permission Status:', newStatus);
  }
};