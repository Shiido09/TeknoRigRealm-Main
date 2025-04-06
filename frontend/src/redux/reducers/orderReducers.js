import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_UPDATE_STATUS_RESET,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL,
} from '../constants/orderConstants';

export const orderUpdateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_STATUS_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_STATUS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_UPDATE_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_STATUS_RESET:
      return {}; // Reset to initial state
    default:
      return state;
  }
};

export const adminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDERS_REQUEST:
      return { loading: true, orders: [] };
    case ADMIN_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case ADMIN_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { 
        loading: false, 
        order: action.payload.order || action.payload // Handle both structures
      };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_MY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const topProductsReducer = (state = { topProducts: [] }, action) => {
  switch (action.type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return { loading: true, topProducts: [] };
    case GET_TOP_PRODUCTS_SUCCESS:
      return { loading: false, topProducts: action.payload };
    case GET_TOP_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};