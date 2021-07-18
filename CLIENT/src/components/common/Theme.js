import { createMuiTheme } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';
import { blue, blueGrey } from "@material-ui/core/colors";

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
            background : {
                default : purple[100],
                paper : purple[300],
                button : purple[500]
            },
            text : {
                primary : purple[900]
            }
        },
    }),

    teal: createMuiTheme({
        palette: {
            primary: {
                main: teal[500]
            },
            secondary: {
                main: '#cddc39',
            },
            background : {
                default : teal[100],
                paper : teal[300],
                button : teal[500]
            },
            text : {
                primary : teal[900]
            }
        }
    }),

    defaultTheme: createMuiTheme({
        palette: {
            primary: blue,
            secondary: blueGrey,
            background : {
                default : blue[100],
                paper : blue[300],
                button : blue[500]
            },
            text : {
                primary : blue[900]
            }
        },
        status: {
            danger: "orange",
        },
    })
}

export default theme;