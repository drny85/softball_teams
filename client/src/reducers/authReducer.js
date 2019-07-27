import {

    ADD_USER
} from '../actions/types';

const initialState = {
    user: null,
    current: null,
    users: [],
    error: null,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state
            }

            default:
                return state

    }
}