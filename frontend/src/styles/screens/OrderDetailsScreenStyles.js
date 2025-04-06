import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    elevation: 3,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  orderHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
  },
  orderId: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#555555',
    color: '#FFFFFF',
  },
  statusCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    color: '#4CAF50',
  },
  statusProcessing: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    color: '#FFC107',
  },
  statusToShip: {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    color: '#2196F3',
  },
  statusToDeliver: {
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
    color: '#9C27B0',
  },
  section: {
    marginBottom: 15,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    color: '#AAAAAA',
    fontSize: 16,
    lineHeight: 22,
  },
  addressContainer: {
    marginTop: 5,
  },
  addressName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addressLine: {
    color: '#AAAAAA',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  phoneNumber: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productQuantity: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 8, // Add margin to make room for review button
  },
  reviewButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginRight: 8,
  },
  editReviewButton: {
    backgroundColor: '#FF9800',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  viewReviewButton: {
    backgroundColor: '#4CAF50', // Different color for view review button
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 14,
    margin: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;