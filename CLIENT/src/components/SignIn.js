import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Box, Container, withStyles } from '@material-ui/core'
import { FaReact, FaNode } from 'react-icons/fa';
import { SiMaterialUi, SiMariadb, SiMysql, SiVisualstudiocode } from 'react-icons/si';
import StepComponent from './StepComponent';

const styles = theme => ({
    contain: {

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
                    <Container>
                        <AppBar>
                            <Box display="flex" justifyContent="center" m={1} p={1}>
                                <Box p={1}><FaReact size="48"/></Box>
                                <Box p={1}><FaNode size="48"/></Box>
                                <Box p={1}><SiMariadb size="48"/></Box>
                                <Box p={1}><SiMaterialUi size="48"/></Box>
                                <Box p={1}><SiMysql size="48"/></Box>
                                <Box p={1}><SiVisualstudiocode size="48"/></Box>
                            </Box>
                        </AppBar>
                        <Box className={classes.contain}>
                            <StepComponent />
                        </Box>
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
