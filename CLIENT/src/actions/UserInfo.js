import * as types from './ActionTypes';

// ─────────────────────────────────────────────────── 
export const setMemberInfos = member => {
    return {
        type: types.GET_AUTHENTICATED,
        member
    };
};

// ─────────────────────────────────────────────────── 
export const outAuthenticated = () => {
    return {
        type: types.OUT_AUTHENTICATED,
    };
};

// ─────────────────────────────────────────────────── 
export const devAuth = () => {
    return {
        type: types.DEV_SET_AUTH,
    };
};