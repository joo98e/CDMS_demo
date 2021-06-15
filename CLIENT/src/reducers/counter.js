import * as types from '../actions/ActionTypes';

const initialState = {
    number: 0,
    dumbObject: {
        d: 0,
        u: 1,
        m: 2,
        b: 3
    }
};

const counter = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.NUMBER_INCREMENT:
            return {
                ...state,
                number: state.number + 1,
                // Object 내용 일부만 수정시 아래와 같이 진행
                dumbObject: {
                    ...state.dumbObject,
                    u: 4
                }
            };

        // ────────────────────────────────────────────────────────────────────────────
        case types.NUMBER_DECREMENT:
            return {
                ...state,
                number: state.number - 1,
            }

        // ────────────────────────────────────────────────────────────────────────────
        // 기존 상태 그대로 리턴

        default:
            return state;
    }
}

export default counter;