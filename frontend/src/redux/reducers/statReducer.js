import { FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_FAIL } from '../constants/statConstants';

const initialState = {
  loading: false,
  stats: {
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  },
  error: null,
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_REQUEST:
      return { ...state, loading: true };
    case FETCH_STATS_SUCCESS:
      return { ...state, loading: false, stats: action.payload };
    case FETCH_STATS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};