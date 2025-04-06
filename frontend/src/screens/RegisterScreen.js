import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/screens/RegisterScreenStyles';
import { register } from '../services/authService';
import { isValidEmail, validatePassword, isValidPhoneNumber, validateRequired } from '../utils/validation';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [profileImage, setProfileImage] = useState(null);
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
    
    // Validate email
    if (!email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate name
    const nameValidation = validateRequired(name, 'Name');
    if (!nameValidation.isValid) {
      tempErrors.name = nameValidation.message;
      isValid = false;
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      tempErrors.password = passwordValidation.message;
      isValid = false;
    }
    
    // Validate address
    const addressValidation = validateRequired(address, 'Address');
    if (!addressValidation.isValid) {
      tempErrors.address = addressValidation.message;
      isValid = false;
    }
    
    // Validate phone number
    if (!phoneNo) {
      tempErrors.phoneNo = 'Phone number is required';
      isValid = false;
    } else if (!isValidPhoneNumber(phoneNo)) {
      tempErrors.phoneNo = 'Please enter a valid phone number';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      
      const userData = {
        email,
        name,
        password,
        address,
        phoneNo
      };

      const response = await register(userData, profileImage);
      
      Alert.alert(
        'Registration Successful', 
        'Your account has been created successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Login') 
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Registration Failed', 
        error.message || 'An error occurred during registration'
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        setProfileImage(photo.uri);
        setShowCamera(false);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const openPhotoOptions = async () => {
    Alert.alert(
      "Profile Photo",
      "Choose a photo source",
      [
        {
          text: "Take Photo",
          onPress: () => openCamera(),
        },
        {
          text: "Photo Library",
          onPress: () => selectFromLibrary(),
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const selectFromLibrary = async () => {
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
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Register</Text>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.profileImageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.profileImagePlaceholderText}>No Photo</Text>
                </View>
              )}
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={openPhotoOptions}
              >
                <Text style={styles.cameraButtonText}>
                  {profileImage ? 'Change Photo' : 'Add Photo'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              placeholderTextColor="#888888"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({...errors, email: null});
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter your full name"
              placeholderTextColor="#888888"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({...errors, name: null});
              }}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Create a password"
              placeholderTextColor="#888888"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({...errors, password: null});
              }}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
            <Text style={styles.formLabel}>Address</Text>
            <TextInput
              style={[styles.input, styles.addressInput, errors.address && styles.inputError]}
              placeholder="Enter your address"
              placeholderTextColor="#888888"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                if (errors.address) setErrors({...errors, address: null});
              }}
              multiline
              numberOfLines={3}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            
            <Text style={styles.formLabel}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phoneNo && styles.inputError]}
              placeholder="Enter your phone number"
              placeholderTextColor="#888888"
              value={phoneNo}
              onChangeText={(text) => {
                setPhoneNo(text);
                if (errors.phoneNo) setErrors({...errors, phoneNo: null});
              }}
              keyboardType="phone-pad"
            />
            {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}
            
            <TouchableOpacity 
              style={[
                styles.registerButton,
                isLoading && { opacity: 0.7 }
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
