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
        <Tooltip title="홈">
            <Link to="/assistant/projects">
                <IconButton>
                    <HomeIcon color="inherit"/>
                </IconButton>
            </Link>
        </Tooltip>
    )
};

const sessionOut = () => {
    {/* TODO 디스패치로 세션 종료시키기 */}
    sessionStorage.removeItem('member');
}

const Logout = () => {
    return (
        <Tooltip title="로그아웃">
            <Link to="/">
                <IconButton onClick={sessionOut}>
                    <LockOpenIcon color="inherit"/>
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

                        {this.props.user ?
                            // auth
                            Logout()
                            :
                            // not auth
                            '세션을 종료하세요.'
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyNav))
