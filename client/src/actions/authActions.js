import { ADD_USER, USER_LOGIN, AUTH_ERROR } from './types'
import axios from 'axios'


export const register = ({ name, lastName, email, password }) => async dispatch => {

    try {
        const userData = { name, lastName, email, password }
        console.log("HERE");
        const res = await axios.post('/api/user/create', userData);
        dispatch({ type: ADD_USER, payload: res.data });
    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.data);
    }
}


export const login = ({ email, password }) => async dispatch => {
    try {
        console.log(email, password);
        const res = await axios.post('/api/user/login', { email, password });
        dispatch({ type: USER_LOGIN, payload: res.data });
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response.data });
    }
}