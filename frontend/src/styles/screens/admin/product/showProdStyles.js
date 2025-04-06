import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
    },
    imageCarousel: {
        height: width * 0.8,
    },
    productImage: {
        width: width,
        height: width * 0.8,
        resizeMode: 'contain',
    },
    noImageContainer: {
        width: width,
        height: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },
    noImageText: {
        color: '#666666',
        marginTop: 10,
        fontSize: 16,
    },
    detailsContainer: {
        padding: 15,
    },
    detailSection: {
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        color: '#AAAAAA',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 8,
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 16,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    description: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 24,
    },
    actionButtonsContainer: {
        padding: 15,
        backgroundColor: '#1A1A1A',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    productDiscount: {
        fontSize: 14,
        color: '#FF5252', // Red for discounts
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default styles;