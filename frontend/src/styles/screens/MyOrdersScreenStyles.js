import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  shopButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  tabsContainer: {
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    elevation: 2,
    height: 48, // Fixed height for container
  },
  tabsContentContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 48, // Match container height
  },
  tabButton: {
    paddingHorizontal: 16,
    marginHorizontal: 6,
    height: 45, // Fixed height
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minWidth: 80, // Add a minimum width to ensure consistent tab sizing
  },
  activeTabButton: {
    // We don't need additional styles that might affect layout
    borderBottomWidth: 0,
  },
  // New style for active indicator that doesn't affect layout
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  tabButtonText: {
    color: '#AAAAAA',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center', // Ensure text is centered
  },
  activeTabButtonText: {
    color: '#4CAF50',
    fontWeight: '500', // Keep the same font weight as inactive tabs
    // Apply a different style that doesn't change text dimensions
  },
  ordersList: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statusDelivered: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    color: '#4CAF50',
  },
  statusProcessing: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    color: '#FFC107',
  },
  statusShipped: {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    color: '#2196F3',
  },
  statusToShip: {
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
    color: '#FF9800',
  },
  statusToDeliver: {
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
    color: '#9C27B0',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
    paddingBottom: 12,
  },
  orderDate: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  orderTotal: {
    color: '#4CAF50',
    fontSize: 17,
    fontWeight: 'bold',
  },
  orderItemsCount: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 4,
  },
  emptyTabContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTabText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  tabsWrapper: {
    marginBottom: 10, // Add spacing below the tabs
    paddingHorizontal: 10, // Add padding around the tabs
  },
});

export default styles;
