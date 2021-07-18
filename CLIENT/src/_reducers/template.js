import * as types from '../actions/ActionTypes';

const initialState = {

};

const OutPut = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.ACTIONTYPE:
            return {
            };

        default:
            return state;
    }
}

export default OutPut;