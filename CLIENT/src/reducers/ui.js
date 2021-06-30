import * as types from '../actions/ActionTypes';
import { createMuiTheme } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';

const theme = {
    dark: createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#202020'
            }
        }
    }),

    purple: createMuiTheme({
        palette: {
            primary: {
                main: purple[500],
            },
            secondary: {
                main: '#f44336',
            },
        },
    }),

    teal: createMuiTheme({
        palette: {
            primary: {
                main: teal[500]
            },
            secondary: {
                main: '#cddc39',
            }
        }
    })
}

let temp;

const message = function () {
    const date = new Date();
    temp = date.getHours();

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
    theme: theme.dark,
    bgColor: "#424242",
    hourlyGreetings: message()
};

const ui = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.SET_COLOR:
            return {
                ...state,
                color: state.color === 'default' ? 'primary' : 'default'
            };

        case types.SET_THEME:
            return {
                ...state,
                theme:
                    (state.theme === theme.dark) ? theme.purple :
                        (state.theme === theme.teal) ? theme.dark :
                            (state.theme === theme.purple) ? theme.teal : theme.dark
            };

        default:
            return state;
    }
}

export default ui;