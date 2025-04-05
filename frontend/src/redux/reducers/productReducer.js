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
  } from "../constants";
  
  const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
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
