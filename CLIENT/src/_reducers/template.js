import * as types from '../_actions/ActionTypes';

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