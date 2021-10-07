import * as types from '../types';

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

export const setPathGuider = payload => {
    return {
        type : types.SET_PATH_GUIDER,
        payload
    }
}