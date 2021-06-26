import React, { Component } from 'react'
import { connect } from 'react-redux'

import logo from '../../_logo/logo.svg'

import { Container, Paper, Box, Grid, Button, TextField, withStyles, Typography } from '@material-ui/core'


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    },
    logoBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '60%',
        height: '100vh',
        backgroundColor: theme.palette.background.paper
    },
    loginBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100vh'
    },
    logo: {
        width: theme.spacing(36),
    }
});

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id: '',
            user_password: ''
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.logoBox}>
                    <img className={classes.logo} src={logo} alt="logo" />
                    <Typography variant="h2" component="h2">
                        Sign In
                    </Typography>
                </div>
                <div className={classes.loginBox}>
                    2
                </div>

                {/*<Container fixed>
                    <Box component="div">
                        sd
                         <Paper variant="outlined" square>
                        <Grid container justify='center' alignContent='center' alignItems='center'>
                            <Grid item xs={12}>
                                <Container width={400}>
                                    <TextField
                                        variant="filled"
                                    />
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Container>
                                    <Button
                                        fullWidth
                                    >
                                        1
                                    </Button>
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Container>
                                    <Button
                                        fullWidth
                                    >
                                        2
                                    </Button>
                                </Container>
                            </Grid>
                        </Grid>
                    </Paper> 
                    </Box>
                </Container>
                */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
