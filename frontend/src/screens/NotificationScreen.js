import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { getItem } from '../services/authService';
import { useDispatch, useSelector } from 'react-redux'; 
import { getProductById } from '../redux/actions/productAction';

// Constants for storage
const NOTIFICATION_STORAGE_KEY = 'appNotifications';

// Function to save notifications to storage
const saveNotifications = async (notifications) => {
  try {
    await SecureStore.setItemAsync(NOTIFICATION_STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// Function to load notifications from storage
const loadNotifications = async () => {
  try {
    const storedNotifications = await SecureStore.getItemAsync(NOTIFICATION_STORAGE_KEY);
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

// Function to add a new notification to storage
export const addNotification = async (title, body, data = {}, timeString = 'Just now') => {
  try {
    const currentNotifications = await loadNotifications();
    const newNotification = {
      id: Date.now().toString(),
      title: title,
      body: body,
      data: data,
      time: timeString,
      read: false,
    };
    
    const updatedNotifications = [newNotification, ...currentNotifications];
    await saveNotifications(updatedNotifications);
    return updatedNotifications;
  } catch (error) {
    console.error('Error adding notification:', error);
    return [];
  }
};

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  // Get product details from Redux
  const productState = useSelector(state => state.productState || {});
  const { loading: productLoading, product } = productState;
  
  // Load saved notifications when component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      const savedNotifications = await loadNotifications();
      setNotifications(savedNotifications);
    };
    
    fetchNotifications();
  }, []);

  // Set up notification listener to update the list when new notifications arrive
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      const token = await getItem('token');
      if (token) {
        const { title, body, data } = notification.request.content;
        
        // Format the current time properly
        const now = new Date();
        let timeString = 'Just now';
        
        const updatedNotifications = await addNotification(title, body, data, timeString);
        setNotifications(updatedNotifications);
      }
    });
    
    // Clean up the subscription when the component unmounts
    return () => subscription.remove();
  }, []);

  // Handle notification press - mark as read AND navigate to relevant screen
  const handleNotificationPress = async (id, notificationData) => {
    // First mark the notification as read
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    await saveNotifications(updatedNotifications);
    setNotifications(updatedNotifications);
    
    // Then navigate based on the notification data
    if (!notificationData) return;
    
    const { orderId, productId } = notificationData;
    
    if (orderId) {
      // Navigate to order details
      console.log('Navigating to OrderDetails with:', orderId);
      navigation.navigate('OrderDetails', { orderId });
    } else if (productId) {
      // For product notifications, we need to fetch the product first
      setIsLoading(true);
      console.log('Fetching product details for productId:', productId);
      try {
        await dispatch(getProductById(productId));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
        setIsLoading(false);
      }
    }
  };

  // When product details are loaded, navigate to product detail screen
  useEffect(() => {
    if (product && product._id && !productLoading) {
      navigation.navigate('ProductDetail', { product });
    }
  }, [product, productLoading, navigation]);

  // Clear all notifications
  const clearAllNotifications = async () => {
    await saveNotifications([]);
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, item.read && styles.readNotification]}
      onPress={() => handleNotificationPress(item.id, item.data)}
      disabled={isLoading}
    >
      {!item.read && <View style={styles.notificationDot} />}
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        {item.body && <Text style={styles.notificationBody}>{item.body}</Text>}
        <Text style={styles.notificationTime}>{item.time}</Text>
        {item.data && item.data.orderId && (
          <Text style={styles.notificationMeta}>Order #{item.data.orderId.slice(-8)}</Text>
        )}
        {item.data && item.data.productId && (
          <Text style={styles.notificationMeta}>Product ID: #{item.data.productId.slice(-8)}</Text>
        )}
      </View>
      {isLoading && <ActivityIndicator size="small" color="#4CAF50" style={styles.loadingIndicator} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={clearAllNotifications} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don't have any notifications yet</Text>
          <Text style={styles.emptySubtext}>Notifications about your orders and products will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 15,
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  listContainer: {
    padding: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  readNotification: {
    opacity: 0.7,
    backgroundColor: '#222222',
  },
  notificationBody: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#AAAAAA',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#777777',
    fontSize: 14,
    textAlign: 'center',
  },
  notificationMeta: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
});

export default NotificationScreen;
