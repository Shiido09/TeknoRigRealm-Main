import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrderStatus } from '../redux/actions/orderActions';
import { ORDER_UPDATE_STATUS_RESET } from '../redux/constants/orderConstants'; // Make sure this constant exists
import styles from '../styles/screens/OrderDetailsScreenStyles';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();
  
  // Get order details from Redux store
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, error, order } = orderDetails;
  
  // Get status update state from Redux
  const statusUpdate = useSelector(state => state.orderUpdateStatus || {});
  const { loading: updateLoading, success: updateSuccess, error: updateError } = statusUpdate;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    
    // Clean up when component unmounts
    return () => {
      if (updateSuccess) {
        dispatch({ type: ORDER_UPDATE_STATUS_RESET });
      }
    };
  }, [dispatch, orderId]);

  // Refresh order details when status is updated successfully
  useEffect(() => {
    if (updateSuccess) {
      dispatch(getOrderDetails(orderId));
      // Show success message
      Alert.alert(
        "Success",
        "Order status updated successfully",
        [{ text: "OK" }]
      );
      // Reset the update status
      dispatch({ type: ORDER_UPDATE_STATUS_RESET });
    }
    
    if (updateError) {
      Alert.alert(
        "Error",
        updateError || "Failed to update order status",
        [{ text: "OK" }]
      );
    }
  }, [updateSuccess, updateError, dispatch, orderId]);

  // Handle marking order as completed
  const handleMarkAsCompleted = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to mark this order as completed?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes, Complete", 
          onPress: () => {
            dispatch(updateOrderStatus(orderId, "Completed"));
          }
        }
      ]
    );
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image 
        source={{ 
          uri: item.product?.product_images?.[0]?.url || 
               'https://via.placeholder.com/150/222222/FFFFFF?text=No+Image' 
        }} 
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.product?.product_name || 'Product Name Unavailable'}</Text>
        <Text style={styles.productPrice}>₱{item.product?.price ? item.product.price.toFixed(2) : '0.00'}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity || 0}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => dispatch(getOrderDetails(orderId))}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!order || Object.keys(order).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text>No order found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {/* Order ID and Status */}
        <View style={styles.orderHeaderSection}>
          <Text style={styles.orderId}>Order #{order._id}</Text>
          <Text style={[
            styles.orderStatus,
            order.orderStatus === 'Completed' && styles.statusCompleted,
            order.orderStatus === 'To Ship' && styles.statusToShip,
            order.orderStatus === 'To Deliver' && styles.statusToDeliver
          ]}>
            {order.orderStatus}
          </Text>
        </View>
        
        {/* Mark as Completed Button - Only show for "To Deliver" orders */}
        {order.orderStatus === 'To Deliver' && (
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={handleMarkAsCompleted}
            disabled={updateLoading}
          >
            {updateLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.completeButtonText}>Mark as Completed</Text>
            )}
          </TouchableOpacity>
        )}
        
        {/* Order Date and Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Date</Text>
          <Text style={styles.sectionContent}>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        
        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressContainer}>
          <Text style={styles.addressName}>
              {order.user?.name || 'Customer'}
              </Text>
              <Text style={styles.addressLine}>
              {order.shippingInfo?.address || order.shippingAddress?.address || 'No address provided'}
          </Text>
          <Text style={styles.phoneNumber}>
            Phone: {order.shippingInfo?.phoneNo || order.shippingAddress?.phoneNumber || 'N/A'}
          </Text>
        </View>
      </View>
        
      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.sectionContent}>{order.PaymentMethod}</Text>
      </View>
        
        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <FlatList
            data={order.orderItems}
            renderItem={renderOrderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
        
        {/* Order Summary */}
              <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={{backgroundColor: '#2A2A2A', borderRadius: 8, padding: 12}}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Total</Text>
            <Text style={styles.summaryValue}>
              ₱{order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
            </Text>
          </View>
          {order.Courier && order.Courier.shippingfee > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee</Text>
              <Text style={styles.summaryValue}>
                ₱{order.Courier.shippingfee ? order.Courier.shippingfee.toFixed(2) : '0.00'}
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₱{order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;