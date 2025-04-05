import axios from 'axios';
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
} from '../constants/userConstants';
import { API_URL } from '../../config/apiConfig';

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USERS_REQUEST });

        const { data } = await axios.get(`${API_URL}/users/getAllUsers`);
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};