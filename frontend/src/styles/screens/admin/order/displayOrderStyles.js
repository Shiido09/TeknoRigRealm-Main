import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A1A1A',
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2A',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    orderList: {
        padding: 15,
    },
    orderCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#2A2A2A',
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderContent: {
        padding: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        color: '#AAAAAA',
        fontSize: 14,
        marginLeft: 8,
        marginRight: 4,
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 14,
        flex: 1,
    },
    orderItems: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#2A2A2A',
        paddingTop: 10,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemName: {
        color: '#FFFFFF',
        fontSize: 14,
        flex: 1,
    },
    itemPrice: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#2A2A2A',
    },
    totalLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalAmount: {
        color: '#4CAF50',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderFooter: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#2A2A2A',
    },
    dateText: {
        color: '#AAAAAA',
        fontSize: 12,
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
    backButton: {
        position: 'absolute', // Position the back button to the left
        left: 15,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalOption: {
        width: '100%',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#2A2A2A',
        marginBottom: 10,
        alignItems: 'center',
    },
    modalOptionText: {
        color: '#fff',
        fontSize: 16,
    },
    modalCancel: {
        marginTop: 10,
    },
    modalCancelText: {
        color: '#FF5252',
        fontSize: 16,
    }

});

export default styles;