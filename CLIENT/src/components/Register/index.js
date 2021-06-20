import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container, Grid, Paper, Typography, TextField, withStyles, IconButton,
    Box, FormControl, FormHelperText, InputLabel, Select, MenuItem
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
    }

});

export class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            MEM: {
                MEM_IMAGE: null,
                MEM_USERID: null,
                MEM_PASSWORD: null,
                MEM_PASSWORD_CHECK: null,
                MEM_NAME: null,
                MEM_NICKNAME: null,
                MEM_EAMIL: null,
                MEM_PHONE: null,
                MEM_EMPNO: null,
                MEM_HIREDATE: null,
                MEM_BIRTHDAY: null,
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
        console.log(departments);
        return departments;
    }

    /*
        TB_MEMBER_INFO / UTF8
        Column                  Value
        MEM_PK(*)               PK
        MEM_USERID(*)           아이디
        MEM_PASSWORD(*)         비밀번호
        MEM_TOKEN_EXP           토큰
        MEM_NAME(*)             성명
        MEM_NICKNAME            닉네임
        MEM_EAMIL               이메일 주소
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

    handleChangeShowPassWord = () => {
        this.setState({
            showPassword: !this.state.showPassword ? true : false
        });
    }

    handleValueChange = (type) => {

    }

    handleDepartSelect = (e) => {
        this.setState({
            selected: e.target.value
        });
    }

    render() {
        const classes = this.props;

        return (
            <Container width={1280}>
                <Paper>
                    <Grid container justify='center' spacing={4}>

                        <Grid item xs={12}>
                            <Back history={this.props.history} />
                            <Typography variant="h3" component="h3" align='center'>Sign Up</Typography>
                        </Grid>

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
                                    name="MEM_BIRTHDAY"
                                    label="생년월일"
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
                                            value={this.state.selected}
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
