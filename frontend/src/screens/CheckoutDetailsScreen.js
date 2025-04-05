import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItem, getUserById } from '../services/authService';
import { getCartItemsByIds, removeCartItems } from '../utils/cartDatabase';
import { createOrder } from '../redux/actions/orderActions';
import styles from '../styles/screens/CheckoutDetailsScreenStyles';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';

const CheckoutDetailsScreen = ({ route, navigation }) => {
  const { selectedItemIds, subtotal, shipping, total } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [selectedCourier, setSelectedCourier] = useState('standard');
  
  const [address, setAddress] = useState({
    address: '',
    phoneNo: '',
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddressText, setNewAddressText] = useState('');
  const [newPhoneText, setNewPhoneText] = useState('');

  const dispatch = useDispatch();
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading: orderLoading, success: orderSuccess, error: orderError } = orderCreate;

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive your order', icon: '💵' },
    { id: 'card', name: 'Credit/Debit Card', description: 'Pay now with your card', icon: '💳' },
    { id: 'gcash', name: 'GCash', description: 'Pay with your GCash account', icon: '📱' }
  ];

  const courierOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 150.00, eta: '3-5 days', icon: '🚚' },
    { id: 'express', name: 'Express Delivery', price: 200.00, eta: '1-2 days', icon: '🚀' }
  ];

  useEffect(() => {
    // Reset order state when component mounts
    dispatch({ type: ORDER_CREATE_RESET });

    // Return cleanup function to reset order state when unmounting
    return () => {
      dispatch({ type: ORDER_CREATE_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = await getItem('userId');
        if (userId) {
          const user = await getUserById(userId);
          if (user) {
            setAddress({
              address: user.address || '',
              phoneNo: user.phoneNo || '',
            });
            setNewAddressText(user.address || '');
            setNewPhoneText(user.phoneNo || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const items = await getCartItemsByIds(selectedItemIds);
        const formattedItems = items.map(item => ({
          id: item.id,
          productId: item.productId, // Include the MongoDB product ID
          name: item.productName,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        }));
        setCartItems(formattedItems);
      } catch (error) {
        console.error('Error fetching selected cart items:', error);
        Alert.alert('Error', 'Failed to load checkout items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [selectedItemIds]);

  useEffect(() => {
    if (orderSuccess) {
      // Clean up cart items after successful order
      removeCartItems(selectedItemIds).then(() => {
      }).catch(error => {
        console.error('Error removing cart items after order:', error);
      });
      
      Alert.alert(
        "Order Placed",
        "Your order has been placed successfully!",
        [{ 
          text: "OK", 
          onPress: () => navigation.navigate('MyOrders')
        }]
      );
    }
    if (orderError) {
      Alert.alert(
        "Order Error",
        orderError,
        [{ text: "OK" }]
      );
    }
  }, [orderSuccess, orderError, navigation, selectedItemIds]);

  const getSelectedCourierPrice = () => {
    const courier = courierOptions.find(c => c.id === selectedCourier);
    return courier ? courier.price : shipping;
  };

  const finalTotal = subtotal + getSelectedCourierPrice();

  const placeOrder = async () => {
    if (!address.address) {
      Alert.alert("Error", "Please add a delivery address");
      return;
    }

    if (!address.phoneNo) {
      Alert.alert("Error", "Please add a phone number");
      return;
    }

    try {
      const userId = await getItem('userId');

      // Format order items according to the schema
      const formattedItems = cartItems.map(item => ({
        quantity: item.quantity,
        product: item.productId // Ensure this is the MongoDB `_id`
      }));
  
      // Log for debugging
      console.log('Order items being sent:', formattedItems);

      // Get selected courier details
      const courier = courierOptions.find(c => c.id === selectedCourier);

      // Calculate the final total (subtotal + shipping fee)
      const calculatedTotalPrice = subtotal + courier.price;

      // Create order data object matching your schema
      const orderData = {
        // Shipping info with address and phone
        shippingInfo: {
          address: address.address,
          phoneNo: address.phoneNo
        },
        // Order items with product reference and quantity
        orderItems: formattedItems,
        // Payment method from selection
        PaymentMethod: selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : 
                      selectedPaymentMethod === 'card' ? 'Credit/Debit Card' : 'GCash',
        // Courier information as a single object (not an array)
        Courier: {
          CourierName: courier.name,
          shippingfee: courier.price
        },
        // Total price (sum of product prices plus shipping)
        totalPrice: calculatedTotalPrice,
        // Add user to the order data
        user: userId
      };



      
      // Dispatch order creation action
      dispatch(createOrder(orderData));
    } catch (error) {
      console.error('Error in placeOrder function:', error);
      const errorMessage = error.message || 'An unknown error occurred';
      Alert.alert(
        "Order Error", 
        `Failed to place order: ${errorMessage}. Please try again.`
      );
    }
  };

  const openAddressModal = () => {
    setNewAddressText(address.address);
    setNewPhoneText(address.phoneNo);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    if (!newAddressText.trim()) {
      Alert.alert("Error", "Please fill in the address field");
      return;
    }

    if (!newPhoneText.trim()) {
      Alert.alert("Error", "Please fill in the phone number field");
      return;
    }

    setAddress({
      address: newAddressText,
      phoneNo: newPhoneText,
    });
    setShowAddressModal(false);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150/222222/FFFFFF?text=Product' }} 
        style={styles.itemImage} 
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.priceQuantityRow}>
          <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
          <Text style={styles.itemQuantity}>× {item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            <Text style={styles.sectionCount}>({cartItems.length})</Text>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={openAddressModal}>
              <Text style={styles.addNewButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectionCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardDescription}>{address.address || 'No address set'}</Text>
              <Text style={styles.cardDescription}>Phone: {address.phoneNo || 'No phone number set'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.selectionCard,
                selectedPaymentMethod === method.id && styles.selectedCard
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedPaymentMethod === method.id && styles.radioOuterSelected
                ]}>
                  {selectedPaymentMethod === method.id && <View style={styles.radioInner} />}
                </View>
              </View>
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{method.name}</Text>
                <Text style={styles.cardDescription}>{method.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Method</Text>
          {courierOptions.map(courier => (
            <TouchableOpacity
              key={courier.id}
              style={[
                styles.selectionCard,
                selectedCourier === courier.id && styles.selectedCard
              ]}
              onPress={() => setSelectedCourier(courier.id)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedCourier === courier.id && styles.radioOuterSelected
                ]}>
                  {selectedCourier === courier.id && <View style={styles.radioInner} />}
                </View>
              </View>
              <Text style={styles.methodIcon}>{courier.icon}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{courier.name}</Text>
                <Text style={styles.cardDescription}>Estimated delivery: {courier.eta}</Text>
                <Text style={styles.courierPrice}>₱{courier.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryContainer}>
            {cartItems.map(item => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  {item.name} × {item.quantity}
                </Text>
                <Text style={styles.summaryValue}>₱{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₱{subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>₱{getSelectedCourierPrice().toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₱{finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.totalPreviewContainer}>
          <Text style={styles.totalPreviewLabel}>Total</Text>
          <Text style={styles.totalPreviewValue}>₱{finalTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.placeOrderButton, (loading || orderLoading) && styles.disabledButton]}
          onPress={placeOrder}
          disabled={loading || orderLoading}
        >
          {orderLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAddressModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Address</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput]}
                placeholder="Enter your full address"
                placeholderTextColor="#777777"
                value={newAddressText}
                onChangeText={setNewAddressText}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="#777777"
                value={newPhoneText}
                onChangeText={setNewPhoneText}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowAddressModal(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalSaveButton}
                onPress={saveAddress}
              >
                <Text style={styles.modalSaveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CheckoutDetailsScreen;
