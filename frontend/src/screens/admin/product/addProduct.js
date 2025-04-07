// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { MaterialIcons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
// import { useDispatch, useSelector } from 'react-redux';
// import { createProduct } from '../../../redux/actions/productAction';
// import styles from '../../../styles/screens/admin/product/addProdStyles';

// const CATEGORIES = [
//     'Gaming PCs',
//     'Laptops',
//     'Components',
//     'Peripherals',
//     'Displays',
//     'Networking',
//     'Storage',
//     'Audio',
// ];

// const AddProductScreen = ({ navigation }) => {
//     const dispatch = useDispatch();
//     const { loading, error } = useSelector((state) => state.productState || {});

//     const [productName, setProductName] = useState('');
//     const [price, setPrice] = useState('');
//     const [discount, setDiscount] = useState(''); // New state for discount
//     const [stocks, setStocks] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState(CATEGORIES[0]);
//     const [images, setImages] = useState([]); // Array to store selected images

//     // Function to pick an image from the gallery
//     const pickImage = async () => {
//         try {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Permission status:', status);
//                 Alert.alert('Permission Denied', 'We need access to your gallery to upload images.');
//                 return;
//             }

//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 quality: 1,
//             });

//             console.log('Image Picker Result:', result);

//             if (result.canceled) {
//                 console.log('Image selection was canceled.');
//                 return;
//             }

//             // Access the URI from the assets array
//             if (result.assets && result.assets.length > 0) {
//                 const selectedImage = result.assets[0].uri;
//                 setImages([...images, { uri: selectedImage }]);
//             } else {
//                 console.error('No assets found in the result:', result);
//                 Alert.alert('Error', 'Failed to retrieve the image URI.');
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             Alert.alert('Error', 'Something went wrong while picking the image.');
//         }
//     };

//     const handleAddProduct = async () => {
//         if (!productName || !price || !stocks || !description || !category) {
//             Alert.alert('Error', 'Please fill in all fields.');
//             return;
//         }

//         const formData = new FormData();

//         formData.append('product_name', productName);
//         formData.append('price', price);
//         formData.append('discount', discount); // Include discount in form data
//         formData.append('stocks', stocks);
//         formData.append('description', description);
//         formData.append('category', category);

//         // Append images to the FormData
//         images.forEach((image, index) => {
//             formData.append('product_images', {
//                 uri: image.uri,
//                 name: `image_${index}.jpg`, // You can customize the file name
//                 type: 'image/jpeg', // Ensure the correct MIME type
//             });
//         });

//         try {
//             await dispatch(createProduct(formData));
//             Alert.alert('Success', 'Product added successfully!', [
//                 { text: 'OK', onPress: () => navigation.goBack() },
//             ]);
//         } catch (err) {
//             Alert.alert('Error', error || 'Failed to add product.');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity
//                     style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Add New Product</Text>
//             </View>

//             <ScrollView style={styles.formContainer}>
//                 <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>Product Name</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter product name"
//                         placeholderTextColor="#666666"
//                         value={productName}
//                         onChangeText={setProductName}
//                     />
//                 </View>

//                 <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>Price</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter price"
//                         placeholderTextColor="#666666"
//                         value={price}
//                         onChangeText={setPrice}
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>Discount (%)</Text> {/* New input for discount */}
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter discount percentage"
//                         placeholderTextColor="#666666"
//                         value={discount}
//                         onChangeText={setDiscount}
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>Stock Quantity</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter stock quantity"
//                         placeholderTextColor="#666666"
//                         value={stocks}
//                         onChangeText={setStocks}
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>Description</Text>
//                     <TextInput
//                         style={[styles.input, styles.textArea]}
//                         placeholder="Enter product description"
//                         placeholderTextColor="#666666"
//                         value={description}
//                         onChangeText={setDescription}
//                         multiline
//                         numberOfLines={4}
//                     />
//                 </View>

//                 <View style={styles.inputGroup}>
//                     <Text style={styles.inputLabel}>Category</Text>
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={category}
//                             onValueChange={setCategory}
//                             style={styles.picker}
//                             dropdownIconColor="#FFFFFF"
//                         >
//                             {CATEGORIES.map((cat) => (
//                                 <Picker.Item
//                                     key={cat}
//                                     label={cat}
//                                     value={cat}
//                                     style={styles.pickerItem}
//                                 />
//                             ))}
//                         </Picker>
//                     </View>
//                 </View>
//                 <TouchableOpacity
//                     style={styles.imageUploadButton}
//                     onPress={pickImage} // Call the pickImage function
//                 >
//                     <MaterialIcons name="add-photo-alternate" size={24} color="#FFFFFF" />
//                     <Text style={styles.imageUploadText}>Add Product Images</Text>
//                 </TouchableOpacity>

//                 {/* Display selected images */}
//                 <ScrollView horizontal style={styles.imagePreviewContainer}>
//                     {images.map((image, index) => (
//                         <Image
//                             key={index}
//                             source={{ uri: image.uri }}
//                             style={styles.imagePreview}
//                         />
//                     ))}
//                 </ScrollView>
//                 {loading ? (
//                     <TouchableOpacity style={[styles.submitButton, styles.disabledButton]} disabled>
//                         <Text style={styles.submitButtonText}>Adding...</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity
//                         style={styles.submitButton}
//                         onPress={handleAddProduct}
//                     >
//                         <Text style={styles.submitButtonText}>Add Product</Text>
//                     </TouchableOpacity>
//                 )}
//             </ScrollView>
//         </View>
//     );
// };

// export default AddProductScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../redux/actions/productAction';
import styles from '../../../styles/screens/admin/product/addProdStyles';

const CATEGORIES = [
    'Gaming PCs',
    'Laptops',
    'Components',
    'Peripherals',
    'Displays',
    'Networking',
    'Storage',
    'Audio',
];

const AddProductScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.productState || {});

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(''); // New state for discount
    const [stocks, setStocks] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [images, setImages] = useState([]); // Array to store selected images

    // Function to pick an image from the gallery
    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need access to your gallery to upload images.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (result.canceled) {
                return;
            }

            if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0].uri;
                setImages([...images, { uri: selectedImage }]);
            } else {
                Alert.alert('Error', 'Failed to retrieve the image URI.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while picking the image.');
        }
    };

    const handleAddProduct = async () => {
        if (!productName || !price || !stocks || !description || !category) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const formData = new FormData();

        formData.append('product_name', productName);
        formData.append('price', price);
        formData.append('discount', discount); // Include discount in form data
        formData.append('stocks', stocks);
        formData.append('description', description);
        formData.append('category', category);

        images.forEach((image, index) => {
            formData.append('product_images', {
                uri: image.uri,
                name: `image_${index}.jpg`,
                type: 'image/jpeg',
            });
        });

        try {
            await dispatch(createProduct(formData));
            Alert.alert('Success', 'Product added successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (err) {
            Alert.alert('Error', error || 'Failed to add product.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Add New Product</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Product Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter product name"
                        placeholderTextColor="#666666"
                        value={productName}
                        onChangeText={setProductName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Price</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter price"
                        placeholderTextColor="#666666"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Discount (%)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter discount percentage"
                        placeholderTextColor="#666666"
                        value={discount}
                        onChangeText={setDiscount}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Stock Quantity</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter stock quantity"
                        placeholderTextColor="#666666"
                        value={stocks}
                        onChangeText={setStocks}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter product description"
                        placeholderTextColor="#666666"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Category</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={category}
                            onValueChange={setCategory}
                            style={styles.picker}
                            dropdownIconColor="#FFFFFF"
                        >
                            {CATEGORIES.map((cat) => (
                                <Picker.Item
                                    key={cat}
                                    label={cat}
                                    value={cat}
                                    style={styles.pickerItem}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.imageUploadButton}
                    onPress={pickImage}
                >
                    <MaterialIcons name="add-photo-alternate" size={24} color="#FFFFFF" />
                    <Text style={styles.imageUploadText}>Add Product Images</Text>
                </TouchableOpacity>

                <ScrollView horizontal style={styles.imagePreviewContainer}>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image.uri }}
                            style={styles.imagePreview}
                        />
                    ))}
                </ScrollView>
                {loading ? (
                    <TouchableOpacity style={[styles.submitButton, styles.disabledButton]} disabled>
                        <Text style={styles.submitButtonText}>Adding...</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleAddProduct}
                    >
                        <Text style={styles.submitButtonText}>Add Product</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

export default AddProductScreen;