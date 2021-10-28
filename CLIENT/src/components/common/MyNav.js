import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/action/UserInfoAction'
import axios from 'axios'
import {
    Box, AppBar, Toolbar, IconButton, Typography, withStyles, Tooltip, Menu, MenuItem, Divider, ListItemIcon, Badge
} from '@material-ui/core';

import {
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

    tmp = () => {
        console.log("함수 미정");
    }

    mailConfirm = () => {
        const URL = "/api/mail/send"

        if (window.confirm("실행하시겠습니까?")) {
            let _status = true;
            let _msg = String;
            const params = [
                {
                    receiver: "askjmyyyojqa@gmail.com",
                    subject: "1번째",
                    content: " 1번째 내용"
                },
                {
                    receiver: "askjmyyyojqa@naver.com",
                    subject: "2번째",
                    content: " 2번째 내용"
                }, {
                    receiver: "askjmyyyojqa@daum.net",
                    subject: "3번째",
                    content: " 3번째 내용"
                }, {
                    receiver: "askjmyyyojqa@mirimmedialab.co.kr",
                    subject: "4번째",
                    content: " 4번째 내용"
                },
            ];

            for (const props in params) {

                switch (props) {
                    case "_Content":

                        break;

                    default:
                        if (params[props] === null || params[props] === "") {
                            _status = false
                            _msg = `${props}는 NULL이 허용되지 않습니다.`;
                        };
                        break;
                }
            }

            if (_status) {
                axios.post(URL, params)
                    .then(res => {
                        console.log(res);
                    });
            } else {
                alert(_msg);
            }
        }
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
                        {<InfoIcon />}
                    </Badge>,
                action: this.tmp,
                Divider: true
            },
            {
                name: "알림",
                icon: <NotificationsActiveIcon />,
                action: this.tmp
            },
            {
                name: "Help",
                icon: <HelpIcon />,
                action: this.mailConfirm
            },
            {
                name: "로그아웃",
                icon: <ExitToAppIcon />,
                action: this.handleLogout
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
                                <IconButton color="inherit" onClick={this.props.handleSessionQuit}>
                                    {<LockOpenIcon />}
                                </IconButton>
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
                        <Typography variant="body1">
                            {this.props.user.member.nickname}님
                        </Typography>
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
                                        <div key={index}>
                                            <MenuItem
                                                onClick={item.action}
                                                style={{ minHeight: "60px" }}
                                            >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                {item.name}
                                            </MenuItem>
                                            {item.Divider && <Divider />}
                                        </div>
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
