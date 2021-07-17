
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

export default theme;