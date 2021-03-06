import * as types from '../types';

// ─────────────────────────────────────────────────── 
export const setMemberInfos = member => {
    return {
        type: types.GET_AUTHENTICATED,
        member
    };
};

// ─────────────────────────────────────────────────── 
export const outAuthenticated = () => {
    localStorage.removeItem('member');
    return {
        type: types.OUT_AUTHENTICATED,
    };
};

// ─────────────────────────────────────────────────── 
export const devAuth = member => {
    return {
        type: types.DEV_SET_AUTH,
        member
    };
};

// ─────────────────────────────────────────────────── 
export const setProjectInOutPutPerson = payload => {
    return {
        type: types.SET_PROJECT_PERSON_LIST,
        payload
    };
};

// ─────────────────────────────────────────────────── 
export const setProjectPersonInit = () => {
    return {
        type: types.SET_PROJECT_PERSON_LIST_INIT
    };
};

// ─────────────────────────────────────────────────── 
export const setRegisterMemberInfo = payload => {
    return {
        type: types.SET_REGISTER_MEMBER_INFO,
        payload
    };
};

// ─────────────────────────────────────────────────── 
export const setRegisterMemberInfoInit = () => {
    return {
        type: types.SET_REGISTER_MEMBER_INFO_INIT
    };
};

