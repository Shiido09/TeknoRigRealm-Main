import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { getProductById } from '../../../redux/actions/productAction';
import styles from '../../../styles/screens/admin/product/showProdStyles';

const ShowProduct = ({ navigation, route }) => {
    const { productId } = route.params; // Assuming productId is passed via route params
    const dispatch = useDispatch();

    const { loading, product, error } = useSelector((state) => state.productState);

    useEffect(() => {
        dispatch(getProductById(productId));
    }, [dispatch, productId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Product Details</Text>
            </View>

            <ScrollView style={styles.contentContainer}>
                {/* Image Carousel */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageCarousel}
                >
                    {product.product_images && product.product_images.length > 0 ? (
                        product.product_images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image.url }}
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

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailSection}>
                        <Text style={styles.productName}>{product.product_name}</Text>
                        <Text style={styles.productPrice}>
                            ₱{Number(product?.price || 0).toFixed(2)}
                        </Text>

                    </View>

                    <View style={styles.detailSection}>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="category" size={20} color="#4CAF50" />
                            <Text style={styles.infoLabel}>Category:</Text>
                            <Text style={styles.infoValue}>{product.category}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialIcons name="inventory" size={20} color="#4CAF50" />
                            <Text style={styles.infoLabel}>Stock:</Text>
                            <Text style={styles.infoValue}>{product.stocks} units</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialIcons name="star" size={20} color="#4CAF50" />
                            <Text style={styles.infoLabel}>Reviews:</Text>
                            <Text style={styles.infoValue}>{product.numOfReviews}</Text>
                        </View>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate('editProduct', { product })}
                >
                    <MaterialIcons name="edit" size={24} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Edit Product</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShowProduct;