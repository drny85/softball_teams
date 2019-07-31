import {
    ADD_USER,
    USER_LOGIN,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    SET_LOADING
} from './types'
import authToken from '../utils/authToken';
import axios from 'axios'


const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING
    });
}

export const loadUser = () => async dispatch => {
    if (localStorage.token_softball) {
        authToken(localStorage.token_softball);
    }

    try {
        setLoading();
        const res = await axios.get('/api/user/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data
        });
    }
}


export const register = ({
    name,
    lastName,
    email,
    password
}) => async dispatch => {

    try {
        const userData = {
            name,
            lastName,
            email,
            password
        }
        console.log("HERE");
        const res = await axios.post('/api/user/create', userData);
        dispatch({
            type: ADD_USER,
            payload: res.data
        });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.data);
    }
}


export const login = ({
    email,
    password
}) => async dispatch => {
    try {
        setLoading();
        const res = await axios.post('/api/user/login', {
            email,
            password
        });
        dispatch({
            type: USER_LOGIN,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}