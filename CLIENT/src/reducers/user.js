import * as types from '../actions/ActionTypes';

// DB 살리고 함수형으로 바꾸기

const getAuthSessionStorage = () => {
    return sessionStorage.getItem('member') !== null ? true : false
}

const getMemberSessionStorage = () => {
    return sessionStorage.getItem('member') !== null ? sessionStorage.getItem('member') : null
}

const initialState = {
    auth : getAuthSessionStorage(),
    member : getMemberSessionStorage()
};

const user = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.GET_AUTHENTICATED:
            return {
                auth : true,
                member : JSON.parse(sessionStorage.getItem('member'))
            };

        case types.OUT_AUTHENTICATED:
            return {
                auth : false,
                member : null
            };

        case types.DEV_SET_AUTH:
            return {
                auth: true,
                member: JSON.parse(sessionStorage.getItem('member'))
            };

        default:
            return state;
    }
}

export default user;