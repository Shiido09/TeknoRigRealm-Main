import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
  },
  authButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: '#2A2A2A',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  profileButton: {
    backgroundColor: '#4CAF50',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroSection: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  heroButton: {
    backgroundColor: '#444444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  productsScroll: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  productCard: {
    width: width * 0.38,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    elevation: 3,
  },
  productImageContainer: {
    height: width * 0.3,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productPrice: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 80,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
  },
  categoryName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  whyUsSubtitle: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 20,
    lineHeight: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    alignItems: 'center',
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  footerText: {
    color: '#AAAAAA',
    marginBottom: 15,
  },
  footerLinks: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  footerLink: {
    color: '#FFFFFF',
    marginHorizontal: 10,
  },
  copyright: {
    color: '#777777',
    fontSize: 12,
  },
  aboutUsText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginBottom: 20,
  },
  aboutUsPointsContainer: {
    marginVertical: 10,
  },
  aboutUsPoint: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  aboutUsPointIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  aboutUsPointTextContainer: {
    flex: 1,
  },
  aboutUsPointTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  aboutUsPointDesc: {
    fontSize: 14,
    color: '#BBBBBB',
    lineHeight: 20,
  },
  aboutUsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
  aboutUsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
