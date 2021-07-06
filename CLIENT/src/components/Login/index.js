import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import * as actions from '../../actions/UserInfo'
import CopyRights from '../common/CopyRights'
import logo from '../../_logo/logo.svg'

import { Box, Button, TextField, withStyles, Typography } from '@material-ui/core'

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
        height: '100vh'
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
            info: {}
        }
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
            return alert('아이디 혹은 비밀번호를 입력해주세요.')
        }

        Axios.post(URL, vars)
            .then(res => {
                if (!res.data) {
                    return alert('아이디 혹은 비밀번호가 틀렸습니다.');
                } else {
                    // 로그인 성공
                    console.log(res.data, `로그인 성공, 이름이 ${res.data.MEM_NAME} 이시군요?`);
                    
                    localStorage.setItem('member', JSON.stringify(res.data));
                    this.props.getAuthenticated(res.data);
                    
                    console.log('member is', this.props.user.member);
                }
            });

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
                            >
                                <Link to="/register">
                                    회원가입하기
                                </Link>
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        <CopyRights />
                    </Box>
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
    hourlyGreetings: state.ui.hourlyGreetings,
    user : state.user
})

const mapDispatchToProps = dispatch => {
    return{
        getAuthenticated : (member) => {dispatch(actions.setMemberInfos(member))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
