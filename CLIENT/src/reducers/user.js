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
                auth : true,
                member : {
                    MEM_NAME : '정태복',
                    MEM_NICKNAME : 'joo98e',
                    MEM_DEPT_NO : '1001',
                    MEM_EMAIL : 'blackishhood@mirimmedialab.co.kr',
                    MEM_PHONE : '010-5614-1328',
                    MEM_EMPNO : '0001',
                    MEM_HIREDATE : '2020-05-11',
                    MEM_BIRTHDAY : '1994-09-28',
                }
            };

        default:
            return state;
    }
}

export default user;