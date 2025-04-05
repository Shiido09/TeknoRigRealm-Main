import axios from 'axios';
import { API_URL } from '../../config/apiConfig';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL,
} from '../constants/orderConstants';
import { getItem } from '../../services/authService';

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_UPDATE_STATUS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`${API_URL}/orders/${orderId}/status`, { status }, config);

    dispatch({
      type: ORDER_UPDATE_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDERS_REQUEST });

    const { data } = await axios.get(`${API_URL}/orders/getAllOrders`);

    dispatch({
      type: ADMIN_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getAllOrders = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ADMIN_ORDERS_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get('${API_URL}/orders', config);

//     dispatch({
//       type: ADMIN_ORDERS_SUCCESS,
//       payload: data.orders,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_ORDERS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };


// Create new order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    // Get token for authentication
    const token = await getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    
    // Make API call to backend
    const { data } = await axios.post(
      `${API_URL}/orders`, 
      orderData,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });

    console.log('Order created successfully:', data);
    
  } catch (error) {
    console.error('Order creation error:', error.response?.data || error.message);
    
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = await getItem('token');
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order // Extract the order object from the response
    });
  } catch (error) {
    console.error('Error fetching order details:', error.response?.data || error.message);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

// Get my orders
export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const token = await getItem('token');
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.orders || [] // Ensure we extract the orders array correctly
    });
  } catch (error) {
    console.error('Error fetching my orders:', error.response?.data || error.message);
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    });
  }
};

export const getTopOrderedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${API_URL}/orders/topProducts`);
    console.log('Top ordered products:', data.topProducts); // Log the top products
    dispatch({
      type: GET_TOP_PRODUCTS_SUCCESS,
      payload: data.topProducts,
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_PRODUCTS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};