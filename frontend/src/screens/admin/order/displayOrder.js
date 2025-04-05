import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { getAllOrders } from '../../../redux/actions/orderActions';
import { updateOrderStatus as updateOrderStatusAction } from '../../../redux/actions/orderActions';
import styles from '../../../styles/screens/admin/order/displayOrderStyles';

const ORDER_STATUSES = ['Processing', 'To Ship', 'To Deliver', 'Completed', 'Cancelled'];

const AdminOrderScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    // Access orders and loading/error state from Redux
    const { loading, orders, error } = useSelector(state => state.adminOrders);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All');

    useFocusEffect(
        useCallback(() => {
            dispatch(getAllOrders());
        }, [dispatch, refreshTrigger]) // Add refreshTrigger as a dependency
    );
    const filteredOrders = selectedStatus === 'All'
        ? orders
        : orders.filter(order => order.orderStatus === selectedStatus);


    const renderStatusFilter = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
        >
            <TouchableOpacity
                style={[
                    styles.filterChip,
                    selectedStatus === 'All' && styles.filterChipActive
                ]}
                onPress={() => setSelectedStatus('All')}
            >
                <Text style={[
                    styles.filterText,
                    selectedStatus === 'All' && styles.filterTextActive
                ]}>All</Text>
            </TouchableOpacity>
            {ORDER_STATUSES.map((status) => (
                <TouchableOpacity
                    key={status}
                    style={[
                        styles.filterChip,
                        selectedStatus === status && styles.filterChipActive,
                        { backgroundColor: selectedStatus === status ? getStatusColor(status) : '#2A2A2A' }
                    ]}
                    onPress={() => setSelectedStatus(status)}
                >
                    <Text style={[
                        styles.filterText,
                        selectedStatus === status && styles.filterTextActive
                    ]}>{status}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const updateOrderStatus = (orderId, currentStatus) => {
        Alert.alert(
            'Update Order Status',
            'Select new status:',
            ORDER_STATUSES.map((status) => ({
                text: status,
                onPress: () => {
                    if (status !== currentStatus) {
                        dispatch(updateOrderStatusAction(orderId, status)) // Dispatch the Redux action
                            .then(() => {
                                Alert.alert('Success', 'Order status updated successfully', [{ text: 'OK' }]);
                                setRefreshTrigger((prev) => !prev); // Toggle the refreshTrigger to re-fetch orders
                            })
                            .catch((error) => {
                                Alert.alert('Error', error.message, [{ text: 'OK' }]);
                            });
                    }
                },
            })),
            { cancelable: true }
        );
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return '#FFA000'; // Amber
            case 'To Ship': return '#2196F3'; // Blue
            case 'To Deliver': return '#FF9800'; // Orange
            case 'Completed': return '#4CAF50'; // Green
            case 'Cancelled': return '#FF5252'; // Red
            default: return '#AAAAAA'; // Gray for unknown statuses
        }
    };



    const renderOrderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>Order #{item._id.slice(-8)}</Text>
                <TouchableOpacity
                    style={[styles.statusBadge, { backgroundColor: getStatusColor(item.orderStatus) }]}
                    onPress={() => updateOrderStatus(item._id, item.orderStatus)}
                >
                    <Text style={styles.statusText}>{item.orderStatus}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.orderContent}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="person" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Customer:</Text>
                    <Text style={styles.infoValue}>{item.user.name}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="local-shipping" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Shipping:</Text>
                    <Text style={styles.infoValue}>{item.shippingInfo.address}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={20} color="#AAAAAA" />
                    <Text style={styles.infoValue}>{item.shippingInfo.phoneNo}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="payment" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Payment Method:</Text>
                    <Text style={styles.infoValue}>{item.PaymentMethod}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="local-shipping" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Courier:</Text>
                    <Text style={styles.infoValue}>
                        {item.Courier
                            ? `${item.Courier.CourierName} (₱${item.Courier.shippingfee.toFixed(2)})`
                            : 'No courier assigned'}
                    </Text>
                </View>

                <View style={styles.orderItems}>
                    {item.orderItems.map((orderItem, index) => (
                        <View key={index} style={styles.orderItem}>
                            <Text style={styles.itemName}>
                                {orderItem.product.product_name} x{orderItem.quantity}
                            </Text>
                            <Text style={styles.itemPrice}>
                                ₱{(orderItem.product.price * orderItem.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Amount:</Text>
                    <Text style={styles.totalAmount}>₱{item.totalPrice.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.orderFooter}>
                <Text style={styles.dateText}>
                    Ordered on: {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                {item.paidAt && (
                    <Text style={styles.dateText}>
                        Paid on: {new Date(item.paidAt).toLocaleDateString()}
                    </Text>
                )}
                {item.deliveredAt && (
                    <Text style={styles.dateText}>
                        Delivered on: {new Date(item.deliveredAt).toLocaleDateString()}
                    </Text>
                )}
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('dashboard')} // Navigate back to the dashboard
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Orders ({filteredOrders.length})</Text>
                </View>
                {renderStatusFilter()}
            </View>
            <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item._id.toString()} // Use MongoDB's _id field
                contentContainerStyle={styles.orderList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default AdminOrderScreen;