import * as types from './ActionTypes';

// ─────────────────────────────────────────────────── 
export const setMemberInfos = member => {
    return {
        type: types.GET_AUTHENTICATED,
        member
    };
};