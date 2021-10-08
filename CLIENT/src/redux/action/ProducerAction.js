import * as types from '../types';

// ─────────────────────────────────────────────────── 
export const setAgencyInfo = payload => {
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

// ─────────────────────────────────────────────────── 
export const setProjectInfo = payload => {
    return {
        type: types.SET_PROJECT_INFO,
        payload
    };
};

// ─────────────────────────────────────────────────── 
export const setProjectInfoInit = () => {
    return {
        type: types.SET_PROJECT_INFO_INIT
    };
};