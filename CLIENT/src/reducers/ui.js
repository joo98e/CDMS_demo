import * as types from '../actions/ActionTypes';
import Themes from '../components/common/Theme'

const message = function () {
    const date = new Date();
    let temp = date.getHours();

    return temp >= 20 ? '편안한 밤 되세요.'
        : temp >= 18 ? '맛있는 식사 하세요!'
            : temp >= 13 ? '오후도 힘내세요.'
                : temp >= 12 ? '식사 맛있게 하세요!'
                    : temp >= 10 ? '오전 힘내세요!'
                        : temp >= 9 ? '좋은 아침입니다.'
                            : temp >= 6 ? '너무 이른데요..' : '굿밤!'
}

const initialState = {
    color: 'default',
    theme: Themes.dark,
    bgColor: "#424242",
    hourlyGreetings: message(),
    menuAppearPosition: 'left'
};

const ui = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.SET_COLOR:
            return {
                ...state,
                color: state.color === 'default' ? 'primary' : 'default'
            };

        case types.SET_MENU_APPEAR_POSITION:
            return {
                ...state,
                menuAppearPosition:
                    (state.menuAppearPosition === 'left') ? 'top' :
                        (state.menuAppearPosition === 'top') ? 'right' :
                            (state.menuAppearPosition === 'right') ? 'bottom' : 'left'
            };

        case types.SET_THEME:
            return {
                ...state,
                theme:
                    (state.theme === Themes.dark) ? Themes.purple :
                        (state.theme === Themes.teal) ? Themes.dark :
                            (state.theme === Themes.purple) ? Themes.teal : Themes.dark
            };

        default:
            return state;
    }
}

export default ui;