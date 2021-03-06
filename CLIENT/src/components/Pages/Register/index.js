import React, { PureComponent } from 'react'
import {
    Container, Grow, Typography, withStyles,
    Box, Button, ButtonGroup
} from '@material-ui/core'
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import InputPrivacy from './InputPrivacy'
import InputWorkInfo from './InputWorkInfo';
import Success from './Success';

import * as actions from '../../../redux/action/UserInfoAction'
import FNValidator from '../../common/FNValidator';
import axios from 'axios';

const styles = theme => ({
    columnBox: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        paddingBottom: theme.spacing(2),
        backgroundColor: theme.palette.background.paper
    },
    show: {
        display: 'block',
        paddingTop: theme.spacing(4),
    },
    hide: {
        display: 'none'
    },
    center: {
        margin: "0 auto"
    },
});

const stepInfo = {
    stepsTitle: [
        "어떤 분이신가요?",
        "어떤 업무를 하시나요?",
        "완료",
    ],
    sortBy: "horizontal",
    resultComponent: ""
}


export class index extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            awhile: false,
            stepNum: 0,
            errorTextField: {
                id: false,
                password: false,
                first_name: false,
                last_name: false,
                nickName: false,
                phone: false,
                email: false
            },
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });

        if (this.props.auth || this.props.member) {
            this.props.history.push("/agency");
        }
    }

    handleClickMoveStep = param => {
        const _obj = this.props.registerMember;
        let result = Boolean;
        result = true;

        if (param > 0) {
            switch (this.state.stepNum) {

                case 0:
                    for (let item in _obj) {
                        switch (item) {

                            case "id":
                                if (!FNValidator("ID", _obj[item])) {
                                    this.props.enqueueSnackbar("ID를 확인해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            id: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            case "email":
                                if (!FNValidator("EMAIL", `${_obj.id}@${_obj[item]}`)) {
                                    this.props.enqueueSnackbar("이메일을 확인해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            email: true
                                        }
                                    });
                                    console.log(this.props.errorTextField.email);
                                    return result = false;
                                }
                                break;

                            case "idCheck":
                                if (!_obj.idCheck) {
                                    this.props.enqueueSnackbar("ID 중복 체크를 해주세요.", { variant: "warning" });
                                    return result = false;
                                }
                                break;

                            case "password":
                                if (!FNValidator("PASSWORD", _obj[item])) {
                                    this.props.enqueueSnackbar("비밀번호를 확인해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            password: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            case "passwordCheck":
                                if (_obj[item] === "") {
                                    this.props.enqueueSnackbar("비밀번호 확인란을 입력해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            password: true
                                        }
                                    });
                                    return result = false;

                                } else if (_obj[item] !== _obj.password) {
                                    this.props.enqueueSnackbar("비밀번호가 일치하지 않습니다.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            password: true
                                        }
                                    });
                                    return result = false;
                                }

                                break;

                            case "first_name":
                                if (!FNValidator("FIRST_NAME", _obj[item])) {
                                    this.props.enqueueSnackbar("성, 이름을 확인해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            first_name: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            case "last_name":
                                if (!FNValidator("LAST_NAME", _obj[item])) {
                                    this.props.enqueueSnackbar("이름을 입력해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            last_name: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            case "nickName":
                                if (!FNValidator("NICKNAME", _obj[item])) {
                                    this.props.enqueueSnackbar("닉네임은 한글, 영문만 사용 가능합니다.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            nickName: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            case "phone":
                                if (!FNValidator("PHONE", _obj[item])) {
                                    this.props.enqueueSnackbar("휴대폰 번호를 확인해주세요.", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            phone: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            default:

                                /**
                                 * @description 정규식을 거치지 않음
                                */

                                break;
                        }
                    }

                    if (result) {
                        this.setState({
                            ...this.state,
                            errorTextField: {
                                id: false,
                                password: false,
                                first_name: false,
                                last_name: false,
                                nickName: false,
                                phone: false,
                            }
                        });
                        this.props.enqueueSnackbar(`확인되었습니다.`, { variant: 'success' });
                    } else this.props.enqueueSnackbar(`알 수 없는 오류입니다.`, { variant: 'error' });

                    this.props.setRegisterMemberInfo({
                        ...this.props.registerMember,
                        dept_no: "",
                        rank_no: ""
                    })

                    break;

                case 1:
                    for (let item in _obj) {

                        switch (item) {
                            case "dept_no":
                                if (!FNValidator("DEPT_NO", _obj[item])) {
                                    this.props.enqueueSnackbar("부서를 확인해주세요.", { variant: "warning" });
                                    return result = false;
                                }
                                break;

                            case "rank_no":
                                if (!FNValidator("RANK", _obj[item])) {
                                    this.props.enqueueSnackbar("직급를 확인해주세요.", { variant: "warning" });
                                    return result = false;
                                }
                                break;

                            default:

                                /**
                                 * @description 정규식을 거치지 않음
                                 */

                                break;
                        }
                    }

                    if (result) {
                        this.props.enqueueSnackbar(`확인되었습니다.`, { variant: 'success' });
                        this.confirm();
                    }
                    else this.props.enqueueSnackbar(`알 수 없는 오류입니다.`, { variant: 'error' });

                    break;

                case 2:
                    this.props.enqueueSnackbar(`회원가입을 성공적으로 마쳤습니다.`, { variant: 'success' });
                    break;

                default:
                    console.log("error");
                    break;
            }
        } else {
            this.setState({
                stepNum: this.state.stepNum + (param)
            });
        }

        if (result === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            this.setState({
                stepNum: this.state.stepNum + (param)
            });

        }
    }

    handleIdDuplicateCheck = () => {
        const _id = this.props.registerMember.id;
        const _email = this.props.registerMember.email;

        if (!FNValidator("ID", _id)) {
            this.setState({
                ...this.state,
                errorTextField: {
                    ...this.state.errorTextField,
                    id: true
                }
            });
            return this.props.enqueueSnackbar("ID는 영문자 혹은 숫자로 5~15자로 구성해야 합니다.", { variant: "warning" });
        }

        else if (this.props.registerMember.email !== null && !FNValidator("DOMAIN", _email)) {
            this.setState({
                ...this.state,
                errorTextField: {
                    ...this.state.errorTextField,
                    email: true
                }
            });
            return this.props.enqueueSnackbar("도메인 형식이 아닙니다.", { variant: "warning" });
        }

        else {
            const URL = '/api/register/duplicateCheckId'

            axios.post(URL, this.props.registerMember)
                .then(res => {
                    if (res.data.resultCode === 1) {
                        this.props.setRegisterMemberInfo(
                            {
                                ...this.props.registerMember,
                                idCheck: true
                            }
                        );

                        this.setState({
                            ...this.state,
                            errorTextField: {
                                id: false,
                                password: false,
                                first_name: false,
                                last_name: false,
                                nickName: false,
                                phone: false,
                            }
                        });
                        return this.props.enqueueSnackbar("사용 가능한 아이디입니다.", { variant: "success" });;

                    } else if (res.data.resultCode === -1) {
                        this.setState({
                            ...this.state,
                            errorTextField: {
                                id: true,
                            }
                        });
                        return this.props.enqueueSnackbar("중복되는 아이디가 있습니다.", { variant: "warning" });
                    } else {
                        return this.props.enqueueSnackbar("예기치 못한 오류입니다.", { variant: "error" });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    confirm = async () => {

        const URL = "/api/register/signUp";
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        
        let phone = this.props.registerMember.phone;

        if (phone.match(/^[0-9]{11}/) !== null) {
            phone = `${phone.substr(0, 3)}-${phone.substr(3, 4)}-${phone.substr(7, 4)}`
        } else if (phone.match(/^[0-9]{10}/) !== null) {
            phone = `${phone.substr(0, 2)}-${phone.substr(2, 4)}-${phone.substr(6, 4)}`
        } else if (phone.match(/^[0-9]{9}/) !== null) {
            phone = `${phone.substr(0, 2)}-${phone.substr(2, 3)}-${phone.substr(5, 4)}`
        }

        const formData = new FormData();
        formData.append("avatar_file", this.props.registerMember.avatar_file);
        formData.append("avatar_name", this.props.registerMember.avatar_name !== undefined ? this.props.registerMember.avatar_name : "");
        formData.append("id", this.props.registerMember.id);
        formData.append("email", this.props.registerMember.email);
        formData.append("password", this.props.registerMember.password);
        formData.append("first_name", this.props.registerMember.first_name);
        formData.append("last_name", this.props.registerMember.last_name);
        formData.append("nickName", this.props.registerMember.nickName);
        formData.append("phone", phone);
        formData.append("rank_no", this.props.registerMember.rank_no);
        formData.append("dept_no", this.props.registerMember.dept_no);
        formData.append("reg_ip", this.props.accessInfo.IPv4);
        formData.append("upd_ip", this.props.accessInfo.IPv4);

        return axios.post(URL, formData, config)
            .then((req, res) => {
                this.props.enqueueSnackbar("회원가입이 성공하였습니다. 권한 부여가 필요합니다. 관리자에게 문의하십시오.", { variant: "success" });
            })
            .catch(err => {
                console.warn(err);
                this.props.enqueueSnackbar("오류", { variant: "error" });
            });
    }

    handleClickResetStep = () => {
        this.setState({
            stepNum: 0
        });
    }

    handleClickMoveLoginPage = () => {
        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;

        const StepByComponent = [
            // {
            //     StepNum: 1,
            //     Component: <Policy />
            // },
            {
                StepNum: 0,
                Component: <InputPrivacy handleClickMoveStep={this.handleClickMoveStep} errorTextField={this.state.errorTextField} handleIdDuplicateCheck={this.handleIdDuplicateCheck} />
            },
            {
                StepNum: 1,
                Component: <InputWorkInfo />
            },
            {
                StepNum: 2,
                Component: <Success />
            },
        ];

        return (
            <Container className={classes.columnBox} maxWidth="lg">
                {
                    StepByComponent.map((item, idx) => {
                        return (
                            <Grow
                                key={idx}
                                in={this.state.stepNum === idx}
                                {...(this.state.stepNum === idx ? { timeout: 1000 } : {})}
                                className={this.state.stepNum === idx ? classes.show : classes.hide}
                            >
                                <Box className={classes.maxHeight}>
                                    <Container>
                                        {item.Component}
                                    </Container>
                                </Box>
                            </Grow>
                        )
                    })
                }

                <Grow
                    in={this.state.awhile}
                    {...({ timeout: 1000 })}
                >
                    <Box className={classes.center}>
                        <ButtonGroup variant="contained" color="inherit">
                            <Button variant="outlined"
                                disabled={this.state.stepNum === 0 || this.state.stepNum === stepInfo.stepsTitle.length - 1}
                                onClick={() => { this.handleClickMoveStep(-1) }}>
                                <Typography>이전</Typography>
                            </Button>
                            <Button variant="outlined" onClick={this.handleClickMoveLoginPage}>
                                <Typography>메인으로</Typography>
                            </Button>
                            <Button variant="outlined" disabled={this.state.stepNum === stepInfo.stepsTitle.length - 1} onClick={() => { this.handleClickMoveStep(1) }}>
                                <Typography>다음</Typography>
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Grow>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRegisterMemberInfo: payload => { dispatch(actions.setRegisterMemberInfo(payload)) }
    }
};

const mapStateToProps = state => ({
    registerMember: state.Producer.registerMember,
    accessInfo: state.User.accessInfo,
    member: state.User.member,
    auth: state.User.auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(withRouter(index))))
