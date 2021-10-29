import * as types from '../types';

/**
 * @constant initRegisterValue            : 초기값
 * @constant getAuthLocalStorage          : 세션 스토리지로부터 멤버 정보를 받아온다.
 * @constant getIp                        : 접속 IP 및 위치 정보
 * @returns 
 */



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
            initialState.accessInfo = res;
        })
        .catch(err => {
            console.log(err);
            initialState.accessInfo = {
                IPv4: "106.248.61.60",
                city: "Seoul",
                country_code: "KR",
                country_name: "South Korea",
                latitude: 37.5985,
                longitude: 126.9783,
                postal: null,
                state: "Seoul",
            }
        });
}

const initialState = {
    auth: getAuthLocalStorage(),
    member: getMemberLocalStorage(),
    accessInfo: null,
};

getIp('/api/Util/getIp');

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