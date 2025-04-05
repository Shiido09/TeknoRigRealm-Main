import axios from "axios";
import { API_URL } from '../../config/apiConfig';
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

// Get all products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${API_URL}/products`);

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Get single product by ID
export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}/products/${id}`);

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Create a product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${API_URL}/products`, productData, config);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Update a product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`${API_URL}/products/${id}`, productData, config);

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response?.data.message || error.message });
  }
};

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await axios.delete(`${API_URL}/products/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response?.data.message || error.message });
  }
};
