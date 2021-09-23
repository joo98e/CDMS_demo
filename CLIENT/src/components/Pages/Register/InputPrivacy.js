import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../../_actions/UserInfo'
import {
    Container, Grid, TextField, IconButton, Typography,
    Box, Button, withStyles, Divider
} from '@material-ui/core'
import {
    Visibility, VisibilityOff, RadioButtonUnchecked, CheckCircleOutline
} from '@material-ui/icons'
import axios from 'axios';

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
            console.log(this.props.registerMember.idCheck);
        }
    }

    handleFileChange = (e) => {
        let nextState = { ...this.props.registerMember };
        nextState.avatar_file = e.target.files[0];
        nextState.avatar_name = e.target.value;
        this.props.setRegisterMemberInfo(nextState);
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
                        어떤 분이신가요?
                    </Typography>
                </Box>
                <Divider />
                <Container className={classes.marginBottom3}>
                    <Grid container justifyContent='center' spacing={4}>
                        <Grid item xs={12}>
                            <Container>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    color="inherit"
                                >
                                    <Typography
                                        color={!this.props.registerMember.avatar_file ? "textPrimary" : "textSecondary"}
                                    >
                                        {!this.props.registerMember.avatar_file ? "프로필 이미지 선택" : "프로필 선택 완료!"}
                                    </Typography>

                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        file={this.props.registerMember.avatar_file}
                                        onChange={this.handleFileChange}
                                    />
                                </Button>
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
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
                                    <IconButton
                                        color="inherit"
                                        className={classes.iconMargin}
                                        onClick={this.props.handleIdDuplicateCheck}
                                    >
                                        {this.props.registerMember.idCheck ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
                                    </IconButton>
                                </Box>
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
                                <Box display="flex" justifyContent="flex-start" alignItems="center">
                                    <form className={classes.fullWidth}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            required
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="password"
                                            label="PASSWORD"
                                            autoComplete="off"
                                            placeholder="영문자, 숫자, 특수문자(!, @, #, $, %, &, *)를 각 1자 이상 포함하여 8 ~ 16자로 구성해주세요."
                                            error={this.props.errorTextField.password}
                                            onChange={this.handleValueChange}
                                        />
                                    </form>
                                    <IconButton
                                        color="inherit"
                                        className={classes.iconMargin}
                                        onClick={this.handleChangeShowPassWord}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </Box>
                            </Container>
                        </Grid>
                        <Grid item xs={12}>
                            <Container>
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
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
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
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
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
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="phone"
                                    label="연락처"
                                    placeholder="000-0000-0000"
                                    error={this.props.errorTextField.phone}
                                    onChange={this.handleValueChange}
                                />
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
    registerMember: state.user.registerMember
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
