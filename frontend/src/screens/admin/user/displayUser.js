import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'; // Added TouchableOpacity
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllUsers } from '../../../redux/actions/userActions';
import styles from '../../../styles/screens/admin/user/displayUserStyles';

const AdminUserScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    // Access users and loading/error state from Redux
    const { loading, users, error } = useSelector(state => state.adminUsers);

    useFocusEffect(
        useCallback(() => {
            dispatch(getAllUsers());
        }, [dispatch])
    );

    const renderUserItem = ({ item }) => (
        <View style={styles.userCard}>
            <View style={styles.userHeader}>
                <Text style={styles.userName}>{item.name}</Text>
            </View>

            <View style={styles.userContent}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="email" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{item.email}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Phone:</Text>
                    <Text style={styles.infoValue}>{item.phoneNo || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="verified-user" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Role:</Text>
                    <Text style={styles.infoValue}>{item.isAdmin ? 'Admin' : 'User'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="home" size={20} color="#AAAAAA" />
                    <Text style={styles.infoLabel}>Address:</Text>
                    <Text style={styles.infoValue}>{item.address}</Text>
                </View>
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
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('dashboard')}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Users ({users.length})</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.userList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default AdminUserScreen;