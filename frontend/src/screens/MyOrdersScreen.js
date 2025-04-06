import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'; // Add this import
import { getItem } from '../services/authService';
import { listMyOrders } from '../redux/actions/orderActions';
import styles from '../styles/screens/MyOrdersScreenStyles';

const MyOrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const dispatch = useDispatch();
  
  // Get orders from Redux store
  const orderListMy = useSelector(state => state.orderListMy || {});
  const { loading, error, orders: orderData } = orderListMy;
  // Ensure orders is always an array
  const orders = Array.isArray(orderData) ? orderData : orderData?.orders || [];

  // Order status tabs
  const orderTabs = ['All', 'To Ship', 'To Deliver', 'Completed'];

  // Fetch orders whenever screen comes into focus using useFocusEffect
  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          // Check if user is logged in
          const token = await getItem('token');
          
          if (!token) {
            Alert.alert('Error', 'You are not logged in');
            return;
          }
          
          dispatch(listMyOrders());
        } catch (err) {
          console.error('Error:', err);
        }
      };

      fetchOrders();
    }, [dispatch])
  );

  // Filter orders based on active tab - using useCallback to optimize performance
  const getFilteredOrders = useCallback(() => {
    if (!orders || !Array.isArray(orders)) {
      return [];
    }
    
    if (activeTab === 'All') {
      return orders;
    } else if (activeTab === 'Completed') {
      return orders.filter(order => 
        order.orderStatus === 'Completed'
      );
    } else if (activeTab === 'To Ship') {
      return orders.filter(order => 
        order.orderStatus === 'To Ship'
      );
    } else if (activeTab === 'To Deliver') {
      return orders.filter(order => 
        order.orderStatus === 'To Deliver'
      );
    } else {
      return orders.filter(order => order.orderStatus === activeTab);
    }
  }, [orders, activeTab]);

  // Handle tab change without affecting other UI elements
  const handleTabPress = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}
    >
    <View style={styles.orderHeader}>

        <Text style={styles.orderId}>Order #{item._id.substring(0, 8)}</Text>
        <Text style={[
          styles.orderStatus, 
          item.orderStatus === 'Delivered' && styles.statusDelivered,
          item.orderStatus === 'Processing' && styles.statusProcessing,
          item.orderStatus === 'Shipped' && styles.statusShipped,
          item.orderStatus === 'To Ship' && styles.statusToShip,
          item.orderStatus === 'To Deliver' && styles.statusToDeliver
        ]}>
          {item.orderStatus}
        </Text>
      </View>
      
      <View style={styles.orderInfo}>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <Text style={styles.orderTotal}>₱{item.totalPrice.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.orderItemsCount}>
        {item.orderItems.length} {item.orderItems.length === 1 ? 'item' : 'items'}
      </Text>
    </TouchableOpacity>
  );

  const renderTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
      contentContainerStyle={styles.tabsContentContainer}
    >
      {orderTabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={styles.tabButton}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={[
            styles.tabButtonText, 
            activeTab === tab && styles.activeTabButtonText
          ]}>
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
  
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(listMyOrders())}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {/* Wrap renderTabs in a View */}
          <View style={styles.tabsWrapper}>
            {renderTabs()}
          </View>
          <FlatList
            data={getFilteredOrders()}
            renderItem={renderOrderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.ordersList}
            ListEmptyComponent={
              <View style={styles.emptyTabContainer}>
                <Text style={styles.emptyTabText}>No orders in this category</Text>
              </View>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyOrdersScreen;
