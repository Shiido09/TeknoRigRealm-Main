import { StyleSheet } from 'react-native';

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
    formContainer: {
        padding: 15,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 12,
        color: '#FFFFFF',
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        color: '#FFFFFF',
        height: 50,
    },
    pickerItem: {
        color: '#FFFFFF',
        backgroundColor: '#2A2A2A',
    },
    imageUploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
    },
    imageUploadText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    noImageText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
    },
    
});

export default styles;