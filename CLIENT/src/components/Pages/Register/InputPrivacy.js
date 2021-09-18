import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../../_actions/UserInfo'
import {
    Container, Grid, TextField, IconButton, Typography,
    Box, Button,
    withStyles,
    Divider
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const styles = theme => ({
    fullWidth: {
        width: "100%"
    },
    center: {
        margin: "0 auto"
    },
    marginBottom3: {
        marginBottom: theme.spacing(4)
    }
});

export class InputAccount extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            departs: "",
            unboot: false
        }
    }

    handleValueChange = (e) => {
        let nextState = { ...this.props.registerMember };
        nextState[e.target.name] = e.target.value;

        this.props.setRegisterMemberInfo(nextState);
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

    componentDidMount() {
        this.props.setRegisterMemberInfoInit();
    }

    render() {
        const { classes } = this.props;
        return (
            <Box >
                <Divider />

                <Box mt={8} mb={4}>
                    <Typography variant="h4" align='center'>
                        어떤 분이신가요?
                    </Typography>
                </Box>
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
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="id"
                                    label="ID"
                                    helperText="example@example.com과 같은 형식이어야 해요!"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
                                <Box display="flex" justifyContent="flex-start" alignItems="center">
                                    <form className={classes.fullWidth}>
                                        <TextField
                                            error={this.state.showPassword ? true : false}
                                            fullWidth
                                            variant="filled"
                                            required
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            name="password"
                                            label="PASSWORD"
                                            autoComplete="off"
                                            helperText="영문자, 숫자, 특수문자(!, @, #, $, %, &, *)를 각 1자 이상 포함하여 8 ~ 16자로 구성해주세요!"
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
                                    name="first_name"
                                    label="성"
                                    helperText="한글로 구성합니다."
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
                                    helperText="한글로 구성합니다."
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
                                    helperText="한글, 영문으로 구성합니다."
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
                                    helperText="-를 포함해서 입력해주세요!"
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
