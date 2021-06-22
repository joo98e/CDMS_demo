import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import StepComponent from './StepComponent';

class SignIn extends Component {

    componentDidMount() {
        
    }

    render() {

        return (
            <Box flexGrow={1}>
                {this.props.auth ?
                    // ---------------------------------------- Logged
                    // 링크를 다른 곳으로 보내기(프로젝트로)
                    'Logged in'
                    :
                    <Box>
                        <StepComponent />
                    </Box>
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.user.authenticated
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
