import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getCartItems, updateCartItemQuantity, removeCartItem } from '../utils/cartDatabase';
import styles from '../styles/screens/CartScreenStyles';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  // Calculate the total price of selected items in the cart
  const totalPrice = cartItems
    .filter(item => selectedItems[item.id])
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Count of selected items
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  // Fetch cart items when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [])
  );

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const items = await getCartItems();
      setCartItems(items);
      
      // Initialize selection state for new items
      const initialSelections = {};
      items.forEach(item => {
        initialSelections[item.id] = selectedItems[item.id] || false;
      });
      setSelectedItems(initialSelections);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      Alert.alert('Error', 'Failed to load cart items');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCartItems();
  };

  const handleUpdateQuantity = async (item, change) => {
    try {
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        // If quantity would be zero or negative, ask to remove item
        Alert.alert(
          'Remove Item',
          `Remove ${item.productName} from cart?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Remove', 
              onPress: async () => {
                const success = await removeCartItem(item.id);
                if (success) {
                  fetchCartItems();
                }
              }
            }
          ]
        );
      } else {
        // Update quantity
        const success = await updateCartItemQuantity(item.id, newQuantity);
        if (success) {
          // Update local state to reflect the change
          setCartItems(cartItems.map(cartItem => 
            cartItem.id === item.id 
              ? { ...cartItem, quantity: newQuantity } 
              : cartItem
          ));
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId, productName) => {
    try {
      Alert.alert(
        'Remove Item',
        `Remove ${productName} from cart?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Remove', 
            onPress: async () => {
              const success = await removeCartItem(itemId);
              if (success) {
                fetchCartItems();
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Toggle select all items
  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => selectedItems[item.id]);
    const newSelections = {};
    cartItems.forEach(item => {
      newSelections[item.id] = !allSelected;
    });
    setSelectedItems(newSelections);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => toggleItemSelection(item.id)}
      >
        <View style={[
          styles.checkbox, 
          selectedItems[item.id] && styles.checkboxSelected
        ]}>
          {selectedItems[item.id] && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item, -1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item, 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id, item.productName)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
      ) : cartItems.length > 0 ? (
        <>
          <View style={styles.selectAllContainer}>
            <TouchableOpacity 
              style={styles.selectAllButton}
              onPress={toggleSelectAll}
            >
              <View style={[
                styles.checkbox, 
                cartItems.every(item => selectedItems[item.id]) && styles.checkboxSelected
              ]}>
                {cartItems.every(item => selectedItems[item.id]) && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.selectAllText}>Select All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>
                Total ({selectedCount} item{selectedCount !== 1 ? 's' : ''}):
              </Text>
              <Text style={styles.totalPrice}>₱{totalPrice.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.checkoutButton,
                selectedCount === 0 && styles.checkoutButtonDisabled
              ]}
              onPress={() => {
                if (selectedCount > 0) {
                  // Get only the IDs of selected items
                  const selectedItemIds = cartItems
                    .filter(item => selectedItems[item.id])
                    .map(item => item.id);
                  
                  const subtotal = totalPrice;
                  const shipping = 15.00; // Default shipping fee
                  const total = subtotal + shipping;
                  
                  // Pass only IDs to the checkout screen
                  navigation.navigate('CheckoutDetails', { 
                    selectedItemIds: selectedItemIds,
                    subtotal: subtotal,
                    shipping: shipping,
                    total: total
                  });
                } else {
                  Alert.alert('Selection Required', 'Please select at least one item to checkout');
                }
              }}
              disabled={selectedCount === 0}
            >
              <Text style={styles.checkoutButtonText}>
                {selectedCount > 0 ? `Checkout (${selectedCount})` : 'Select Items to Checkout'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopNowButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
