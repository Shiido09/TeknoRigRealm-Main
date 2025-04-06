import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editPhotoButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  editPhotoButtonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  formSection: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 5,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    marginTop: 5,
  },
  inputError: {
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  disabledButton: {
    opacity: 0.7,
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
});

export default styles;
