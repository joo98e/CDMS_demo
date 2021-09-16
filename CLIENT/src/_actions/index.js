import * as types from '../_actions/ActionTypes';

// ─────────────────────────────────────────────────── 
export const numIncrement = () => {
    return {
        type : types.NUMBER_INCREMENT
    };
};

// ─────────────────────────────────────────────────── 
export const numDecrement = () => {
    return {
        type : types.NUMBER_DECREMENT
    };
};

// ─────────────────────────────────────────────────── 
export const setColor = color => {
    return {
        type : types.SET_COLOR,
        color
    };
};

// ─────────────────────────────────────────────────── 
export const setMenuAppearPosition = menuAppearPosition => {
    return {
        type : types.SET_MENU_APPEAR_POSITION,
        menuAppearPosition
    };
};

// ─────────────────────────────────────────────────── 
export const setTheme = theme => {
    return {
        type: types.SET_THEME,
        theme
    };
};

