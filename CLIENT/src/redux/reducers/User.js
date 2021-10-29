import * as types from '../types';

const getAuthLocalStorage = () => {
    return localStorage.getItem('member') !== null ? true : false
}
const getMemberLocalStorage = () => {
    return localStorage.getItem('member') !== null ? JSON.parse(localStorage.getItem('member')) : null
}

const getIp = async URL => {
    await fetch(URL,
        {
            method: 'get'
        })
        .then(res => res.json())
        .then(res => {
            if (res.resultCode < 0) {
                console.error("IP를 받아오지 못했습니다.");
            } else {
                initialState.accessInfo = {
                    IPv4: res.result
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}

const initialState = {
    auth: getAuthLocalStorage(),
    member: getMemberLocalStorage(),
    accessInfo: getIp("/api/Util/getIp"),
};

const User = (state = initialState, action) => {

    switch (action.type) {

        case types.GET_AUTHENTICATED:
            // TODO JWT 적용
            return {
                ...state,
                auth: true,
                member: JSON.parse(localStorage.getItem('member'))
            };

        case types.OUT_AUTHENTICATED:
            return {
                ...state,
                auth: false,
                member: null
            };

        case types.DEV_SET_AUTH:
            return {
                ...state,
                auth: true,
                member: JSON.parse(localStorage.getItem('member'))
            };

        default:
            return state;
    }
}

export default User;