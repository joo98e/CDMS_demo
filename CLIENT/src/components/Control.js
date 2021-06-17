import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core';



export class Control extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    createWarn = fnName => {
        return console.log(`${fnName} is not defined`);
    }

    render() {
        return (
            <div>
                <Box>
                    <Button variant="contained" color="default" onClick={this.props.onPlus}>+</Button>
                    <Button variant="contained" color="default" onClick={this.props.onSubtract}>-</Button>
                    <Button variant="contained" color="default" onClick={this.props.onRandomizeColor}>Randomize Color</Button>
                </Box>
            </div>
        )
    }
}

export default Control
