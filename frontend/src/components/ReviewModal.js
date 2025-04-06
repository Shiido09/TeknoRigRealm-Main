import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, getProductById } from '../redux/actions/productAction';
import { CREATE_REVIEW_RESET } from '../redux/constants';

const ReviewModal = ({ visible, onClose, productId, productName, orderId, userId, hasReviewed }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [existingReview, setExistingReview] = useState(null);
  const dispatch = useDispatch();
  
  const { loading, success, error } = useSelector(state => state.productReview || {});
  const { product } = useSelector(state => state.productState || {});

  // Fetch product details when modal opens to get the latest reviews
  useEffect(() => {
    if (visible && productId) {
      dispatch(getProductById(productId));
    }
  }, [visible, productId, dispatch]);

  // Reset form or find existing review when modal is opened
  useEffect(() => {
    if (visible && product && product.reviews) {
      // Find the user's review for this product and order
      const userReview = product.reviews.find(
        review => 
          review.user && 
          review.orderID && 
          review.user.toString() === userId && 
          review.orderID.toString() === orderId
      );
      
      if (userReview) {
        setExistingReview(userReview);
        setRating(userReview.rating);
        setComment(userReview.comment);
      } else if (!hasReviewed) {
        // Reset form for new review
        setRating(0);
        setComment('');
        setExistingReview(null);
      }
    }
  }, [visible, product, userId, orderId, hasReviewed]);

  // Handle success and error states
  useEffect(() => {
    if (success) {
      Alert.alert('Success', 'Review submitted successfully');
      dispatch({ type: CREATE_REVIEW_RESET });
      onClose();
    }
    
    if (error) {
      Alert.alert('Error', error || 'Failed to submit review');
      dispatch({ type: CREATE_REVIEW_RESET });
    }
  }, [success, error, dispatch, onClose]);

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    
    dispatch(createProductReview(productId, {
      rating,
      comment,
      orderId,
      userId
    }));
  };

  // Determine if we should be in view-only mode
  const isViewMode = hasReviewed || (existingReview !== null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isViewMode ? `Your Review of ${productName}` : `Review ${productName}`}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.ratingLabel}>Rating</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => !isViewMode && setRating(star)}
                disabled={isViewMode}
              >
                <AntDesign
                  name={star <= rating ? "star" : "staro"}
                  size={36}
                  color={star <= rating ? "#FFD700" : "#AAAAAA"}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.commentLabel}>
            {isViewMode ? "Your Comment" : "Your Review"}
          </Text>
          
          {isViewMode ? (
            <Text style={styles.existingComment}>{comment}</Text>
          ) : (
            <TextInput
              style={styles.commentInput}
              placeholder="Write your thoughts about this product..."
              placeholderTextColor="#888888"
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
          )}
          
          {!isViewMode && (
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Submit Review</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  ratingLabel: {
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  commentLabel: {
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  existingComment: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ReviewModal;
