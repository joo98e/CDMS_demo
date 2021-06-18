import * as types from '../actions/ActionTypes';

const initialState = {
    color: 'default',
};

const ui = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.SET_COLOR:
            return {
                ...state,
                color: state.color === 'default' ? 'primary' : 'default'
            };
            
        default:
            return state;
    }
}

export default ui;