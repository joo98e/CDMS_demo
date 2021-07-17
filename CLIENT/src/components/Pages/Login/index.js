import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import * as actions from '../../../actions/UserInfo'
import CopyRights from '../../common/CopyRights'
import logo from '../../../_logo/logo.svg'
import { withSnackbar } from 'notistack'

import { Box, Button, TextField, withStyles, Typography, Grow } from '@material-ui/core'

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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: '40%',
        height: '100vh',
    },
    logo: {
        width: theme.spacing(36),
    },
    formBox: {
        width: theme.spacing(48),
        margin: "0 auto"
    },
    buttonMargin: {
        margin: '15px 20px'
    }
});


export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            info: {},
            awhile: false
        }
    }

    componentDidMount() {
        if (this.props.user.auth) this.props.history.push('/');

        this.setState({
            awhile: true
        });
    }


    handleChange = (e) => {
        let nextValue = { ...this.state.info };
        nextValue[e.target.name] = e.target.value;

        this.setState({
            info: nextValue
        });
    }

    loginCheck = () => {

        const URL = '/users/login';
        const vars = {
            user_id: this.state.info.user_id,
            user_password: this.state.info.user_password
        }

        if (!this.state.info.user_id || !this.state.info.user_password) {
            return this.props.enqueueSnackbar('아이디 혹은 비밀번호를 입력해주세요.', { variant: 'warning' })
        }


        Axios.post(URL, vars)
            .then(res => {
                if (!res.data) {
                    return this.props.enqueueSnackbar('아이디 혹은 비밀번호가 틀렸습니다.', { variant: 'error' });
                } else {
                    // 로그인 성공
                    const storageItem = {
                        MEM_USERID: res.data.MEM_USERID,
                        MEM_NAME: res.data.MEM_NAME,
                        MEM_NICKNAME: res.data.MEM_NICKNAME,
                        MEM_BIRTHDAY: res.data.MEM_BIRTHDAY,
                        MEM_DEPT_NO: res.data.MEM_DEPT_NO,
                        MEM_AGE: res.data.MEM_AGE,
                        MEM_EMPNO: res.data.MEM_EMPNO,
                        MEM_MENU_APPEAR_POSITION: res.data.MEM_MENU_APPEAR_POSITION,
                    }

                    sessionStorage.setItem('member', JSON.stringify(storageItem));
                    this.props.getAuthenticated(storageItem);
                    this.props.enqueueSnackbar(`안녕하세요. ${this.props.user.member.MEM_NAME}님?`, { variant: 'success' });
                    this.props.history.push('/landing');
                }
            }).catch((err) => {
                this.props.enqueueSnackbar(`${err}`, { variant: 'error' });
            });

    }

    handleAppearYet = () => {
        this.props.enqueueSnackbar('준비중입니다.', { variant: 'warning' });
    }

    devLogin = () => {
        Axios.get('/users/login/dev')
            .then(res => {
                sessionStorage.setItem('member', JSON.stringify(res.data));
                this.props.devAuth(res.data);
                this.props.enqueueSnackbar(`안녕하세요. ${this.props.user.member.MEM_NAME}님?`, { variant: 'success' });
                this.props.history.push('/landing');
            }).catch((err) => {
                this.props.enqueueSnackbar(`${err}`, { variant: 'error' });
            });
        
    }

    render() {

        const { classes } = this.props;

        return (
            <Box className={classes.root}>
                <Grow in={this.state.awhile} >
                    <Box className={classes.logoBox + ' mobile-logo'}>
                        <img className={classes.logo} src={logo} alt="logo" />
                        <Typography variant="h2" component="h2">
                            Sign In
                        </Typography>
                    </Box>
                </Grow>
                <Grow in={this.state.awhile} style={{ transformOrigin: '0 0 0' }} timeout={this.state.awhile ? 1000 : 0}>
                    <Box className={classes.loginBox}>
                        <Typography variant="h3" component="h3" align="center">
                            {this.props.hourlyGreetings}
                        </Typography>
                        <Box>
                            <form>
                                <TextField
                                    fullWidth
                                    required
                                    variant="filled"
                                    name="user_id"
                                    label="아이디"
                                    placeholder="example"
                                    onChange={this.handleChange}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            this.loginCheck();
                                        }
                                    }}
                                />
                                <TextField
                                    style={{ marginTop: '20px' }}
                                    fullWidth
                                    required
                                    variant="filled"
                                    name="user_password"
                                    label="비밀번호"
                                    type="password"
                                    onChange={this.handleChange}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            this.loginCheck();
                                        }
                                    }}
                                />
                            </form>
                            <Box display="flex">
                                <Button
                                    className={classes.buttonMargin}
                                    fullWidth
                                    variant="contained"
                                    onClick={this.loginCheck}
                                >
                                    로그인하기
                                </Button>
                                <Button
                                    className={classes.buttonMargin}
                                    fullWidth
                                    variant="contained"
                                    onClick={this.devLogin}
                                >
                                    {/* <Link to="/register"> */}
                                    개발 환경 로그인
                                    {/* </Link> */}
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            <CopyRights />
                        </Box>
                    </Box>
                </Grow>

            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    hourlyGreetings: state.ui.hourlyGreetings,
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        getAuthenticated: (member) => { dispatch(actions.setMemberInfos(member)) },
        devAuth: (member) => { dispatch(actions.devAuth(member)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(withRouter(Login))))