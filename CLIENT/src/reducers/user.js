import * as types from '../actions/ActionTypes';

const initialState = {
    auth : false
};

const user = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.GET_AUTHENTICATED:
            return {
                ...state,

            };

        default:
            return state;
    }
}

export default user;