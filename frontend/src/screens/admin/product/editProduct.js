import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { updateProduct } from '../../../redux/actions/productAction';
import styles from '../../../styles/screens/admin/product/editProdStyles';

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

const EditProductScreen = ({ navigation, route }) => {
    const { product } = route.params;

    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.productState);

    const [productName, setProductName] = useState(product.product_name);
    const [price, setPrice] = useState(product.price.toString());
    const [stocks, setStocks] = useState(product.stocks.toString());
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [images, setImages] = useState(product.product_images || []);
    const [discount, setDiscount] = useState(product.discount.toString()); // Add discount state

    useEffect(() => {
        if (success) {
            Alert.alert('Success', 'Product updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }
    }, [success, navigation]);

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

                // Replace original image with the newly selected one
                setImages([{ uri: selectedImage }]);
            } else {
                Alert.alert('Error', 'Failed to retrieve the image URI.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while picking the image.');
        }
    };


    const handleUpdateProduct = () => {
        if (!productName || !price || !stocks || !description || !category) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        Alert.alert(
            'Confirm Update',
            'Are you sure you want to update this product?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Update',
                    onPress: async () => {
                        const formData = new FormData();
                        formData.append('product_name', productName);
                        formData.append('price', price);
                        formData.append('discount', discount);
                        formData.append('stocks', stocks);
                        formData.append('description', description);
                        formData.append('category', category);

                        // Include existing images if no new images are selected
                        if (images.length === 0) {
                            product.product_images.forEach((image, index) => {
                                formData.append('product_images', {
                                    uri: image.url,
                                    name: `existing_image_${index}.jpg`,
                                    type: 'image/jpeg',
                                });
                            });
                        } else {
                            images.forEach((image, index) => {
                                formData.append('product_images', {
                                    uri: image.uri || image.url,
                                    name: `image_${index}.jpg`,
                                    type: 'image/jpeg',
                                });
                            });
                        }

                        try {
                            await dispatch(updateProduct(product._id, formData));
                            Alert.alert('Success', 'Product updated successfully!', [
                                { text: 'OK', onPress: () => navigation.navigate('displayProduct') },
                            ]);
                        } catch (err) {
                            Alert.alert('Error', 'Failed to update product.');
                        }
                    },
                },
            ]
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Product</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Product Name</Text>
                    <TextInput style={styles.input} value={productName} onChangeText={setProductName} />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
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
                    <TextInput style={styles.input} value={stocks} onChangeText={setStocks} keyboardType="numeric" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline numberOfLines={4} />
                </View>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageCarousel}
                >
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image.uri || image.url }} // Show newly selected image or original image
                                style={styles.productImage}
                            />
                        ))
                    ) : (
                        <View style={styles.noImageContainer}>
                            <MaterialIcons name="image-not-supported" size={50} color="#666666" />
                            <Text style={styles.noImageText}>No images available</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Category</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                            {CATEGORIES.map((cat) => (
                                <Picker.Item key={cat} label={cat} value={cat} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
                    <MaterialIcons name="add-photo-alternate" size={24} color="#FFFFFF" />
                    <Text style={styles.imageUploadText}>Update Product Images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleUpdateProduct} disabled={loading}>
                    {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Update Product</Text>}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default EditProductScreen;
