// import * as Notifications from 'expo-notifications';
// import { getItem } from '../services/authService'; // Ensure correct path to authService

// // export const setupNotificationListeners = (navigation) => {
// //   // Listener for receiving notifications
// //   const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
// //     console.log('Notification received:', JSON.stringify(notification, null, 2)); // Log the full notification object
// //     const token = await getItem('token');
// //     if (token) {
// //       console.log('Notification data:', notification.request.content.data); // Log the data field explicitly
// //     } else {
// //       console.log('User is not logged in. Ignoring notification.');
// //     }
// //   });

// //   // Listener for responding to notification interactions
// //   const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
// //     console.log('Notification response listener triggered:', JSON.stringify(response, null, 2)); // Log the full response object
// //     const token = await getItem('token');
// //     if (token) {
// //       const { orderId } = response.notification.request.content.data;
// //       console.log('Order ID:', orderId); // Log the orderId explicitly
// //       if (orderId) {
// //         console.log('Navigate to OrderDetails with orderId:', orderId);
// //         navigation.navigate('OrderDetails', { orderId }); // Navigate to the order details screen
// //         console.log('Navigated', orderId);
// //       }
// //     } else {
// //       console.log('User is not logged in. Ignoring notification response.');
// //     }
// //   });

// //   // Cleanup function to remove listeners
// //   return () => {
// //     receivedSubscription.remove();
// //     responseSubscription.remove();
// //   };
// // };
// export const setupNotificationListeners = (navigation) => {
//   // Listener for receiving notifications
//   const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
//     console.log('Notification received:', JSON.stringify(notification, null, 2)); // Log the full notification object
//     const token = await getItem('token');
//     if (token) {
//       console.log('Notification data:', notification.request.content.data); // Log the data field explicitly
//     } else {
//       console.log('User is not logged in. Ignoring notification.');
//     }
//   });

//   // Listener for responding to notification interactions
//   const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
//     console.log('Notification response listener triggered:', JSON.stringify(response, null, 2)); // Log the full response object
//     const token = await getItem('token');
//     if (token) {
//       const { orderId, productId } = response.notification.request.content.data;
//       console.log('Order ID:', orderId); // Log the orderId explicitly
//       console.log('Product ID:', productId); // Log the productId explicitly

//       if (orderId) {
//         console.log('Navigate to OrderDetails with orderId:', orderId);
//         navigation.navigate('OrderDetails', { orderId }); // Navigate to the order details screen
//         console.log('Navigated to OrderDetails', orderId);
//       } else if (productId) {
//         console.log('Navigate to ProductDetails with productId:', productId);
//         navigation.navigate('ProductDetails', { productId }); // Navigate to the product details screen
//         console.log('Navigated to ProductDetails', productId);
//       }
//     } else {
//       console.log('User is not logged in. Ignoring notification response.');
//     }
//   });

//   // Cleanup function to remove listeners
//   return () => {
//     receivedSubscription.remove();
//     responseSubscription.remove();
//   };
// };
// export const configureNotificationHandler = async () => {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     }),
//   });

//   const { status } = await Notifications.getPermissionsAsync();
//   console.log('Notification Permission Status:', status);
//   if (status !== 'granted') {
//     const { status: newStatus } = await Notifications.requestPermissionsAsync();
//     console.log('Updated Notification Permission Status:', newStatus);
//   }
// };

import * as Notifications from 'expo-notifications';
import { getItem } from '../services/authService';
import { navigate } from '../navigation/navigationRef'; // ✅ Use custom navigate()
import store from '../redux/store'; // Import your Redux store
import { getProductById } from '../redux/actions/productAction'; // Import your Redux action

export const setupNotificationListeners = () => {
  const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
    console.log('Notification received:', JSON.stringify(notification, null, 2));
    const token = await getItem('token');
    if (token) {
      console.log('Notification data:', notification.request.content.data);
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


// src/utils/notificationHandler.js
// import * as Notifications from 'expo-notifications';
// import { getItem } from '../services/authService';
// import { navigate } from '../navigation/navigationRef'; // ✅ Use custom navigate()

// export const setupNotificationListeners = () => {
//   const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
//     console.log('Notification received:', JSON.stringify(notification, null, 2));
//     const token = await getItem('token');
//     if (token) {
//       console.log('Notification data:', notification.request.content.data);
//     } else {
//       console.log('User is not logged in. Ignoring notification.');
//     }
//   });

//   const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
//     console.log('Notification response:', JSON.stringify(response, null, 2));
//     const token = await getItem('token');
//     if (token) {
//       const { orderId, productId } = response.notification.request.content.data;

//       if (orderId) {
//         console.log('Navigating to OrderDetails with:', orderId);
//         navigate('OrderDetails', { orderId });
//       } else if (productId) {
//         console.log('Navigating to ProductDetail with:', productId);
//         navigate('ProductDetail', { productId });
//       }
//     } else {
//       console.log('User is not logged in. Ignoring notification response.');
//     }
//   });

//   return () => {
//     receivedSubscription.remove();
//     responseSubscription.remove();
//   };
// };

// export const configureNotificationHandler = async () => {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     }),
//   });

//   const { status } = await Notifications.getPermissionsAsync();
//   console.log('Notification Permission Status:', status);
//   if (status !== 'granted') {
//     const { status: newStatus } = await Notifications.requestPermissionsAsync();
//     console.log('Updated Notification Permission Status:', newStatus);
//   }
// };
