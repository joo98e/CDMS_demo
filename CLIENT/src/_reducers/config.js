import * as types from '../actions/ActionTypes';

const getNowEnv = () => {
    let dev = window.location.hostname.indexOf('localhost') !== -1;
    return dev; 
}

const initialState = {
    dev : getNowEnv()
};

const Config = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.ENV_IS_DEV:
            return {
            };

        default:
            return state;
    }

}

export default Config;