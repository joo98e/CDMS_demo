import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Paper, Typography, TextField, withStyles } from '@material-ui/core'
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
            }
        }
    }

    componentDidMount() {

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

    render() {

        return (
            <Container width={1280}>
                <Paper>
                    <Grid container justify='center' spacing={6}>

                        <Grid item xs={12}>
                            <Back history={this.props.history} />
                            <Typography variant="h3" component="h3" align='center'>Sign Up</Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <TextField
                                    fullWidth
                                    required
                                    name="MEM_NAME"
                                    label="성명"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <TextField
                                    fullWidth
                                    required
                                    name="MEM_USERID"
                                    label="ID"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Container>
                                <TextField
                                    fullWidth
                                    required
                                    name="MEM_PASSWORD"
                                    label="PASSWORD"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Container>
                                <TextField
                                    fullWidth
                                    required
                                    name="MEM_PASSWORD"
                                    label="PASSWORD"
                                    onChange={this.handleValueChange}
                                />
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
