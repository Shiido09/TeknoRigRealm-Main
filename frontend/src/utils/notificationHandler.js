import * as Notifications from 'expo-notifications';
import { getItem } from '../services/authService';
import { navigate } from '../navigation/navigationRef';
import store from '../redux/store';
import { getProductById } from '../redux/actions/productAction';
import { addNotification } from '../screens/NotificationScreen';

export const setupNotificationListeners = () => {
  const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
    console.log('Notification received:', JSON.stringify(notification, null, 2));
    const token = await getItem('token');
    if (token) {
      console.log('Notification data:', notification.request.content.data);
      
      // Save notification to storage
      const { title, body, data } = notification.request.content;
      await addNotification(title, body, data);
    } else {
      console.log('User is not logged in. Ignoring notification.');
    }
  });

  const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
    console.log('Notification response:', JSON.stringify(response, null, 2));
    const token = await getItem('token');
    if (token) {
      const { orderId, productId } = response.notification.request.content.data;

      if (orderId) {
        console.log('Navigating to OrderDetails with:', orderId);
        navigate('OrderDetails', { orderId });
      } else if (productId) {
        console.log('Fetching product details for productId:', productId);
        try {
          // Dispatch the Redux action to fetch product details
          await store.dispatch(getProductById(productId));

          // Get the product details from the Redux store
          const state = store.getState();
          const product = state.productState.product; // Access product from productState

          if (product) {
            console.log('Navigating to ProductDetail with product:', product);
            navigate('ProductDetail', { product });
          } else {
            console.error('Failed to fetch product details.');
          }
        } catch (error) {
          console.error('Error fetching product details:', error.message);
        }
      }
    } else {
      console.log('User is not logged in. Ignoring notification response.');
    }
  });

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
