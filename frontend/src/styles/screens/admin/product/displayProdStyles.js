import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1A1A1A',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 8,
    },
    productList: {
        padding: 15,
    },
    productCard: {
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 80,
        height: 80,
        marginRight: 15,
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 15,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    productStock: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 4,
    },
    productCategory: {
        fontSize: 12,
        color: '#888888',
    },
    actionButtons: {
        flexDirection: 'column',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        backgroundColor: '#2196F3',
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#FF4444',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
    filterContainer: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#1A1A1A',
        height: 44,
    },
    filterChip: {
        paddingHorizontal: 10,
        paddingVertical: 4,   
        borderRadius: 12,     
        marginRight: 8,
        backgroundColor: '#2A2A2A',
        height: 28,        
        justifyContent: 'center', 
    },
    filterChipActive: {
        backgroundColor: '#4CAF50',
    },
    filterText: {
        color: '#FFFFFF',
        fontSize: 11,       
        lineHeight: 16,    
    },
    filterTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    
});

export default styles;