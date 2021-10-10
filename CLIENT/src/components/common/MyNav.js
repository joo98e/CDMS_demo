import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as actions from '../../redux/action/UserInfoAction'

import {
    Box, AppBar, Toolbar, IconButton, Typography, withStyles, Tooltip
} from '@material-ui/core';

import { LockOpenIcon } from './CustomIcons';
import UISidebar from './UISideBar';
import UISkeletonAvatar from './UISkeletonAvatar'

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
    mb1: {
        paddingBottom: theme.spacing(1)
    },
    title: {
        flewGrow: 1
    },
    writerBox: {
        display: "inline-block",
        margin: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(2),
        background: theme.palette.background.default
    },

});

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
                        <UISidebar />

                        <Box flexGrow={1} className={classes.ml}>
                            <Typography variant="h6">
                                {this.props.pathGuider}
                            </Typography>
                        </Box>



                        {this.props.user.auth ?
                            <Tooltip title="로그아웃">
                                <Link to="/login">
                                    <IconButton color="inherit" onClick={this.props.handleSessionQuit}>
                                        {LockOpenIcon}
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            :
                            <Typography
                                onClick={this.props.handleSessionQuit}
                            >
                                정상적인 접근이 아닙니다. 세션을 종료하세요.
                            </Typography>
                        }

                        <div
                            className={classes.writerBox}
                        >
                            <UISkeletonAvatar
                                className={classes.mb1}
                                src={this.props.user.member.avatar_path}
                                alt={this.props.user.member.nickname}
                            />
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User,
    pathGuider: state.UI.pathGuider
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSessionQuit: () => { dispatch(actions.outAuthenticated()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyNav))
