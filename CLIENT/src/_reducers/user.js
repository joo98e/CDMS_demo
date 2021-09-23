import * as types from '../_actions/ActionTypes';

/**
 * @function getAuthLocalStorage          :   세션 스토리지로부터 멤버 정보를 받아온다.
 * @returns 
 */

const getAuthLocalStorage = () => {
    return localStorage.getItem('member') !== null ? true : false
}

const getMemberLocalStorage = () => {
    return localStorage.getItem('member') !== null ? JSON.parse(localStorage.getItem('member')) : null
}

const getIp = async url => {
    await fetch(url,
        {
            method: 'get',
        })
        .then(res => res.json())
        .then(res => {
            initialState.accessInfo = res;
        })
        .catch(err => {
            console.log(err);
        });
}

const initRegisterValue = {
    id: '',
    idCheck : false,
    password: '',
    first_name: '',
    last_name: '',
    nickName: '',
    phone: '',
}

const initialState = {
    auth: getAuthLocalStorage(),
    member: getMemberLocalStorage(),
    accessInfo: null,
    projectMember: [],
    registerMember: initRegisterValue
};

getIp('https://geolocation-db.com/json/');

const user = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.GET_AUTHENTICATED:
            return {
                ...state,
                auth: true,
                // 로그인
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
                // 개발 로그인
                member: JSON.parse(localStorage.getItem('member'))
            };

        case types.SET_PROJECT_PERSON_LIST:

            let _temp = state.projectMember;
            let status = false;

            for (let idx in _temp) {
                if (_temp[idx].id === action.payload.id) {
                    _temp.splice(idx, 1);
                    status = true;
                }
            }

            if (status) return { ...state, projectMember: _temp }
            else return {
                ...state,
                projectMember: [
                    ...state.projectMember,
                    action.payload
                ]
            }

        case types.SET_PROJECT_PERSON_LIST_INIT:

            return {
                ...state,
                projectMember: []
            };

        case types.SET_REGISTER_MEMBER_INFO:

            return {
                ...state,
                registerMember: {
                    ...state.registerMember,
                    ...action.payload
                }
            }

        case types.SET_REGISTER_MEMBER_INFO_INIT:

            return {
                ...state,
                registerMember: {
                    avatar_file: '',
                    id: '',
                    idCheck: false,
                    password: '',
                    first_name: '',
                    last_name: '',
                    nickName: '',
                    phone: '',
                }
            }

        default:
            return state;
    }
}

export default user;