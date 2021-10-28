import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../../redux/action/UserInfoAction'
import {
    Container, Grid, TextField, IconButton, Typography,
    Box, withStyles, Divider
} from '@material-ui/core'

import {
    VisibilityIcon,
    VisibilityOffIcon,
    RadioButtonUncheckedIcon,
    CheckCircleOutlineIcon,
} from "../../common/CustomIcons";

import InputProfile from './InputProfile';

const styles = theme => ({
    fullWidth: {
        width: "100%"
    },
    center: {
        margin: "0 auto"
    },
    marginBottom3: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    iconMargin: {
        marginLeft: theme.spacing(1)
    },
    mainAvatar: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        margin: '0 auto',
    },
    setAvatarBtn: {
        display: 'block',
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
    profileDialog: {
        display: 'block',
        minHeight: '90vh'
    },
    completeBtn: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(2)
    },
    mt: {
        display: 'block',
        margin: '0 auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    mb: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    fixed: {
        position: 'fixed',
    }
});

export class InputAccount extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            departs: "",
            idCheck: false
        }
    }

    componentDidMount() {
        this.props.setRegisterMemberInfoInit();
    }

    handleValueChange = (e) => {
        let nextState = { ...this.props.registerMember };
        nextState[e.target.name] = e.target.value;

        this.props.setRegisterMemberInfo(nextState);

        if (e.target.name.toLowerCase() === 'id') {
            this.props.setRegisterMemberInfo({
                ...nextState,
                idCheck: false
            });
        }
    }

    handleChangeShowPassWord = () => {
        this.setState({
            showPassword: !this.state.showPassword ? true : false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Box>
                <Box mt={8} mb={4}>
                    <Typography variant="h4" align='center'>
                        개인 정보 입력
                    </Typography>
                </Box>
                <Divider />
                <Container className={classes.marginBottom3}>
                    <Grid container justifyContent='center' spacing={4}>
                        <Grid item xs={12}>
                            <InputProfile
                                classes={classes}
                                registerMember={this.props.registerMember}
                                setRegisterMemberInfo={this.props.setRegisterMemberInfo}
                                setRegisterMemberInfoInit={this.props.setRegisterMemberInfoInit}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Container maxWidth="sm">
                                <Box display="flex" justifyContent="flex-start" alignItems="center">
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="id"
                                        label="ID"
                                        placeholder="example@example.com"
                                        onChange={this.handleValueChange}
                                        error={this.props.errorTextField.id}
                                    />
                                </Box>
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <Typography variant="body1">
                                        아이디 중복 체크
                                    </Typography>
                                    <IconButton
                                        color="inherit"
                                        className={classes.iconMargin}
                                        onClick={this.props.handleIdDuplicateCheck}
                                    >
                                        {this.props.registerMember.idCheck ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                                    </IconButton>
                                </Box>
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <form className={classes.fullWidth}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            required
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="password"
                                            label="비밀번호"
                                            autoComplete="off"
                                            placeholder="영문자, 숫자, 특수문자(!, @, #, $, %, &, *)를 각 1자 이상 포함하여 8 ~ 16자"
                                            error={this.props.errorTextField.password}
                                            onChange={this.handleValueChange}
                                        />
                                    </form>
                                    <IconButton
                                        color="inherit"
                                        className={classes.iconMargin}
                                        onClick={this.handleChangeShowPassWord}
                                    >
                                        {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </Box>
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <form style={{ width: "100%" }}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            required
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="passwordCheck"
                                            label="비밀번호 확인"
                                            autoComplete="off"
                                            helperText="비밀번호 확인을 위해 한번 더 입력해주세요."
                                            error={this.props.errorTextField.password}
                                            onChange={this.handleValueChange}
                                        />
                                    </form>
                                </Box>
                                <Divider className={classes.marginBottom3} />
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="first_name"
                                        label="성"
                                        placeholder="한글로 구성하셔야 합니다."
                                        error={this.props.errorTextField.first_name}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="last_name"
                                        label="이름"
                                        placeholder="한글로 구성하셔야 합니다."
                                        error={this.props.errorTextField.last_name}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                                <Divider className={classes.marginBottom3} />
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="nickName"
                                        label="닉네임"
                                        placeholder="한글, 영문으로 구성하셔야 합니다."
                                        error={this.props.errorTextField.nickName}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                                <Box display="flex" mt={2} style={{ alignItems: "center" }}>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="phone"
                                        label="휴대폰"
                                        error={this.props.errorTextField.phone}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
                <Divider className={classes.marginBottom3} />
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    registerMember: state.Producer.registerMember
});

const mapDispatchToProps = dispatch => {
    return {
        setRegisterMemberInfo: payload => { dispatch(actions.setRegisterMemberInfo(payload)) },
        setRegisterMemberInfoInit: () => { dispatch(actions.setRegisterMemberInfoInit()) }
    }
};

export default
    connect(mapStateToProps, mapDispatchToProps)
        ((withRouter
            (withStyles(styles)
                (InputAccount)
            )
        ));
