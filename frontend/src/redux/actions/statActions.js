import axios from 'axios';
import { FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_FAIL } from '../constants/statConstants';
import { API_URL } from '../../config/apiConfig';

export const fetchStats = () => async (dispatch) => {
  try {
    console.log('Dispatching FETCH_STATS_REQUEST...');
    dispatch({ type: FETCH_STATS_REQUEST });
    
    console.log('Sending request to API...');
    const { data } = await axios.get(`${API_URL}/products/adminStats`);
    
    console.log('API response received:', data);
    dispatch({
      type: FETCH_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error fetching stats:', error.response?.data.message || error.message);
    dispatch({
      type: FETCH_STATS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};