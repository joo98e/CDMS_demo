import React, { Component } from 'react'

import { Box } from '@material-ui/core';

export class UIThemeBackground extends Component {
    render() {
        return (
            <Box
                style={{
                    position: "relative",
                    height: "100vh",
                    background: this.props.theme.palette.background.default,
                    color: this.props.theme.palette.text.primary
                }}
            >

            </Box>
        )
    }
}

export default UIThemeBackground
