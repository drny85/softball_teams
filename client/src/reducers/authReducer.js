import {

    ADD_USER,
    AUTH_ERROR,
    USER_LOGIN,
    USER_LOADED,
    LOGOUT,
    SET_LOADING
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
            case USER_LOADED:
                return {
                    ...state,
                    isAuthenticated: true,
                        loading: false,
                        user: action.payload,
                        error: null
                }
                case USER_LOGIN:
                    localStorage.setItem('token_softball', action.payload.token)
                    return {
                        ...state,
                        token: action.payload,
                            loading: false,
                            error: null,
                            isAuthenticated: true
                    };
                case SET_LOADING:
                    return {
                        ...state,
                        loading: true
                    }
                    case LOGOUT:
                        localStorage.removeItem('token_softball');
                        return {
                            ...state,
                            user: null,
                                error: null,
                                token: null,
                                loading: false,
                                isAuthenticated: false
                        }
                        default:
                            return state

    }
}