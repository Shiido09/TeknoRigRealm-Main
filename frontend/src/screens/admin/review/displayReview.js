import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../../redux/actions/productAction';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/screens/admin/review/displayReviewStyle';

const DisplayReviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.allReviews || {});

  useEffect(() => {
    dispatch(getAllReviews()); // Fetch all reviews
  }, [dispatch]);

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={star <= rating ? '#FFD700' : '#AAAAAA'}
          />
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.productName}>Product: {item.productName || 'Unknown Product'}</Text>
          <Text style={styles.username}>{item.user?.name || 'Anonymous'}</Text>
          <Text style={styles.orderNumber}>Order: #{item.orderID || 'N/A'}</Text>
        </View>
        {renderStars(item.rating)}
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text> {/* Ensure comment is wrapped in <Text> */}

    </View>
  );

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.reviewsList}
        ListEmptyComponent={<Text style={styles.emptyText}>No reviews available.</Text>}
      />
    </View>
  );
};

export default DisplayReviews;