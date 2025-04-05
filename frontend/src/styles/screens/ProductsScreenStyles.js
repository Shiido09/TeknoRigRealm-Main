import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#1A1A1A',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#2A2A2A',
  },
  categoryChipActive: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  priceRangeContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  priceInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  priceInputWrapper: {
    flex: 1,
  },
  priceInputLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    marginBottom: 5,
  },
  priceInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  priceInputDividerText: {
    marginHorizontal: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  productsGrid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productCard: {
    width: (width - 45) / 2, // Two columns with spacing
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginRight: 15,
  },
  productCard_oddColumn: {
    marginRight: 0,
  },
  productImageContainer: {
    height: (width - 45) / 2 * 0.8, // Aspect ratio for the image
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
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 8, // Add margin to make room for the button
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noProductsText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
