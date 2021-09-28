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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, TextField } from '@material-ui/core'
import SignUp from './SignUp'
import SignIn from './SignIn'

export class loginGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : '',
            password : ''
        }
    }

    handleValueChange = (e) => {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    render() {
        return (
            <Box pb={3}>
                <Box display="flex" justifyContent="center">
                    <TextField
                        autoFocus={true}
                        component="p"
                        required
                        name="id"
                        label="ID"
                        onChange={this.handleValueChange}
                    />
                </Box>
                <Box display="flex" justifyContent="center" pt={1}>
                    <TextField
                        component="p"
                        required
                        name="password"
                        label="password"
                        onChange={this.handleValueChange}
                    />
                </Box>
                <Box display="flex" justifyContent="center" pt={2}>
                    <SignUp />
                    <SignIn id={this.state.id} password={this.state.password}/>
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(loginGroup)
