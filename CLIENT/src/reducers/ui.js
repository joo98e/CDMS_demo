import * as types from '../actions/ActionTypes';
import { createMuiTheme } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';

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
    
}

const initialState = {
    color: 'default',
    theme: theme.dark,
    bgColor : "#424242"
};

const ui = (state = initialState, action) => {

    switch (action.type) {

        // ────────────────────────────────────────────────────────────────────────────
        case types.SET_COLOR:
            return {
                ...state,
                color: state.color === 'default' ? 'primary' : 'default'
            };

        default:
            return state;
    }
}

export default ui;