import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../actions';


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

    createUser = () => {
        const vars = {
            name : 'tb',
            age : '28',
            id : 'taebok',
            password : '12345',
            email : 'blackishhood@mirimmedialab.co.kr'
        }
        const url = '/users/register';

        return axios.post(url, vars);
    }

    render() {
        return (
            <div>
                <Box>
                    <Button variant="contained" color={this.props.color} onClick={this.props.onPlus}>+</Button>
                    <Button variant="contained" color={this.props.color} onClick={this.props.onSubtract}>-</Button>
                    <Button variant="contained" color={this.props.color} onClick={this.props.handleSetColor}>Randomize Color</Button>
                    <Button variant="contained" color={this.props.color} onClick={this.createUser}>go</Button>
                </Box>
            </div>
        )
    }
}

// state는 파라미터 이름 자체만 state, this.state와는 다르다.
const mapStateToProps = (state) => {
    
    return {
        color: state.ui.color
    }
}

const mapDispatchToProps = (dispatch) => {

    // 참조해보기
    // import { bindActionCreators } from 'redux';
    // return bindActionCreators(actions, dispatch);

    return {
        handleSetColor: () => { dispatch(actions.setColor()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)
