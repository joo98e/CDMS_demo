import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Container, Grow, Typography, withStyles, Box, Divider } from '@material-ui/core'

import Policy from './Policy'
import RegisterBox from './RegisterBox'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh'
    },
    policyBox: {
        display: 'flex',
        width: '60%',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-around',
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper
    },
    title: {
        minHeight: '10%'
    },
    policyContent: {
        minHeight: '65%'
    },
    registerBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        height: '100vh',
        overflowY: 'scroll'
    },
});

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MEM: {
                MEM_IMAGE: null,
                MEM_IMAGE_NAME: "",
                MEM_USERID: "",
                MEM_PASSWORD: "",
                MEM_PASSWORD_CHECK: "",
                MEM_NAME: "",
                MEM_NICKNAME: "",
                MEM_DEPT_NO: "",
                MEM_EMAIL: "",
                MEM_PHONE: "",
                MEM_EMPNO: "",
                MEM_HIREDATE: "",
                MEM_BIRTHDAY: "",
            },
            showPassword: false,
            departs: "",
            selected: '',
            awhile: false
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });

        this.callApi()
            .then(res => this.setState({ departs: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        let response = await fetch('/departments');
        let departments = await response.json();
        return departments;
    }

    handleChangeShowPassWord = () => {
        this.setState({
            showPassword: !this.state.showPassword ? true : false
        });
    }

    handleValueChange = (e) => {
        let nextState = { ...this.state.MEM };
        nextState[e.target.name] = e.target.value;

        this.setState({
            MEM: nextState
        });
    }

    handleDepartSelect = (e) => {
        this.setState({
            MEM: {
                ...this.state.MEM,
                MEM_DEPT_NO: e.target.value
            }
        });
    }

    handleFileChange = (e) => {
        this.setState({
            MEM: {
                ...this.state.MEM,
                MEM_IMAGE: e.target.files[0],
                MEM_IMAGE_NAME: e.target.value,
            }
        });
    }

    SignUp = () => {
        const state = this.state.MEM;

        for (let key in state) {
            switch (key) {

                case 'MEM_USERID':
                    if (!/^[a-z0-9]{4,20}$/.test(state[key]) || state[key] === '') {
                        alert('ID는 영문, 숫자만 사용하여 4 ~ 20글자여야 합니다.');
                        return false;
                    }
                    break;

                case 'MEM_NAME':
                    if (!/^[가-힣]/.test(state[key]) && state[key].length >= 1) {
                        alert('성명은 한글만 사용 가능합니다.');
                        return false;
                    }
                    break;
                case 'MEM_NICKNAME':
                    if (!/^[가-힣a-zA-Z]+$/.test(state[key])) {
                        alert('닉네임은 한글 혹은 영문만 사용 가능합니다.');
                        return false;
                    }
                    break;

                case 'MEM_EMAIL':
                    if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(state[key])) {
                        alert('이메일 형식이 맞지 않습니다.');
                        return false;
                    }
                    break;

                case 'MEM_PHONE':
                    if (state[key] !== '') {
                        if (!/^\d{3}-\d{3,4}-\d{4}$/.test(state[key])) {
                            alert('연락처 형식이 맞지 않습니다.');
                            return false;
                        }
                    }
                    break;
                case 'MEM_EMPNO':
                    if (state[key] !== '') {
                        if (state[key].length < 4) {
                            alert('사번은 4자리로 구성됩니다.');
                            return false;
                        }
                    }
                    break;
                case 'MEM_DEPT_NO':
                    if (state[key] === '') {
                        alert('부서는 반드시 필요합니다.')
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }

        const URL = '/register/signUp'
        const vars = {
            // MEM_IMAGE : this.state.MEM.MEM_IMAGE,
            // MEM_IMAGE_NAME : this.state.MEM.MEM_IMAGE_NAME,
            MEM_USERID: this.state.MEM.MEM_USERID,
            MEM_PASSWORD: this.state.MEM.MEM_PASSWORD,
            MEM_PASSWORD_CHECK: this.state.MEM.MEM_PASSWORD_CHECK,
            MEM_NAME: this.state.MEM.MEM_NAME,
            MEM_NICKNAME: this.state.MEM.MEM_NICKNAME,
            MEM_DEPT_NO: this.state.MEM.MEM_DEPT_NO,
            MEM_EMAIL: this.state.MEM.MEM_EMAIL,
            MEM_PHONE: this.state.MEM.MEM_PHONE,
            MEM_EMPNO: this.state.MEM.MEM_EMPNO,
            MEM_HIREDATE: this.state.MEM.MEM_HIREDATE,
            MEM_BIRTHDAY: this.state.MEM.MEM_BIRTHDAY,
        }

        return axios.post(URL, vars);
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root + ' mobile-column'}>
                <Grow in={this.state.awhile} >
                    <Box className={classes.policyBox + ' mobile-column'}>
                        <Box className={classes.policyContent}>
                            <Container>
                                <Typography variant="body1">
                                    <Policy />
                                </Typography>
                            </Container>
                        </Box>
                    </Box>
                </Grow>
                <Grow in={this.state.awhile} style={{ transformOrigin: '0 0 0' }} timeout={this.state.awhile ? 1000 : 0}>
                    <Box className={classes.registerBox + ' mobile-column'}>
                        <Box mt={4} mb={4}>
                            <Typography variant="h4" align="center">
                                회원가입
                            </Typography>
                        </Box>
                        <Divider />
                        <RegisterBox />
                    </Box>
                </Grow>
            </Box >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
