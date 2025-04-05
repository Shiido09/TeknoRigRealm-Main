import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 15,
    backgroundColor: '#1A1A1A',
  },
  reviewsList: {
    padding: 15,
  },
  reviewCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  reviewFooter: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 10,
  },
  dateText: {
    color: '#AAAAAA',
    fontSize: 12,
  }
});

export default styles;