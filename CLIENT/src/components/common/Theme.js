import { createTheme } from '@material-ui/core';

const theme = {
    nature: createTheme({
        palette: {
            action: {
                active: "rgba(0, 0, 0, 0.04)",
                hover: "rgba(0, 0, 0, 0.04)",
                disabled: "rgba(0, 0, 0, 0.04)",
                disabledBackground: "rgba(0, 0, 0, 0.04)",
                focus: "rgba(0, 0, 0, 0.04)",
                selected: "#FFF"
            },
            primary: {
                main: "#1B2631",
                light: "#7d8e9e",
                dark: "rgba(0, 0, 0, 0.8)"
            },
            secondary: {
                main: "#FFFFFF",
                light: "#becad5",
                dark: "#121a22"
            },
            background: {
                default: "#2a3c4e",
                paper: "#3c4f64",
                button: "#37485b",
                whiteButton: "#FFF",
            },
            text: {
                primary: "#EAEAEA",
                secondary: "#D2D2D2",
                hint: "#E7E7E7",
                disabled: "#7c7c7c",
                desc: "#C2C2C2"
            },
            chart: {
                background: "#2a3c4e",
                sub: "#6c71cf",
                accent : "#7eb188",
                text: {
                    main: "#2D2D2D",
                    sub: "#565656"
                }
            },
            slider: {
                ball: "#DCDCDC",
                ballBorder : "#B3B3B3",
                background: "#2c93ff",
            },
            rating: {
                star: {
                    default: "#888888",
                    fill: "#e9b840",
                    hover: "#ffcc50"
                },
                heart: {
                    default: "#2a3c4e",
                    fill: "#ffb400",
                    hover: "#f55f67"
                }
            },
            // 실제 버튼 영역
            grey: {
                A100: "rgba(0, 0, 0, 0.04)",
            }
        },
    }),

    // dark: createTheme({
    //     palette: {
    //         type: 'dark',
    //         action: {
    //             active: "rgba(0, 0, 0, 0.04)",
    //             hover: "rgba(0, 0, 0, 0.04)",
    //             disabled: "rgba(0, 0, 0, 0.04)",
    //             disabledBackground: "rgba(0, 0, 0, 0.04)",
    //             focus: "rgba(0, 0, 0, 0.04)",
    //             selected: "#FFF"
    //         },
    //         primary: {
    //             main: '#202020',
    //             dark: "rgba(255, 255, 255, 0.2)"
    //         },
    //         secondary: {
    //             main: '#FFF',
    //         },
    //         background: {
    //             button: "#7a7a7a",
    //             whiteButton: "#FFF",
    //         },
    //         text: {
    //             primary: "#FFF",
    //             secondary: "#FFF",
    //         },
    //         slider: {
    //             ball: "#D7D7D7",
    //             background: "4b5d70",
    //         },
    //         grey: {
    //             A100: "rgba(0, 0, 0, 0.04)",
    //         },
    //     },
    // }),

    white: createTheme({
        palette: {
            action: {
                active: "rgba(0, 0, 0, 0.8)",
                hover: "rgba(0, 0, 0, 0.04)",
                disabled: "rgba(0, 0, 0, 0.8)",
                disabledBackground: "rgba(0, 0, 0, 0.8)",
                focus: "rgba(0, 0, 0, 0.04)",
                selected: "rgba(0, 0, 0, 0.8)"
            },
            primary: {
                main: "#FFF",
                light: "#7d8e9e",
                dark: "#a2b7cc",
            },
            secondary: {
                main: "#686868",
                light: "#becad5",
                dark: "#121a22",

            },
            info: {
                main: "#686868",
                light: "#becad5",
                dark: "#121a22",
            },
            background: {
                default: "#FBFCFF",
                paper: "#eff0f4",
                button: "#FFFFFF",
                whiteButton: "#8F8F8F",
            },
            text: {
                primary: "#333333",
                secondary: "#6F6F6F",
                hint: "#6F6F6F",
                disabled: "#6F6F6F",
                desc: "#9D9D9D"
            },
            chart: {
                background: "#C1C1C1",
                sub: "#6389b3",
                accent: "#7ca75f",
                text: {
                    main: "#2D2D2D",
                    sub: "#565656"
                }
            },
            slider: {
                ball: "#ffffff",
                ballBorder: "#6a6a6a",
                background: "#4aad44",
            },
            rating: {
                star: {
                    default: "#888888",
                    fill: "#f4454f",
                    hover: "#ffcc50"
                },
                heart: {
                    default: "#2a3c4e",
                    fill: "#f4454f",
                    hover: "#f55f67"
                }
            },
            // 실제 버튼 영역
            grey: {
                A100: "rgba(0, 0, 0, 0.04)",
            },

        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    html: {
                        WebkitFontSmoothing: 'auto',
                    },
                    "&$.MuiSpeedDial-fab": {
                        background: "#EBEBEB !important"
                    },
                },
            },
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