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
    userList: {
        padding: 15,
    },
    userCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    userHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#2A2A2A',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#FF5252',
        borderRadius: 20,
    },
    userContent: {
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
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        left: 15,
    },
});

export default styles;