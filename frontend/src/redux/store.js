import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productReviewReducer } from "./reducers/productReducer";
import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderListMyReducer,
  adminOrdersReducer,
  orderUpdateStatusReducer,
  topProductsReducer
} from "./reducers/orderReducers";
import { statsReducer } from './reducers/statReducer';
import { adminUsersReducer } from './reducers/userReducers';

const store = configureStore({
  reducer: {
    productState: productReducer,
    productReview: productReviewReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    adminOrders: adminOrdersReducer, 
    orderUpdateStatus: orderUpdateStatusReducer,
    stats: statsReducer,
    adminUsers: adminUsersReducer,
    topProducts: topProductsReducer,
  },
});

export default store;