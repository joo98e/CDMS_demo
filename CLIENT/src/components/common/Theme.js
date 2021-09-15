import { createMuiTheme } from '@material-ui/core';
import { purple, teal, blue, blueGrey, orange, lime, brown, amber } from "@material-ui/core/colors";
// import WhiteTheme from './WhiteTheme'

// TODO
/*
 * 타입스크립트 적용하기
 * 
 * 
 * 만들 테마 목록
 * https://www.rapidtables.com/web/color/white-color.html
 * mintcream
 * 
*/

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
    
    // white: WhiteTheme,

    brown: createMuiTheme({
        palette: {
            primary: brown,
            background: {
                default: brown[100],
                paper: brown[200],
                button: brown[300]
            },
            text: {
                primary: "#a04500"
            }
        }
    }),

    lime: createMuiTheme({
        palette: {
            primary: lime,
            background: {
                default: lime[100],
                paper: lime[200],
                button: lime[300]
            },
            text: {
                primary: "#a04500"
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
    }),
}

export default theme;