import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderListMyReducer,
  adminOrdersReducer,
  orderUpdateStatusReducer
} from "./reducers/orderReducers";
import { statsReducer } from './reducers/statReducer';
import { adminUsersReducer } from './reducers/userReducers';

const store = configureStore({
  reducer: {
    productState: productReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    adminOrders: adminOrdersReducer, 
    orderUpdateStatus: orderUpdateStatusReducer,
    stats: statsReducer,
    adminUsers: adminUsersReducer,
  },
});

export default store;