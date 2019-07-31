import {

    ADD_USER, AUTH_ERROR, USER_LOGIN
} from '../actions/types';

const initialState = {
    user: null,
    current: null,
    users: [],
    error: null,
    loading: false,
    isAuthenticated: false,
    token: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                token: action.payload
            }
        case AUTH_ERROR:
            localStorage.removeItem('token_softball');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                error: action.payload

            };
        case USER_LOGIN:
            localStorage.setItem('token_softball', action.payload.token)
            return {
                ...state,
                token: action.payload,
                loading: false,
                error: null,
                isAuthenticated: true
            }
        default:
            return state

    }
}