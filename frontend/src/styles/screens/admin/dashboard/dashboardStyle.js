import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the container takes the full height of the screen
        backgroundColor: '#121212',
    },
    scrollContent: {
        padding: 16,
        flexGrow: 1, // Ensures the ScrollView content stretches
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        width: '48%',
        marginBottom: 16,
        elevation: 4, // Adds shadow for better visibility
    },
    statIcon: {
        marginRight: 12,
    },
    statTextContainer: {
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statTitle: {
        fontSize: 14,
        color: '#555555',
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureButton: {
        width: '48%',
        padding: 16,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    featureText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 8,
    },
    logoutButton: {
        padding: 16,
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 16, // Adds spacing around the button
    },
    logoutText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 8,
    },
    productCard: {
        width: 150,
        marginRight: 10,
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
      },
      productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
      },
      productName: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
      },
      productOrders: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: 'bold',
      },
});

export default styles;