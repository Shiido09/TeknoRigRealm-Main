import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2A2A2A',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  cameraButton: {
    marginTop: 10,
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 4,
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  flipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  flipButtonText: {
    fontSize: 18,
    color: 'white',
  },
  captureButton: {
    alignSelf: 'flex-end',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'white',
  },
  cancelButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'white',
  },
  cameraPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  cameraPermissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraPermissionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cameraPermissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  formLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 15,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#AAAAAA',
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  }
});

export default styles;
