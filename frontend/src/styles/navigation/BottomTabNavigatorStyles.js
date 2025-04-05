import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A1A1A',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    padding: 5,
    width: 90, // Increased width to accommodate text better
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#AAAAAA',
    textAlign: 'center',
    flexShrink: 1,
  },
  activeLabel: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default styles;
