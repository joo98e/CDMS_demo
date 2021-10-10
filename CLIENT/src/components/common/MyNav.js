import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../redux/action/UserInfoAction'

import {
    Box, AppBar, Toolbar, IconButton, Typography, withStyles, Tooltip, Menu, MenuItem, Divider, ListItemIcon, Avatar, Badge
} from '@material-ui/core';

import {
    LockOpenIcon,
    NotificationsActiveIcon,
    ExitToAppIcon,
    InfoIcon,
    HelpIcon
} from './CustomIcons';
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
            open: false,
            anchorEI: null
        }
    }

    handleOpenMenu = event => {
        this.setState({ ...this.state, open: !this.state.open ? true : false, anchorEI: event.currentTarget });
    }

    handleCloseMenu = () => {
        this.setState({ ...this.state, open: !this.state.open ? true : false });
    }

    handleLogout = () => {
        this.props.history.push('/login');
        this.props.handleSessionQuit();
    }

    render() {
        const { classes } = this.props;


        const menuList = [
            {
                name: "프로필",
                icon:
                    <Badge badgeContent={0} color="secondary">
                        {InfoIcon}
                    </Badge>,
                fn: null,
                Divider: true
            },
            {
                name: "알림 확인",
                icon: NotificationsActiveIcon,
                fn: null
            },
            {
                name: "도움말",
                icon: HelpIcon,
                fn: null
            },
            {
                name: "로그아웃",
                icon: ExitToAppIcon,
                fn: this.handleLogout
            },
        ]

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



                        {/* {this.props.user.auth ?
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
                        } */}

                        <Tooltip title="메뉴">
                            <IconButton
                                onClick={this.handleOpenMenu}
                            >
                                <UISkeletonAvatar
                                    className={classes.mb1}
                                    src={this.props.user.member.avatar_path}
                                    alt={this.props.user.member.nickname}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            open={this.state.open}
                            anchorEl={this.state.anchorEI}
                            onClose={this.handleCloseMenu}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            }}
                        >
                            {
                                menuList &&
                                menuList.map((item, index) => {
                                    return (
                                        <React.Fragment>
                                            <MenuItem
                                                key={index}
                                                onClick={item.fn !== null ? item.fn : ""}
                                                style={{minHeight : "60px"}}
                                            >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                {item.name}
                                            </MenuItem>
                                            {item.Divider && <Divider />}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Menu>

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(MyNav)))
