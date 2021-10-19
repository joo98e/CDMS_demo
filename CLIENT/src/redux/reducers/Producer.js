import * as types from '../types';
import {
    initRegisterValue,
    initProjectMemberValue,
    initAgencyValue,
    initProjectValue,
    initProcessValue
} from '../producerInitValue';
/**
 * @constant {initRegisterValue}                 : 회원가입 시 사용
 * @constant {initAgencyValue}                   : 기관 생성시 사용
 * @constant {initProjectMemberValue}            : 프로젝트 생성시 사용
 * @constant {initialState}                      : 초기값
 */

const initialState = {
    registerMember: initRegisterValue,
    projectMember: initProjectMemberValue,
    agencyInfo: initAgencyValue,
    projectInfo: initProjectValue,
    processInfo: initProcessValue
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
                projectMember: initProjectMemberValue
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
                agencyInfo: {
                    additionalInfo: initAgencyValue
                }
            };

        case types.SET_PROJECT_INFO:

            return {
                ...state,
                projectInfo: {
                    ...state.projectInfo,
                    ...action.payload
                }
            };

        case types.SET_PROJECT_INFO_INIT:

            return {
                ...state,
                projectInfo: initProjectValue
            };

        case types.SET_PROCESS_INFO:

            return {
                ...state,
                processInfo: {
                    ...state.processInfo,
                    ...action.payload
                }
            };

        case types.SET_PROCESS_INFO_INIT:

            return {
                ...state,
                processInfo: initProcessValue
            };

        default:
            return state;
    }
}

export default Producer;