import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Grow, Typography, withStyles, Box, Divider } from '@material-ui/core'

import Policy from './Policy'
import RegisterBox from './RegisterBox'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh'
    },
    policyBox: {
        display: 'flex',
        width: '60%',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-around',
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper
    },
    title: {
        minHeight: '10%'
    },
    policyContent: {
        minHeight: '65%'
    },
    registerBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        height: '100vh',
        overflowY: 'scroll'
    },
});

export class index extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            awhile: false
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root + ' mobile-column'}>
                <Grow in={this.state.awhile} >
                    <Box className={classes.policyBox + ' mobile-column'}>
                        <Box className={classes.policyContent}>
                            <Container>
                                <Policy />
                            </Container>
                        </Box>
                    </Box>
                </Grow>
                <Grow in={this.state.awhile} style={{ transformOrigin: '0 0 0' }} timeout={this.state.awhile ? 1000 : 0}>
                    <Box className={classes.registerBox + ' mobile-column'}>
                        <Box mt={4} mb={4}>
                            <Typography variant="h4" align="center">
                                회원가입
                            </Typography>
                        </Box>
                        <Divider />
<<<<<<< HEAD
                        {
                            this.state.awhile && <RegisterBox />
                        }
=======
                        {this.state.awhile && <RegisterBox />}
>>>>>>> a51b829f21cefe31ceb4f4838e99459a10915e4f
                    </Box>
                </Grow>
            </Box >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
