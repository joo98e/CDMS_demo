import * as types from './ActionTypes';

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
export const setTheme = theme => {
    return {
        type: types.SET_THEME,
        theme
    };
};