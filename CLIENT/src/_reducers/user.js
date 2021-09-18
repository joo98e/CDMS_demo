import * as types from '../_actions/ActionTypes';

// DB 살리고 함수형으로 바꾸기

const getAuthSessionStorage = () => {
    return sessionStorage.getItem('member') !== null ? true : false
}

const getMemberSessionStorage = () => {
    return sessionStorage.getItem('member') !== null ? JSON.parse(sessionStorage.getItem('member')) : null
}

const initRegisterValue = {
    id: '',
    password: '',
    first_name: '',
    last_name: '',
    nickName: '',
    phone: '',
}

const initialState = {
    auth: getAuthSessionStorage(),
    member: getMemberSessionStorage(),
    projectMember: [],
    registerMember: initRegisterValue
};

const user = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.GET_AUTHENTICATED:
            return {
                ...state,
                auth: true,
                // 로그인
                member: JSON.parse(sessionStorage.getItem('member'))
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
                member: JSON.parse(sessionStorage.getItem('member'))
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
                    avatar_file : '',
                    id: '',
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