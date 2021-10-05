import * as types from '../types';

/**
 * @constant {initRegisterValue}                 : 회원가입 시 사용
 * @constant {initAgencyValue}                    : 기관 생성시 사용
 * @constant {initProjectMemberValue}            : 프로젝트 생성시 사용
 * @constant {initialState}                      : 초기값
 */

const initProjectMemberValue = [];
const initRegisterValue = {
    id: '',
    idCheck: false,
    password: '',
    passwordCheck : '',
    first_name: '',
    last_name: '',
    nickName: '',
    phone: '',
}

const today = () => {
    const _now = new Date();
    const _fullYear = String(_now.getFullYear());
    const _getMonth = String(_now.getMonth() + 1);
    const _getDate = String(_now.getDate());
    return `${_fullYear}-${_getMonth < 10 ? "0" + _getMonth : _getMonth}-${_getDate < 10 ? "0" + _getDate : _getDate}`
 }

const initAgencyValue = {
    start_date: today(),
    end_date: today(),
    name: '',
    desc: '',
    biz_area: '',
    person: [],
    additionalInfo: []
}

const initialState = {
    registerMember: initRegisterValue,
    projectMember: initProjectMemberValue,
    agencyInfo : initAgencyValue
};

const Producer = (state = initialState, action) => {

    switch (action.type) {

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
                registerMember: initRegisterValue
            }
        
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
        
        case types.SET_AGENCY_INFO:

            return {
                ...state,
                agencyInfo: {
                    ...state.agencyInfo,
                    ...action.payload
                }
            };
        
        case types.SET_AGENCY_INFO_INIT:

            return {
                ...state,
                agencyInfo: {}
            };
        
        default:
            return state;
    }
}

export default Producer;