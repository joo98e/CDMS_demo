import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../../redux/action/UserInfoAction'
import {
    Container, Grid, TextField, IconButton, Typography,
    Box, withStyles, Divider, Select,
    FormControl, InputLabel, InputAdornment,
} from '@material-ui/core'

import {
    VisibilityIcon,
    VisibilityOffIcon,
    CheckCircleOutlineIcon,
} from "../../common/CustomIcons";

import InputProfile from './InputProfile';
import UIButton from '../../common/UIButton';

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
            idCheck: false,
            email: 0
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

    handleChangeMailAddress = e => {
        const _val = e.target.value;

        let _result =
            _val === "0" ? "mirimmedialab.co.kr"
                : _val === "1" ? "naver.com"
                    : _val === "2" ? "daum.net"
                        : _val === "3" ? ""
                            : _val === "4" ? "nate.com" : "gmail.com"
                            
        this.props.setRegisterMemberInfo({
            ...this.props.registerMember,
            email: _result,
            idCheck : false
        });

        this.setState({
            ...this.state,
            email: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Box>
                <Box mt={8} mb={4}>
                    <Typography variant="h4" align='center'>
                        ?????? ????????????????
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
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                required
                                                name="id"
                                                label="ID"
                                                helperText="??????, ????????? ???????????? 5 ~ 15???"
                                                onChange={this.handleValueChange}
                                                error={this.props.errorTextField.id}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container style={{ display: "flex", alignItems: "center" }}>
                                                <Grid item xs={2}>
                                                    <Typography variant="h6" align="center" style={{ margin: "0 8px" }}>@</Typography>
                                                </Grid>
                                                <Grid xs={10}>
                                                    <TextField
                                                        variant="filled"
                                                        fullWidth
                                                        required
                                                        name="email"
                                                        label="e-mail"
                                                        focused
                                                        onChange={this.handleValueChange}
                                                        value={this.props.registerMember.email}
                                                        error={this.props.errorTextField.email}
                                                        inputProps={{
                                                            readOnly: this.state.email === "3" ? false : true,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box display="flex" mt={2} justifyContent="flex-start" alignItems="center">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <FormControl variant="filled" fullWidth>
                                                <InputLabel id="email">?????? ??????</InputLabel>
                                                <Select
                                                    native
                                                    value={this.state.email}
                                                    onChange={this.handleChangeMailAddress}
                                                >
                                                    <option value={0}>??????????????????</option>
                                                    <option value={1}>?????????</option>
                                                    <option value={2}>??????</option>
                                                    <option value={4}>?????????</option>
                                                    <option value={5}>??????</option>
                                                    <option value={3}>?????? ??????</option>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                            <UIButton
                                                name={this.props.registerMember.idCheck ? "?????? ????????? ??????????????????." : "????????? ?????? ??????"}
                                                variant="contained"
                                                action={this.props.handleIdDuplicateCheck}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box display="flex" mt={2} alignItems="center">

                                </Box>
                                <Box display="flex" mt={2} alignItems="center">
                                    <form className={classes.fullWidth}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            required
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="password"
                                            label="????????????"
                                            autoComplete="off"
                                            helperText="?????????, ??????, ????????????(!, @, #, $, %, &, *)??? ??? 1??? ?????? ???????????? 8 ~ 16???"
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
                                <Box display="flex" mt={2} alignItems="center">
                                    <form style={{ width: "100%" }}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            required
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="passwordCheck"
                                            label="???????????? ??????"
                                            autoComplete="off"
                                            helperText="???????????? ????????? ?????? ?????? ??? ??????????????????."
                                            error={this.props.errorTextField.password}
                                            onChange={this.handleValueChange}
                                        />
                                    </form>
                                </Box>
                                <Divider className={classes.marginBottom3} />
                                <Box display="flex" mt={2} alignItems="center">
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="first_name"
                                        label="???"
                                        placeholder="????????? ??????????????? ?????????."
                                        error={this.props.errorTextField.first_name}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                                <Box display="flex" mt={2} alignItems="center">
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="last_name"
                                        label="??????"
                                        placeholder="????????? ??????????????? ?????????."
                                        error={this.props.errorTextField.last_name}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                                <Divider className={classes.marginBottom3} />
                                <Box display="flex" mt={2} alignItems="center">
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="nickName"
                                        label="?????????"
                                        placeholder="???????????? ???????????? ??????????????? ?????????."
                                        error={this.props.errorTextField.nickName}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                                <Box display="flex" mt={2} alignItems="center">
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        required
                                        name="phone"
                                        label="?????????"
                                        error={this.props.errorTextField.phone}
                                        onChange={this.handleValueChange}
                                    />
                                </Box>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
                <Divider className={classes.marginBottom3} />
            </Box >
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
