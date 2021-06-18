import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, withStyles } from '@material-ui/core'
import StepComponent from './StepComponent';

const styles = theme => ({
    contain: {
        color: "#FFF",
        backgroundColor: '#333333'
    }
});

class SignIn extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.auth ?
                    // ---------------------------------------- Logged
                    // 링크를 다른 곳으로 보내기(프로젝트로)
                    'Logged in'
                    :
                    <Container className={this.contain} maxWidth="md">
                        <StepComponent />
                    </Container>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
