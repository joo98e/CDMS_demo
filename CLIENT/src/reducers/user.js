import * as types from '../actions/ActionTypes';

const initialState = {
    auth : false,
    member : null
};

const user = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.GET_AUTHENTICATED:
            return {
                auth : true,
                member : JSON.parse(localStorage.getItem('member'))
            };

        default:
            return state;
    }
}

export default user;