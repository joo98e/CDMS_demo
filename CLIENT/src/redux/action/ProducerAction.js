import * as types from '../types';

// ─────────────────────────────────────────────────── 
export const setAgencyInfo = payload => {
    console.log(payload);
    return {
        type: types.SET_AGENCY_INFO,
        payload
    };
};

// ─────────────────────────────────────────────────── 
export const setAgencyInfoInit = () => {
    return {
        type: types.SET_AGENCY_INFO_INIT
    };
};

