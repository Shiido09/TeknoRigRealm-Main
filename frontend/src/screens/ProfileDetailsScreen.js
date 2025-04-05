import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/screens/ProfileDetailsScreenStyles';

const ProfileDetailsScreen = ({ route, navigation }) => {
  const { user } = route.params;

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
            source={{ uri: user.avatar?.url || 'https://via.placeholder.com/150/222222/FFFFFF?text=User' }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editPhotoButton}>
            <Text style={styles.editPhotoButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.valueText}>{user.name}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.valueText}>{user.email}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.valueText}>{user.phoneNo}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.valueText}>{user.address}</Text>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile', { user })}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetailsScreen;
