import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import {
    Container, Grid, TextField, IconButton,
    Box, FormControl, InputLabel, Select, MenuItem, Button
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { withSnackbar } from 'notistack'

import FNValidator from '../../common/FNValidator';

export class index extends PureComponent {
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
                MEM_ID_CHECK: false,
            },
            showPassword: false,
            departs: "",
            unboot: false
        }
    }

    componentWillUnmount() {
        this.setState({ unboot: true });
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ departs: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        let response = await fetch('/api/departments');
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

    handleEnqueueSnackbar = (msg, type) => {
        this.props.enqueueSnackbar(msg, type);
    }

    hasConfirmed = () => {
        const URL = "/api/register/signUp"
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        const formData = new FormData();
        formData.append('MEM_IMAGE', this.state.MEM.MEM_IMAGE);
        formData.append('MEM_IMAGE_NAME', this.state.MEM.MEM_IMAGE_NAME);
        formData.append('MEM_USERID', this.state.MEM.MEM_USERID);
        formData.append('MEM_PASSWORD', this.state.MEM.MEM_PASSWORD);
        formData.append('MEM_PASSWORD_CHECK', this.state.MEM.MEM_PASSWORD_CHECK);
        formData.append('MEM_NAME', this.state.MEM.MEM_NAME);
        formData.append('MEM_NICKNAME', this.state.MEM.MEM_NICKNAME);
        formData.append('MEM_DEPT_NO', this.state.MEM.MEM_DEPT_NO);
        formData.append('MEM_EMAIL', this.state.MEM.MEM_EMAIL);
        formData.append('MEM_PHONE', this.state.MEM.MEM_PHONE);
        formData.append('MEM_EMPNO', this.state.MEM.MEM_EMPNO);
        formData.append('MEM_HIREDATE', this.state.MEM.MEM_HIREDATE);
        formData.append('MEM_BIRTHDAY', this.state.MEM.MEM_BIRTHDAY);

        return axios.post(URL, formData, config)
            .then((res, req) => {
                this.setState({
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
                    MEM_ID_CHECK: false,
                });
                this.props.enqueueSnackbar('회원가입이 완료되었습니다.', 'success');
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            });
    }

    valueChecking = () => {

        const state = this.state.MEM;

        for (let key in state) {
            switch (key) {
                case "MEM_IMAGE":

                    break;
                case "MEM_IMAGE_NAME":

                    break;

                case "MEM_PASSWORD":

                    break;
                case "MEM_PASSWORD_CHECK":

                    break;
                case "MEM_HIREDATE":

                    break;
                case "MEM_BIRTHDAY":

                    break;
                case "MEM_ID_CHECK":
                    //     if (state[key] === false) {
                    //         alert('ID 중복 체크가 필요합니다.', 'warning');
                    //         return false;
                    //     }

                    break;

                case "MEM_USERID":
                    if (!FNValidator("id", state[key])) {
                        this.props.enqueueSnackbar('ID는 영문, 숫자만 사용하여 4 ~ 20글자여야 합니다.', 'warning');
                        return false;
                    }
                    break;

                case "MEM_NAME":
                    if (!FNValidator('name', state[key])) {
                        this.props.enqueueSnackbar('성명은 한글만 사용 가능합니다.', 'warning');
                        return false;
                    }
                    break;
                case "MEM_NICKNAME":
                    if (!FNValidator('nickname', state[key])) {
                        this.props.enqueueSnackbar('닉네임은 한글 혹은 영문만 사용 가능합니다.', 'warning');
                        return false;
                    }
                    break;

                case "MEM_EMAIL":
                    if (!FNValidator('email', state[key])) {
                        this.props.enqueueSnackbar('이메일 형식이 맞지 않습니다.', 'warning');
                        return false;
                    }
                    break;

                case "MEM_PHONE":
                    if (state[key] !== '') {
                        if (!FNValidator('phone', state[key])) {
                            this.props.enqueueSnackbar('연락처 형식이 맞지 않습니다.', 'warning');
                            return false;
                        }
                    }
                    break;
                case "MEM_EMPNO":
                    if (state[key] !== '') {
                        if (!FNValidator('empno', state[key])) {
                            this.props.enqueueSnackbar('사번은 4자리로 구성됩니다.', 'warning');
                            return false;
                        }
                    }
                    break;

                case "MEM_DEPT_NO":
                    if (state[key] === '') {
                        this.props.enqueueSnackbar('부서는 반드시 필요합니다.', 'warning');
                        return false;
                    }
                    break;


                default:

                    break;
            }
        }

        this.hasConfirmed();

    }

    render() {
        return (
            <Box mt={8} mb={12}>
                {
                    !this.state.unboot &&
                    <Container>
                        <Grid container justifyContent='center' spacing={4}>
                            <Grid item xs={12}>
                                <Container>
                                    <Button
                                        variant={this.state.MEM.MEM_IMAGE_NAME === "" ? "outlined" : "contained"}
                                        component="label"
                                        color="inherit"
                                    >
                                        {this.state.MEM.MEM_IMAGE_NAME === "" ? "프로필 이미지 선택" : "프로필 선택 완료!"}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            file={this.state.MEM.MEM_IMAGE}
                                            onChange={this.handleFileChange}
                                        />
                                    </Button>
                                </Container>
                            </Grid>

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
                                <Container>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="MEM_USERID"
                                        label="ID"
                                        helperText="중복 체크 기능 필요"
                                        placeholder="영문, 숫자만 사용하여 4 ~ 20자 이내"
                                        onChange={this.handleValueChange}
                                    />
                                </Container>
                            </Grid>

                            <Grid item xs={12}>
                                <Container>
                                    <Box display="flex" justifyContent="flex-start" alignItems="center">
                                        {/* TODO  가로 100%*/}
                                        <form>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                required
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                name="MEM_PASSWORD"
                                                label="PASSWORD"
                                                autoComplete="off"
                                                onChange={this.handleValueChange}
                                            />
                                        </form>
                                        <Box>
                                            <IconButton
                                                color="inherit"
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

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
                                <Container>
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="MEM_DEPART_NO">부서 *</InputLabel>
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

                            <Grid item xs={12}>
                                <Container>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        onClick={this.valueChecking}
                                    >
                                        가입하기
                                    </Button>
                                </Container>
                            </Grid>

                        </Grid>
                    </Container >
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)((withRouter(withSnackbar(index))))
