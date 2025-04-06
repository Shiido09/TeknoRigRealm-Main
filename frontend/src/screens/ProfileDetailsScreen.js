import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { updateUser } from '../services/authService';
import styles from '../styles/screens/ProfileDetailsScreenStyles';
import { isValidPhoneNumber, validateRequired } from '../utils/validation';

const ProfileDetailsScreen = ({ route, navigation }) => {
  const { user } = route.params;
  
  // Set up state for form fields
  const [name, setName] = useState(user.name || '');
  const [phoneNo, setPhoneNo] = useState(user.phoneNo || '');
  const [address, setAddress] = useState(user.address || '');
  const [avatarUri, setAvatarUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef(null);
  
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    // Validate name
    const nameValidation = validateRequired(name, 'Name');
    if (!nameValidation.isValid) {
      tempErrors.name = nameValidation.message;
      isValid = false;
    }
    
    // Validate phone number
    if (phoneNo && !isValidPhoneNumber(phoneNo)) {
      tempErrors.phoneNo = 'Please enter a valid phone number';
      isValid = false;
    }
    
    // Validate address
    const addressValidation = validateRequired(address, 'Address');
    if (!addressValidation.isValid) {
      tempErrors.address = addressValidation.message;
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };
  
  // Show photo selection options
  const handleChangePhoto = async () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose a photo source",
      [
        {
          text: "Take Photo",
          onPress: () => openCamera(),
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
  
  // Open camera view
  const openCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setShowCamera(true);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setAvatarUri(photo.uri);
        setShowCamera(false);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
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
    if (!validateForm()) {
      return;
    }
    
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
  
  if (showCamera) {
    if (!permission?.granted) {
      return (
        <View style={styles.cameraPermissionContainer}>
          <Text style={styles.cameraPermissionText}>We need your permission to use the camera</Text>
          <TouchableOpacity 
            style={styles.cameraPermissionButton} 
            onPress={requestPermission}
          >
            <Text style={styles.cameraPermissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView 
          style={styles.camera} 
          facing={facing}
          ref={cameraRef}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.flipButton} 
              onPress={toggleCameraFacing}
            >
              <Text style={styles.flipButtonText}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }
  
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
              style={[styles.input, errors.name && styles.inputError]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({...errors, name: null});
              }}
              placeholder="Enter your name"
              placeholderTextColor="#777"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.valueText}>{user.email}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phoneNo && styles.inputError]}
              value={phoneNo}
              onChangeText={(text) => {
                setPhoneNo(text);
                if (errors.phoneNo) setErrors({...errors, phoneNo: null});
              }}
              placeholder="Enter your phone number"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
            />
            {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                if (errors.address) setErrors({...errors, address: null});
              }}
              placeholder="Enter your address"
              placeholderTextColor="#777"
              multiline
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
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