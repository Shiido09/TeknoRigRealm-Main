import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../../../redux/actions/statActions'; // Import the action
import { logout } from '../../../services/authService'; // Import the logout function
import styles from '../../../styles/screens/admin/dashboard/dashboardStyle';

const AdminDashboard = ({ navigation }) => {
    const dispatch = useDispatch();

    const { loading, stats, error } = useSelector((state) => state.stats);

    useEffect(() => {
        dispatch(fetchStats()); // Fetch stats when the component mounts
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function
            Alert.alert('Logout Successful', 'You have been logged out.');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Navigate to the login screen
            });
        } catch (error) {
            Alert.alert('Logout Failed', 'An error occurred while logging out.');
            console.error('Logout error:', error);
        }
    };

    const renderStatCard = (stat) => (
        <View key={stat.title} style={[styles.statCard, { backgroundColor: stat.backgroundColor }]}>
            <MaterialIcons name={stat.icon} size={30} color={stat.color} style={styles.statIcon} />
            <View style={styles.statTextContainer}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
        </View>
    );

    const features = [
        { title: 'Manage Orders', icon: 'list', screen: 'displayOrder' },
        { title: 'Manage Products', icon: 'inventory', screen: 'displayProduct' },
        { title: 'Manage Users', icon: 'people', screen: 'displayUser' },
        { title: 'Settings', icon: 'settings', screen: 'SettingsScreen' },
    ];

    const renderFeatureButton = (feature) => (
        <TouchableOpacity
            key={feature.title}
            style={styles.featureButton}
            onPress={() => navigation.navigate(feature.screen)}
        >
            <MaterialIcons name={feature.icon} size={24} color="#FFFFFF" />
            <Text style={styles.featureText}>{feature.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.header}>Admin Dashboard</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#FFFFFF" />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <View style={styles.statsContainer}>
                        {renderStatCard({
                            title: 'Total Orders',
                            value: stats.totalOrders,
                            icon: 'shopping-cart',
                            color: '#FF9800',
                            backgroundColor: '#FFE0B2',
                        })}
                        {renderStatCard({
                            title: 'Total Users',
                            value: stats.totalUsers,
                            icon: 'people',
                            color: '#388E3C',
                            backgroundColor: '#C8E6C9',
                        })}
                        {renderStatCard({
                            title: 'Total Revenue',
                            value: `₱${stats.totalRevenue}`,
                            icon: 'attach-money',
                            color: '#1976D2',
                            backgroundColor: '#BBDEFB',
                        })}
                        {renderStatCard({
                            title: 'Total Reviews',
                            value: 200, // Fake data
                            icon: 'rate-review',
                            color: '#D32F2F',
                            backgroundColor: '#FFCDD2',
                        })}
                    </View>
                )}
                <Text style={styles.subHeader}>Features</Text>
                <View style={styles.featuresContainer}>
                    {features.map(renderFeatureButton)}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="#FFFFFF" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminDashboard;