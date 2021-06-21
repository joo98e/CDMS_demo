import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Container, Grid, Paper, Typography, TextField, withStyles, IconButton,
    Box, FormControl, InputLabel, Select, MenuItem, Button
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import Back from '../common/Back'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formMinWidth: {
        minWidth: 480,
        margin: theme.spacing(1),
    },
    hidden: {
        display: 'none'
    }

});

export class index extends Component {
    constructor(props) {
        super(props)

        /*
            TB_MEMBER_INFO / UTF8
            Column                  Value
            MEM_PK(*)               PK
            MEM_USERID(*)           아이디
            MEM_PASSWORD(*)         비밀번호
            MEM_TOKEN_EXP           토큰
            MEM_NAME(*)             성명
            MEM_NICKNAME            닉네임
            MEM_EMAIL               이메일 주소
            MEM_PHONE               연락처
            MEM_EMPNO               사번
            MEM_DEPT_NO             부서 코드
            MEM_RANK                직급
            MEM_AGE                 나이
            MEM_ADDRESS             주소
            MEM_FOLLOWED            팔로워 수
            MEM_IMAGE               아바타 이미지
            MEM_BIRTHDAY            생일
            MEM_REGISTER_DATETIME   가입일
            MEM_HIREDATE            입사일
        */

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
            selected: ''
        }
    }

    componentDidMount() {
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
        let nextState = {...this.state.MEM};
        nextState[e.target.name] = e.target.value;

        this.setState({
            MEM : nextState
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

    // handleFileChange = (e) => {
    //     this.setState({
    //         MEM: {
    //             ...this.state.MEM,
    //             MEM_IMAGE: e.target.files[0],
    //             MEM_IMAGE_NAME: e.target.value,
    //         }
    //     });
    // }

    SignUp = () => {

        const URL = '/register/signUp'
        const vars = {
            // MEM_IMAGE : this.state.MEM.MEM_IMAGE,
            // MEM_IMAGE_NAME : this.state.MEM.MEM_IMAGE_NAME,
            MEM_USERID : this.state.MEM.MEM_USERID,
            MEM_PASSWORD : this.state.MEM.MEM_PASSWORD,
            MEM_PASSWORD_CHECK : this.state.MEM.MEM_PASSWORD_CHECK,
            MEM_NAME : this.state.MEM.MEM_NAME,
            MEM_NICKNAME : this.state.MEM.MEM_NICKNAME,
            MEM_DEPT_NO : this.state.MEM.MEM_DEPT_NO,
            MEM_EMAIL : this.state.MEM.MEM_EMAIL,
            MEM_PHONE : this.state.MEM.MEM_PHONE,
            MEM_EMPNO : this.state.MEM.MEM_EMPNO,
            MEM_HIREDATE : this.state.MEM.MEM_HIREDATE,
            MEM_BIRTHDAY : this.state.MEM.MEM_BIRTHDAY,
        }

        // console.log(this.state.MEM.MEM_IMAGE);
        // console.log('vars', vars.MEM_IMAGE);
        return axios.post(URL, vars);
    }

    render() {
        return (
            <Container width={1280}>
                <Paper>
                    <Grid container justify='center' spacing={4}>

                        <Grid item xs={12}>
                            <Back history={this.props.history} />
                            <Typography variant="h3" component="h3" align='center'>Sign Up</Typography>
                        </Grid>

                        {/* <Grid item xs={12}>
                            <Container>
                                <Button
                                    variant={this.state.MEM.MEM_IMAGE_NAME === "" ? "outlined" : "contained"}
                                    component="label"
                                >
                                    {this.state.MEM.MEM_IMAGE_NAME === "" ? "프로필 이미지 선택" : "프로필 선택 완료!"}
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        id="imageFile"
                                        file={this.state.MEM.MEM_IMAGE}
                                        onChange={this.handleFileChange}
                                    />
                                </Button>
                            </Container>
                        </Grid> */}

                        <Grid item xs={12} sm={6}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="MEM_NAME"
                                    label="성명"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="MEM_NICKNAME"
                                    label="닉네임"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="MEM_USERID"
                                    label="ID"
                                    helperText="중복 체크 기능 필요"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Container>
                                <Box display="flex" justifyContent="flex-start" alignItems="center">
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        required
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        name="MEM_PASSWORD"
                                        label="PASSWORD"
                                        onChange={this.handleValueChange}
                                    />
                                    <Box>
                                        <IconButton
                                            onClick={this.handleChangeShowPassWord}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="MEM_EMAIL"
                                    label="이메일"
                                    placeholder="example@example.com"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    name="MEM_PHONE"
                                    label="연락처"
                                    placeholder="010 - 0000 - 0000"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    name="MEM_EMPNO"
                                    label="사번"
                                    placeholder="4자리수"
                                    onChange={this.handleValueChange}
                                    inputProps={{
                                        maxLength: 4
                                    }}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="MEM_DEPART_NO">부서</InputLabel>
                                    {this.state.departs ?
                                        <Select
                                            labelId="DEPART_SELECT"
                                            id="DEPART_SELECT"
                                            value={this.state.MEM.MEM_DEPT_NO}
                                            onChange={this.handleDepartSelect}
                                        >
                                            {this.state.departs.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.DEPART_PK}>{item.DEPART_NAME}({item.DEPART_PK})</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        :
                                        ''
                                    }
                                </FormControl>
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={this.SignUp}
                                >
                                    가입하기
                                </Button>
                            </Container>
                        </Grid>

                    </Grid>
                </Paper>
            </Container >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
