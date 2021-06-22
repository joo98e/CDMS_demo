import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import {
    Box, AppBar, Toolbar, IconButton, Typography, withStyles, Tooltip
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
    root: {
        flewGrow: 1
    },
    ml: {
        marginLeft : theme.spacing(2)
    },
    mr: {
        marginRight: theme.spacing(2),
    },
    title: {
        flewGrow: 1
    },

});

const HomeIconButton = () => {
    return (
        <Tooltip title="Home">
            <Link to="/">
                <IconButton>
                    <HomeIcon color="inherit"/>
                </IconButton>
            </Link>
        </Tooltip>
    )
};

const LoginIcon = () => {
    return (
        <Tooltip title="Login">
            <Link to="/login">
                <IconButton>
                    <LockOpenIcon />
                </IconButton>
            </Link>
        </Tooltip>
    )
};

export class MyNav extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar>
                        {HomeIconButton()}

                        <Box flexGrow={1} className={classes.ml}>
                            <Typography variant="h6">
                                GOOD
                            </Typography>
                        </Box>

                        {!this.props.auth ?
                            // auth
                            LoginIcon()
                            :
                            // not auth
                            'logged in!'
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.user.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyNav))
