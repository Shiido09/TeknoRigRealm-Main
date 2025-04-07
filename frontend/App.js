// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store'; // Ensure correct path
// import AppNavigator from './src/navigation/AppNavigator';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from "firebase/auth";


// export default function App() {
//   // Move useEffect inside the component
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '719082158171-ilh6riiei6797ij23kbsvrecuci93rr2.apps.googleusercontent.com',
//       offlineAccess: true, 
//       forceCodeForRefreshToken: true, 
//       profileImageSize: 150,
//     });
//   }, []);

//   return (
//     <Provider store={store}>
//       <StatusBar barStyle="light-content" backgroundColor="#121212" />
//       <AppNavigator />
//     </Provider>
//   );
// }


// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store'; // Ensure correct path
// import AppNavigator from './src/navigation/AppNavigator';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { registerForPushNotificationsAsync } from './src/utils/notificationUtils'; // Import notification registration
// import * as Notifications from 'expo-notifications';
// import { getItem } from './src/services/authService'; // Import the function to check login status

// export default function App() {
//   useEffect(() => {
//     // Configure Google Sign-In
//     GoogleSignin.configure({
//       webClientId: '719082158171-ilh6riiei6797ij23kbsvrecuci93rr2.apps.googleusercontent.com',
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//       profileImageSize: 150,
//     });

//     // Register for push notifications
//     const registerPushNotifications = async () => {
//       const token = await registerForPushNotificationsAsync();
//       if (token) {
//         console.log('Push notification token:', token);
//         // Optionally, send the token to the backend here if the user is logged in
//       }
//     };

//     registerPushNotifications();

//   }, []);

//   return (
//     <Provider store={store}>
//       <StatusBar barStyle="light-content" backgroundColor="#121212" />
//       <AppNavigatorWithNotifications />
//     </Provider>
//   );
// }


// const AppNavigatorWithNotifications = () => {
//   useEffect(() => {
//     const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
//       const token = await getItem('token');
//       console.log('Retrieved token in App.js:', token);
//       if (token) {
//         console.log('Notification received:', notification);
//       } else {
//         console.log('User is not logged in. Ignoring notification.');
//       }
//     });

//     const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
//       console.log('Notification response listener triggered:', response); // Debug log
//       const token = await getItem('token'); // Check if the user is logged in
//       if (token) {
//         const { orderId } = response.notification.request.content.data;
//         console.log("mayorder id ba:", orderId);
//         if (orderId) {
//           console.log('Navigate to OrderDetails with orderId:', orderId);
//         }
//       } else {
//         console.log('User is not logged in. Ignoring notification response.');
//       }
//     });

//     return () => {
//       receivedSubscription.remove();
//       responseSubscription.remove();
//     };
//   }, []);

//   return <AppNavigator />;
// };

// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store'; // Ensure correct path
// import AppNavigator from './src/navigation/AppNavigator';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { registerForPushNotificationsAsync } from './src/utils/notificationUtils'; // Import notification registration
// import * as Notifications from 'expo-notifications';
// import { getItem } from './src/services/authService'; // Import the function to check login status

// export default function App() {
//   useEffect(() => {
//     // Configure Google Sign-In
//     GoogleSignin.configure({
//       webClientId: '719082158171-ilh6riiei6797ij23kbsvrecuci93rr2.apps.googleusercontent.com',
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//       profileImageSize: 150,
//     });

//     // Check notification permissions
//     const checkNotificationPermissions = async () => {
//       const { status } = await Notifications.getPermissionsAsync();
//       console.log('Notification Permission Status:', status);
//       if (status !== 'granted') {
//         const { status: newStatus } = await Notifications.requestPermissionsAsync();
//         console.log('Updated Notification Permission Status:', newStatus);
//       }
//     };

//     // Register for push notifications
//     const registerPushNotifications = async () => {
//       const token = await registerForPushNotificationsAsync();
//       if (token) {
//         console.log('Push notification token:', token);
//         // Optionally, send the token to the backend here if the user is logged in
//       }
//     };

//     checkNotificationPermissions();
//     registerPushNotifications();

//   }, []);

//   return (
//     <Provider store={store}>
//       <StatusBar barStyle="light-content" backgroundColor="#121212" />
//       <AppNavigatorWithNotifications />
//     </Provider>
//   );
// }

// const AppNavigatorWithNotifications = () => {
//   useEffect(() => {
//     const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
//       console.log('Notification received:', JSON.stringify(notification, null, 2)); // Log the full notification object
//       const token = await getItem('token');
//       if (token) {
//         console.log('Notification data:', notification.request.content.data); // Log the data field explicitly
//       } else {
//         console.log('User is not logged in. Ignoring notification.');
//       }
//     });

//     const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
//       console.log('Notification response listener triggered:', JSON.stringify(response, null, 2)); // Log the full response object
//       const token = await getItem('token');
//       if (token) {
//         const { orderId } = response.notification.request.content.data;
//         console.log('Order ID:', orderId); // Log the orderId explicitly
//         if (orderId) {
//           console.log('Navigate to OrderDetails with orderId:', orderId);
//         }
//       } else {
//         console.log('User is not logged in. Ignoring notification response.');
//       }
//     });
//     // const receivedSubscription = Notifications.addNotificationReceivedListener(async (notification) => {
//     //   const token = await getItem('token');
//     //   console.log('Retrieved token in App.js:', token);
//     //   if (token) {
//     //     console.log('Notification received:', notification);
//     //   } else {
//     //     console.log('User is not logged in. Ignoring notification.');
//     //   }
//     // });

//     // const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
//     //   console.log('Notification response listener triggered:', response);
//     //   console.log('Notification data:', response.notification.request.content.data); // Log the full data object

//     //   const token = await getItem('token');
//     //   if (token) {
//     //     const { orderId } = response.notification.request.content.data;
//     //     console.log("mayorder id ba:", orderId);
//     //     if (orderId) {
//     //       console.log('Navigate to OrderDetails with orderId:', orderId);
//     //     }
//     //   } else {
//     //     console.log('User is not logged in. Ignoring notification response.');
//     //   }
//     // });

//     return () => {
//       receivedSubscription.remove();
//       responseSubscription.remove();
//     };
//   }, []);

//   return <AppNavigator />;
// };

// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store'; // Ensure correct path
// import AppNavigator from './src/navigation/AppNavigator';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { configureNotificationHandler, setupNotificationListeners } from './src/utils/notificationHandler'; // Import notification handlers

// export default function App() {
//   useEffect(() => {
//     // Configure Google Sign-In
//     GoogleSignin.configure({
//       webClientId: '719082158171-ilh6riiei6797ij23kbsvrecuci93rr2.apps.googleusercontent.com',
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//       profileImageSize: 150,
//     });

//     // Configure notifications
//     configureNotificationHandler();
//   }, []);

//   return (
//     <Provider store={store}>
//       <StatusBar barStyle="light-content" backgroundColor="#121212" />
//       <AppNavigatorWithNotifications />
//     </Provider>
//   );
// }

// const AppNavigatorWithNotifications = () => {
//   useEffect(() => {
//     const cleanup = setupNotificationListeners(); 
//     return () => cleanup();
//   }, []);

//   return <AppNavigator />;
// };

// App.js
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { configureNotificationHandler, setupNotificationListeners } from './src/utils/notificationHandler';
import { navigationRef } from './src/navigation/navigationRef'; // ✅ Add this

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '719082158171-ilh6riiei6797ij23kbsvrecuci93rr2.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 150,
    });

    configureNotificationHandler();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <AppNavigatorWithNotifications />
    </Provider>
  );
}

const AppNavigatorWithNotifications = () => {
  useEffect(() => {
    const cleanup = setupNotificationListeners(); // no need to pass navigation
    return () => cleanup();
  }, []);

  return <AppNavigator ref={navigationRef} />; // ✅ Pass the navigation ref
};
