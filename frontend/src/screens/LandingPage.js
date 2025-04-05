import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/screens/LandingPageStyles';
import { getItem, logout } from '../services/authService'; // Import SQLite functions

const LandingPage = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkLoginStatus = async () => {
      const token = await getItem('token');
      setIsLoggedIn(!!token); // Convert to boolean
    };

    checkLoginStatus();

    // Listen for navigation focus to update login status
    const unsubscribe = navigation.addListener('focus', () => {
      checkLoginStatus();
    });

    return unsubscribe;
  }, [navigation]);

  // Toggle drawer animation
  const toggleDrawer = () => {
    const toValue = drawerOpen ? -300 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setDrawerOpen(!drawerOpen);
  };

  // Drawer menu items
  const drawerItems = [
    { title: 'My Profile', onPress: () => navigation.navigate('Me') },
    { title: 'My Orders', onPress: () => navigation.navigate('MyOrders') },
    { title: 'Cart', onPress: () => navigation.navigate('Cart') }, // Update to properly navigate to the Cart screen
    { title: 'Log Out', onPress: async () => {
      try {
        await logout(); // Use the proper logout function instead
        setIsLoggedIn(false);
        toggleDrawer();
        // Force navigation reset to refresh the tabs
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main', params: { refresh: Date.now() } }],
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Drawer Overlay */}
      {drawerOpen && (
        <TouchableOpacity 
          style={drawerStyles.overlay} 
          activeOpacity={1} 
          onPress={toggleDrawer}
        />
      )}
      
      {/* Drawer Content */}
      <Animated.View style={[
        drawerStyles.drawer,
        { transform: [{ translateX: slideAnim }] }
      ]}>
        <View style={drawerStyles.drawerHeader}>
          <Text style={drawerStyles.drawerTitle}>TeknorigRealm</Text>
          <Text style={drawerStyles.drawerSubtitle}>Welcome back!</Text>
        </View>
        <View style={drawerStyles.drawerContent}>
          {drawerItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={drawerStyles.drawerItem}
              onPress={item.onPress}
            >
              <Text style={drawerStyles.drawerItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      
      <ScrollView style={styles.scrollView}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.logo}>TeknorigRealm</Text>
          <View style={styles.headerRight}>
            {isLoggedIn ? (
              // Replace Profile button with Drawer Toggle
              <TouchableOpacity 
                style={[styles.authButton, styles.profileButton]} 
                onPress={toggleDrawer}
              >
                <Text style={styles.authButtonText}>Menu</Text>
              </TouchableOpacity>
            ) : (
              // Show login/register buttons when logged out
              <>
                <TouchableOpacity 
                  style={styles.authButton} 
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.authButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.authButton, styles.registerButton]} 
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.authButtonText}>Register</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Next-Gen Tech</Text>
          <Text style={styles.heroTitle}>Ultimate Performance</Text>
          <Text style={styles.heroSubtitle}>
            Premium PC parts and tech accessories for enthusiasts and professionals
          </Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.heroButtonText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
        
        {/* About Us Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About TeknorigRealm</Text>
          <Text style={styles.aboutUsText}>
            Founded in 2023, TeknorigRealm is a premier destination for tech enthusiasts and PC builders. 
            We specialize in curating high-quality computer components, peripherals, and complete systems 
            that deliver exceptional performance and reliability.
          </Text>
          
          <View style={styles.aboutUsPointsContainer}>
            <View style={styles.aboutUsPoint}>
              <Text style={styles.aboutUsPointIcon}>🚀</Text>
              <View style={styles.aboutUsPointTextContainer}>
                <Text style={styles.aboutUsPointTitle}>Our Mission</Text>
                <Text style={styles.aboutUsPointDesc}>
                  To provide tech enthusiasts with cutting-edge products that enhance their computing experience.
                </Text>
              </View>
            </View>
            
            <View style={styles.aboutUsPoint}>
              <Text style={styles.aboutUsPointIcon}>💡</Text>
              <View style={styles.aboutUsPointTextContainer}>
                <Text style={styles.aboutUsPointTitle}>Our Vision</Text>
                <Text style={styles.aboutUsPointDesc}>
                  To become the most trusted name in computer hardware and accessories in the Philippines.
                </Text>
              </View>
            </View>
            
            <View style={styles.aboutUsPoint}>
              <Text style={styles.aboutUsPointIcon}>💎</Text>
              <View style={styles.aboutUsPointTextContainer}>
                <Text style={styles.aboutUsPointTitle}>Our Values</Text>
                <Text style={styles.aboutUsPointDesc}>
                  Quality, innovation, customer satisfaction, and technical expertise guide everything we do.
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.aboutUsButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.aboutUsButtonText}>EXPLORE OUR PRODUCTS</Text>
          </TouchableOpacity>
        </View>
        
        {/* Why Us Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <Text style={styles.whyUsSubtitle}>
            At TeknorigRealm, we're passionate about providing the best tech solutions for our customers.
            Here's why tech enthusiasts trust us:
          </Text>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

// Drawer styles
const drawerStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 280,
    height: '100%',
    backgroundColor: '#1A1A1A',
    zIndex: 2,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  drawerHeader: {
    marginBottom: 30,
  },
  drawerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  drawerSubtitle: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  drawerItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

// Features
const features = [
  { icon: '🚚', title: 'Fast Delivery', description: 'Get your tech delivered to your doorstep quickly' },
  { icon: '🔒', title: 'Secure Payments', description: 'Shop with confidence with our secure payment options' },
  { icon: '🔄', title: 'Easy Returns', description: '30-day hassle-free return policy' },
  { icon: '🏆', title: 'Quality Products', description: 'Only the best tech components make it to our store' },
];

export default LandingPage;
