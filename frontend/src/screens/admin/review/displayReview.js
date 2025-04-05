import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/screens/admin/review/displayReviewStyle';

// Sample review data
const sampleReviews = [
  {
    _id: '1',
    user: {
      name: 'John Doe',
      _id: 'u1'
    },
    orderID: 'ORD001',
    rating: 5,
    comment: 'Excellent gaming PC! The performance is incredible and the build quality is top-notch.',
    createdAt: '2025-03-28T10:00:00Z'
  },
  {
    _id: '2',
    user: {
      name: 'Jane Smith',
      _id: 'u2'
    },
    orderID: 'ORD002',
    rating: 4,
    comment: 'Great laptop, but the battery life could be better. Otherwise, very satisfied with the purchase.',
    createdAt: '2025-03-27T15:30:00Z'
  },
  {
    _id: '3',
    user: {
      name: 'Mike Johnson',
      _id: 'u3'
    },
    orderID: 'ORD003',
    rating: 5,
    comment: 'The mechanical keyboard is amazing! Perfect for both gaming and typing.',
    createdAt: '2025-03-26T09:15:00Z'
  },
  {
    _id: '4',
    user: {
      name: 'Sarah Wilson',
      _id: 'u4'
    },
    orderID: 'ORD004',
    rating: 3,
    comment: 'Decent monitor, but the colors needed some calibration out of the box.',
    createdAt: '2025-03-25T14:20:00Z'
  }
];

const DisplayReviews = () => {
  // Use sampleReviews instead of props
  const reviews = sampleReviews;

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
          <Text style={styles.username}>{item.user.name}</Text>
          <Text style={styles.orderNumber}>Order: #{item.orderID}</Text>
        </View>
        {renderStars(item.rating)}
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
      <View style={styles.reviewFooter}>
        <Text style={styles.dateText}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.reviewsList}
      />
    </View>
  );
};

export default DisplayReviews;