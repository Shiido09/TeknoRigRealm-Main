import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { getItem, getUserById } from '../services/authService'; // Import SQLite function and getUserById

// Import screens
import LandingPage from '../screens/LandingPage';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminNavigator from './AdminNavigator'; // Import AdminNavigator

// Import styles
import styles from '../styles/navigation/BottomTabNavigatorStyles';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  const displayName = name;
  return (
    <View style={styles.iconContainer}>
      <Text 
        style={[styles.label, focused ? styles.activeLabel : {}]}
        numberOfLines={1}
      >
        {displayName}
      </Text>
    </View>
  );
};

const BottomTabNavigator = ({ navigation, route }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastLogoutTime, setLastLogoutTime] = useState(null);

  // Check login status and user role whenever the tab navigator is focused or when params change
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getItem('token');
      const userId = await getItem('userId');
      const logoutTime = await getItem('lastLogoutTime');
  
      // Update logout time if it changed
      if (logoutTime !== lastLogoutTime) {
        setLastLogoutTime(logoutTime);
      }
  
      setIsLoggedIn(!!token);
  
      // Fetch user details to check if the user is an admin
      if (userId) {
        try {
          const userDetails = await getUserById(userId); 

          setIsAdmin(!!userDetails.isAdmin); 
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
  
    checkLoginStatus();
  
    // Also check when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', checkLoginStatus);
    return unsubscribe;
  }, [navigation, lastLogoutTime, route.params?.refresh]);
  
  // Render different navigators based on user role
  if (isAdmin) {

    return <AdminNavigator />;
  }
  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarShowLabel: false,
      })}
      key={isLoggedIn ? 'logged-in' : 'logged-out'} // Force re-render when login state changes
    >
      <Tab.Screen name="Home" component={LandingPage} />
      {isLoggedIn ? (
        <>
          <Tab.Screen name="Notification" component={NotificationScreen} />
          <Tab.Screen name="Me" component={ProfileScreen} />
        </>
      ) : null}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;