import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as actions from '../../actions/UserInfo'

import {
    Box, AppBar, Toolbar, IconButton, Typography, withStyles, Tooltip
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
    root: {
        flewGrow: 1
    },
    ml: {
        marginLeft: theme.spacing(2)
    },
    mr: {
        marginRight: theme.spacing(2),
    },
    title: {
        flewGrow: 1
    },

});

export class MyNav extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    sessionOut = () => {
        sessionStorage.removeItem('member');
        this.props.handleSessionQuit();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar>

                        <Tooltip title="초기 화면으로">
                            <Link to="/assistant/landing">
                                <IconButton>
                                    <HomeIcon color="inherit" />
                                </IconButton>
                            </Link>
                        </Tooltip>

                        {/* <Tooltip title="프로젝트">
                            <Link to="/assistant/projects">
                                <IconButton>
                                    <AccountTreeIcon color="inherit" />
                                </IconButton>
                            </Link>
                        </Tooltip> */}

                        <Box flexGrow={1} className={classes.ml}>
                            <Typography variant="h6">
                                
                            </Typography>
                        </Box>

                        {this.props.user.auth ?
                            // auth
                            <Tooltip title="로그아웃">
                                <Link to="/login">
                                    <IconButton onClick={this.sessionOut}>
                                        <LockOpenIcon color="inherit" />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            :
                            // not auth
                            <Typography>
                                세션을 종료하세요.
                            </Typography>
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleSessionQuit: () => { dispatch(actions.outAuthenticated()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyNav))
