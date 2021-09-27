import * as types from '../types';

/**
 * @constant {initialState}                      : 초기값
 * @constant {initRegisterValue}                 : 회원가입 시 초기 정보
 * @constant {initProjectMemberValue}            : 프로젝트 생성시 사용
 */

const initProjectMemberValue = [];
const initRegisterValue = {
    id: '',
    idCheck: false,
    password: '',
    first_name: '',
    last_name: '',
    nickName: '',
    phone: '',
}

const initialState = {
    registerMember: initRegisterValue,
    projectMember: initProjectMemberValue
};

const Producer = (state = initialState, action) => {

    switch (action.type) {

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

export default Producer;