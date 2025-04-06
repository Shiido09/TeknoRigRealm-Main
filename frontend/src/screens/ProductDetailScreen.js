import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route, navigation }) => {
  // Get the product data from the route params
  const { product } = route.params;
  const [selectedRating, setSelectedRating] = useState(0); // 0 means show all reviews
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    ratingPercentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  // Calculate review statistics when product data changes
  useEffect(() => {
    if (product && product.reviews) {
      const reviews = product.reviews;
      const totalReviews = reviews.length;
      const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      
      // Count reviews for each rating
      reviews.forEach(review => {
        const rating = review.rating;
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating]++;
        }
      });
      
      // Calculate average rating
      const totalRatingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;
      
      // Calculate percentages
      const ratingPercentages = {};
      Object.keys(ratingCounts).forEach(rating => {
        ratingPercentages[rating] = totalReviews > 0 
          ? (ratingCounts[rating] / totalReviews) * 100 
          : 0;
      });
      
      setReviewStats({
        averageRating,
        totalReviews,
        ratingCounts,
        ratingPercentages
      });
    }
  }, [product]);

  // Filter reviews based on selected rating
  const filteredReviews = product.reviews 
    ? product.reviews.filter(review => selectedRating === 0 || review.rating === selectedRating)
    : [];

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Ionicons 
            key={star} 
            name={star <= rating ? "star" : "star-outline"} 
            size={16} 
            color={star <= rating ? "#FFD700" : "#444444"} 
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>User #{item.user.toString().slice(-4)}</Text>
        {renderStars(item.rating)}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.product_images[0]?.url || 'https://via.placeholder.com/400/222222/FFFFFF?text=No+Image' }} 
            style={styles.productImage} 
          />
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{product.category}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>In Stock:</Text>
            <Text style={styles.detailValue}>{product.stocks || 0}</Text>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{product.description || "No description available"}</Text>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Customer Reviews</Text>
          
          {reviewStats.totalReviews > 0 ? (
            <>
              <View style={styles.reviewStats}>
                <Text style={styles.averageRating}>{reviewStats.averageRating.toFixed(1)}</Text>
                {renderStars(Math.round(reviewStats.averageRating))}
                <Text style={styles.totalReviews}>Based on {reviewStats.totalReviews} reviews</Text>
              </View>
              
              {/* Rating Distribution */}
              <View style={styles.ratingDistribution}>
                {[5, 4, 3, 2, 1].map(rating => (
                  <TouchableOpacity 
                    key={rating}
                    style={[
                      styles.ratingFilterButton,
                      selectedRating === rating && styles.activeRatingFilter
                    ]}
                    onPress={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  >
                    <View style={styles.ratingRow}>
                      <Text style={styles.ratingNumber}>{rating} star{rating !== 1 ? 's' : ''}</Text>
                      <View style={styles.ratingBar}>
                        <View 
                          style={[
                            styles.ratingFill, 
                            { width: `${reviewStats.ratingPercentages[rating]}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.ratingPercentage}>
                        {Math.round(reviewStats.ratingPercentages[rating])}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Filter Pills */}
              <View style={styles.filterContainer}>
                <TouchableOpacity 
                  style={[styles.filterPill, selectedRating === 0 && styles.activeFilterPill]}
                  onPress={() => setSelectedRating(0)}
                >
                  <Text style={styles.filterText}>All Reviews</Text>
                </TouchableOpacity>
                
                {[5, 4, 3, 2, 1].map(rating => (
                  <TouchableOpacity 
                    key={`pill-${rating}`}
                    style={[styles.filterPill, selectedRating === rating && styles.activeFilterPill]}
                    onPress={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  >
                    <Text style={styles.filterText}>{rating} Star{rating !== 1 ? 's' : ''}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Reviews List */}
              {filteredReviews.length > 0 ? (
                <FlatList
                  data={filteredReviews}
                  renderItem={renderReviewItem}
                  keyExtractor={(item, index) => `review-${index}`}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noFilteredReviews}>
                  No {selectedRating > 0 ? `${selectedRating}-star` : ''} reviews found.
                </Text>
              )}
            </>
          ) : (
            <Text style={styles.noReviews}>No reviews yet for this product.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#2A2A2A',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 100,
    fontSize: 16,
    color: '#AAAAAA',
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  // Reviews section styles
  reviewsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 16,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  reviewStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  starIcon: {
    marginRight: 2,
  },
  totalReviews: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  ratingDistribution: {
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 4,
  },
  ratingNumber: {
    width: 60,
    fontSize: 14,
    color: '#FFFFFF',
  },
  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  ratingFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  ratingPercentage: {
    width: 40,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  ratingFilterButton: {
    borderRadius: 4,
  },
  activeRatingFilter: {
    backgroundColor: '#2A2A2A',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterPill: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterPill: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  reviewItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reviewComment: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  noReviews: {
    fontSize: 16,
    color: '#AAAAAA',
    fontStyle: 'italic',
  },
  noFilteredReviews: {
    fontSize: 16,
    color: '#AAAAAA',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  }
});

export default ProductDetailScreen;
