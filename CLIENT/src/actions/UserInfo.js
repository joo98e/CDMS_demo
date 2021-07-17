import * as types from '../actions/ActionTypes';

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
export const devAuth = member => {
    return {
        type: types.GET_AUTHENTICATED,
        member
    };
};