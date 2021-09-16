import { createMuiTheme } from '@material-ui/core';
import { purple, teal, blue, blueGrey, orange } from "@material-ui/core/colors";

const theme = {
    dark: createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#202020'
            },
            secondary: {
                main: '#FFF',
            },
            text: {
                primary: "#FFF",
                secondary: "#FFF",
            },
        },
    }),

    purple: createMuiTheme({
        palette: {
            primary: {
                main: purple[500],
            },
            secondary: {
                main: '#f44336',
            },
            background: {
                default: purple[100],
                paper: purple[300],
                button: purple[500]
            },
            text: {
                primary: "#712c7d",
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
            background: {
                default: teal[100],
                paper: teal[300],
                button: teal[500]
            },
            text: {
                primary: teal[900]
            }
        }
    }),

    blue: createMuiTheme({
        palette: {
            primary: blue,
            secondary: blueGrey,
            background: {
                default: blue[100],
                paper: blue[300],
                button: blue[500]
            },
            text: {
                primary: blue[900]
            }
        },
    }),

    orange: createMuiTheme({
        palette: {
            primary: orange,
            background: {
                default: orange[300],
                paper: orange[500],
                button: orange[700]
            },
            text: {
                primary: "#a04500"
            }
        }
    })
}

export default theme;