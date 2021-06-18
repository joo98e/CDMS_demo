import * as types from '../actions/ActionTypes';

const initialState = {
    color: 'default',
    sawGuide: 'N'
};

const ui = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.SET_COLOR:
            return {
                ...state,
                color: state.color === 'default' ? 'primary' : 'default'
            };

        case types.VIEW_SAW_GUIDE:
            return {
                ...state,
                VIEW_SAW_GUIDE : 'Y'
            };

        default:
            return state;
    }
}

export default ui;