import React, { PureComponent } from 'react'
import {
    Container, Grow, Typography, withStyles,
    Box, Divider, Button, ButtonGroup
} from '@material-ui/core'
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import StepComponent from '../../common/StepComponent'
import Policy from './Policy'
import InputPrivacy from './InputPrivacy'
import InputWorkInfo from './InputWorkInfo';
import Success from './Success';

import * as actions from '../../../_actions/UserInfo'
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
        "이용약관",
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
            },
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });
    }

    handleClickMoveStep = param => {
        const _obj = this.props.registerMember;
        let result = Boolean;
        result = true;

        if (param > 0) {
            console.log(_obj);
            console.log(_obj.idCheck);
            switch (this.state.stepNum) {
                case 0:
                    this.props.enqueueSnackbar(`이용약관 확인이 되었어요.`, { variant: 'info' });
                    break;

                case 1:
                    for (let item in _obj) {

                        switch (item) {

                            case "id":
                                if (!FNValidator("ID", _obj[item])) {
                                    this.props.enqueueSnackbar("ID는 이메일 형식이에요!", { variant: "warning" });
                                    this.setState({
                                        ...this.state,
                                        errorTextField: {
                                            id: true
                                        }
                                    });
                                    return result = false;
                                }
                                break;

                            case "idCheck":
                                console.log(_obj.idCheck);
                                if (!_obj.idCheck) {
                                    this.props.enqueueSnackbar("ID 중복 체크를 해주세요.", { variant: "warning" });
                                    return result = false;
                                }
                                break;

                            case "password":
                                if (!FNValidator("PASSWORD", _obj[item])) {
                                    this.props.enqueueSnackbar("비밀번호를 확인해주세요!", { variant: "warning" });
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
                                    this.props.enqueueSnackbar("성, 이름을 확인해주세요!", { variant: "warning" });
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
                                    this.props.enqueueSnackbar("이름을 입력해주세요!", { variant: "warning" });
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
                                    this.props.enqueueSnackbar("닉네임은 한글, 영문만 사용 가능해요!", { variant: "warning" });
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
                                    this.props.enqueueSnackbar("번호는 꼭 필요해요!", { variant: "warning" });
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
                        this.props.enqueueSnackbar(`멋진 분이시군요!`, { variant: 'success' });
                    } else this.props.enqueueSnackbar(`오류입니다!`, { variant: 'error' });

                    break;

                case 2:
                    for (let item in _obj) {

                        switch (item) {
                            case "dept_no":
                                if (!FNValidator("DEPT_NO", _obj[item])) {
                                    this.props.enqueueSnackbar("부서는 반드시 필요해요!", { variant: "warning" });
                                    return result = false;
                                }
                                break;

                            case "rank_no":
                                if (!FNValidator("RANK", _obj[item])) {
                                    this.props.enqueueSnackbar("직급은 반드시 필요해요!", { variant: "warning" });
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
                        this.props.enqueueSnackbar(`정말 멋진 업무에요!`, { variant: 'success' });
                        this.confirm();
                    }
                    else this.props.enqueueSnackbar(`오류입니다!`, { variant: 'error' });

                    break;

                case 3:
                    this.props.enqueueSnackbar(`회원가입이 성공했어요!`, { variant: 'success' });
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
        if (!FNValidator("id", this.props.registerMember.id)) {
            return this.props.enqueueSnackbar("ID는 이메일 형식입니다.", { variant: "warning" });
        } else {
            const URL = 'api/register/duplicateCheckId'
    
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

                        return this.props.enqueueSnackbar("회원가입이 가능한 아이디입니다.", { variant: "success" });;
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

        const URL = "api/register/signUp";
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }

        const formData = new FormData();
        formData.append("avatar_file", this.props.registerMember.avatar_file);
        formData.append("id", this.props.registerMember.id);
        formData.append("password", this.props.registerMember.password);
        formData.append("first_name", this.props.registerMember.first_name);
        formData.append("last_name", this.props.registerMember.last_name);
        formData.append("nickName", this.props.registerMember.nickName);
        formData.append("phone", this.props.registerMember.phone);
        formData.append("rank_no", this.props.registerMember.rank_no);
        formData.append("dept_no", this.props.registerMember.dept_no);
        formData.append("reg_ip", this.props.accessInfo.IPv4);
        formData.append("upd_ip", this.props.accessInfo.IPv4);
        formData.append("country_name", this.props.accessInfo.country_name);
        formData.append("country_code", this.props.accessInfo.country_code);

        return axios.post(URL, formData, config)
            .then((req, res) => {
                this.props.enqueueSnackbar("회원가입이 성공하였습니다. 권한을 부여받아주세요.", { variant: "success" });
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
            {
                StepNum: 1,
                Component: <Policy />
            },
            {
                StepNum: 2,
                Component: <InputPrivacy handleClickMoveStep={this.handleClickMoveStep} errorTextField={this.state.errorTextField} handleIdDuplicateCheck={this.handleIdDuplicateCheck} />
            },
            {
                StepNum: 3,
                Component: <InputWorkInfo />
            },
            {
                StepNum: 4,
                Component: <Success />
            },
        ];

        return (
            <Container className={classes.columnBox} maxWidth="lg">

                <StepComponent stepInfo={stepInfo} stepNum={this.state.stepNum} stepMaxNum={StepByComponent.length - 1} />

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
                            <Button variant="outlined" disabled={this.state.stepNum === 0 || this.state.stepNum === stepInfo.stepsTitle.length - 1} onClick={() => { this.handleClickMoveStep(-1) }}>
                                <Typography>이전</Typography>
                            </Button>
                            <Button variant="outlined" onClick={this.handleClickMoveLoginPage}>
                                <Typography>메인으로 돌아가기</Typography>
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
    registerMember: state.user.registerMember,
    accessInfo : state.user.accessInfo
});
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(withRouter(index))))
