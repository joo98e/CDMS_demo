import { createTheme } from '@material-ui/core';
import { purple, teal, blue, blueGrey, orange } from "@material-ui/core/colors";

const theme = {
    dark: createTheme({
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

    white: createTheme({
        palette: {
            primary: {
                main: "#000",
            },
            secondary: {
                main: '#000000',
            },
            background: {
                default: "#FFF",
                paper: "#EEE",
                button: "#FFFFFF",
            },
            text: {
                primary: "#000000",
            }
        },
    }),

    nature: createTheme({
        palette: {
            primary: {
                main: "#1B2631",
                light : "#7d8e9e",
                dark : "#a2b7cc"
            },
            secondary: {
                main: "#5D6D7E",
                light : "#becad5",
                dark : "#121a22"
            },
            background: {
                default: "#2a3c4e",
                paper: "#3c4f64",
                button: "#7ca2c9",
            },
            text: {
                primary: "#eaeaea",
                secondary : "#dddddd",
                hint : "#e7e7e7",
                disabled : "#e7e7e7"
            }
        },
    }),

    // purple: createTheme({
    //     palette: {
    //         primary: {
    //             main: purple[500],
    //         },
    //         secondary: {
    //             main: '#f44336',
    //         },
    //         background: {
    //             default: purple[100],
    //             paper: purple[300],
    //             button: purple[500]
    //         },
    //         text: {
    //             primary: "#712c7d",
    //         }
    //     },
    // }),

    // teal: createTheme({
    //     palette: {
    //         primary: {
    //             main: teal[500]
    //         },
    //         secondary: {
    //             main: '#cddc39',
    //         },
    //         background: {
    //             default: teal[100],
    //             paper: teal[300],
    //             button: teal[500]
    //         },
    //         text: {
    //             primary: teal[900]
    //         }
    //     }
    // }),

    // blue: createTheme({
    //     palette: {
    //         primary: blue,
    //         secondary: blueGrey,
    //         background: {
    //             default: blue[100],
    //             paper: blue[300],
    //             button: blue[500]
    //         },
    //         text: {
    //             primary: blue[900]
    //         }
    //     },
    // }),

    // orange: createTheme({
    //     palette: {
    //         primary: orange,
    //         background: {
    //             default: orange[300],
    //             paper: orange[500],
    //             button: orange[700]
    //         },
    //         text: {
    //             primary: "#a04500"
    //         }
    //     }
    // })
}

export default theme;