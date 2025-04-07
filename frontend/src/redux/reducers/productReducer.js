import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_RESET,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  UPDATE_REVIEW_RESET,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAIL,
} from "../constants";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isLoadingForReview: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case GET_PRODUCT_DETAILS_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: [...state.products, action.payload] };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((prod) => (prod._id === action.payload._id ? action.payload : prod)),
      };

    case DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: state.products.filter((prod) => prod._id !== action.payload) };

    case 'SET_LOADING_FOR_REVIEW':
      return { ...state, isLoadingForReview: action.payload };

    case GET_PRODUCTS_FAIL:
    case GET_PRODUCT_DETAILS_FAIL:
    case CREATE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_REVIEW_SUCCESS:
    case UPDATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_REVIEW_FAIL:
    case UPDATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_REVIEW_RESET:
    case UPDATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const allReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };
    case GET_ALL_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};