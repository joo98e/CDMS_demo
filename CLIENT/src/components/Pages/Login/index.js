import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import * as actions from '../../../redux/action/UserInfoAction'
import { withSnackbar } from 'notistack'

import { Box, Button, TextField, withStyles, Grow, Container, Grid } from '@material-ui/core'

const styles = theme => ({
    root: {
        maxWidth : "100vw",
        paddingTop: theme.spacing(24),
        overflow : "hidden"
    },
    logo: {
        width: theme.spacing(48),
    },
    buttonMargin: {
        marginBottom: theme.spacing(2)
    },
    container: {
        width : theme.spacing(64)
    }
});


export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            info: {},
            awhile: false,
            isDev: false
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
        this.setState({ ...this.state, info: nextValue });
    }

    loginCheck = () => {

        const URL = '/api/member/login';
        const vars = {
            id: this.state.info.id,
            password: this.state.info.password
        }

        if (!this.state.info.id || !this.state.info.password) {
            return this.props.enqueueSnackbar('아이디 혹은 비밀번호를 입력해주세요.', { variant: 'warning' })
        }

        Axios.post(URL, vars)
            .then(res => {
                if (res.data.resultCode === -2 || res.data.resultCode === -3) {
                    return this.props.enqueueSnackbar('아이디 혹은 비밀번호가 틀렸습니다.', { variant: 'error' });
                } else {
                    if (res.data.resultCode === -1) {
                        // 권한이 없는 아이디
                        return this.props.enqueueSnackbar(res.data.resultMessage, { variant: 'error' });
                    }
                    // 로그인 성공
                    const storageItem = {
                        seq: res.data.seq,
                        ref_auth_type: res.data.ref_auth_type,
                        ref_auth_id: res.data.ref_auth_id,
                        ref_allow_action: res.data.ref_allow_action,
                        id: res.data.id,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        nickname: res.data.nickname,
                        phone: res.data.phone,
                        dept_no: res.data.dept_no,
                        rank_no: res.data.rank_no,
                        followed: res.data.followed,
                        avatar_name: res.data.avatar_name,
                        avatar_path: res.data.avatar_path
                    }

                    localStorage.setItem('member', JSON.stringify(storageItem));
                    this.props.getAuthenticated(storageItem);
                    this.props.enqueueSnackbar(`안녕하세요. ${this.props.user.member.nickname}님?`, { variant: 'success' });
                    this.props.history.push('/agency');
                }
            }).catch((err) => {
                this.props.enqueueSnackbar(`${err}`, { variant: 'error' });
            });

    }

    devLogin = () => {
        Axios.get('/api/member/login/dev')
            .then(res => {
                localStorage.setItem('member', JSON.stringify(res.data));
                this.props.devAuth(res.data);
                this.props.enqueueSnackbar(`개발`, { variant: 'success' });
                this.props.history.push('/agency');
            }).catch((err) => {
                this.props.enqueueSnackbar(`${err}`, { variant: 'error' });
            });

    }

    pushRegister = () => {
        this.props.history.push('/register');
    }

    render() {

        const { classes } = this.props;

        return (
            <Container className={classes.container}>
                <Grow in={this.state.awhile} style={{ transformOrigin: '0 0 0' }} timeout={this.state.awhile ? 1000 : 0}>
                    <Grid className={classes.root} container spacing={3}>
                        <Grid item xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
                            <img className={classes.logo} src='/static/common/logo/logo.svg' alt="미림미디어랩 CDMS" />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <form>
                                <TextField
                                    fullWidth
                                    required
                                    variant="filled"
                                    name="id"
                                    label="아이디"
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
                                    name="password"
                                    label="비밀번호"
                                    type="password"
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            this.loginCheck();
                                        }
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button
                                className={classes.buttonMargin}
                                fullWidth
                                variant="outlined"
                                onClick={this.loginCheck}
                                color="inherit"
                            >
                                로그인하기
                            </Button>
                            <Button
                                className={classes.buttonMargin}
                                fullWidth
                                variant="outlined"
                                onClick={this.pushRegister}
                                color="inherit"
                            >
                                회원가입
                            </Button>
                            {
                                !this.props.isProd &&
                                <Button
                                    className={classes.buttonMargin}
                                    fullWidth
                                    variant="outlined"
                                    onClick={this.devLogin}
                                    color="inherit"
                                >
                                    개발 환경 로그인
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grow>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User,
    theme: state.UI.theme,
    isProd: state.UI.isProd
})

const mapDispatchToProps = dispatch => {
    return {
        getAuthenticated: (member) => { dispatch(actions.setMemberInfos(member)) },
        devAuth: (member) => { dispatch(actions.devAuth(member)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(withStyles(styles)(Login))))