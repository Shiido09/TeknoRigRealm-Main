import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '../services/authService';
import styles from '../styles/screens/ProfileDetailsScreenStyles';

const ProfileDetailsScreen = ({ route, navigation }) => {
  const { user } = route.params;
  
  // Set up state for form fields
  const [name, setName] = useState(user.name || '');
  const [phoneNo, setPhoneNo] = useState(user.phoneNo || '');
  const [address, setAddress] = useState(user.address || '');
  const [avatarUri, setAvatarUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Show photo selection options
  const handleChangePhoto = async () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose a photo source",
      [
        {
          text: "Camera",
          onPress: () => launchCamera(),
        },
        {
          text: "Photo Library",
          onPress: () => launchPhotoLibrary(),
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };
  
  // Launch camera
  const launchCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to your camera.');
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error using camera:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };
  
  // Launch photo library
  const launchPhotoLibrary = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to your photo library.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };
  
  // Handle profile update
  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      
      const userData = {
        name,
        phoneNo,
        address,
      };
      
      const updatedUser = await updateUser(user._id, userData, avatarUri);
      
      // Update the user data in route params
      navigation.setParams({ user: updatedUser });
      
      // Show success message
      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to Main screen after successful update
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main', params: { refresh: Date.now() } }],
            });
          }
        }
      ]);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: avatarUri || user.avatar?.url || 'https://via.placeholder.com/150/222222/FFFFFF?text=User' }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editPhotoButton} onPress={handleChangePhoto}>
            <Text style={styles.editPhotoButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#777"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.valueText}>{user.email}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNo}
              onChangeText={setPhoneNo}
              placeholder="Enter your phone number"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              placeholderTextColor="#777"
              multiline
            />
          </View>

          <TouchableOpacity 
            style={[styles.editButton, isLoading && styles.disabledButton]}
            onPress={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.editButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetailsScreen;