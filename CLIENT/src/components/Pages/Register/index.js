import React, { PureComponent } from 'react'
import {
    Container, Grow, Typography, withStyles,
    Box, Divider, Button, ButtonGroup
} from '@material-ui/core'
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';

import StepComponent from '../../common/StepComponent'
import Policy from './Policy'
import InputAccount from './InputAccount'
import InputJobs from './InputJobs';
import Success from './Success';

import FNValidator from '../../common/FNValidator';
import { ContactSupportOutlined } from '@material-ui/icons';

const styles = theme => ({
    columnBox: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    show: {
        display: 'block'
    },
    hide: {
        display: 'none'
    },
    center: {
        margin: "0 auto"
    }
});

const stepInfo = {
    stepsTitle: [
        "이용 약관",
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
            stepNum: 0
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });
    }

    handleClickMoveStep = param => {
        let result = Boolean;
        if (param > 0) {
            switch (this.state.stepNum) {
                case 0:
                    this.props.enqueueSnackbar(`이용 약관 확인이 되었어요.`, { variant: 'info' });
                    result = true;
                    break;

                case 1:
                    // TODO Validator, result true, false
                    console.log(this.props.store.state.user.registerMember)

                    // if(FNValidator()){
                    //     this.props.enqueueSnackbar(`멋진 분이시군요!`, { variant: 'success' });
                    //     result = true;
                    // }
                    break;
                    
                case 2:
                    // TODO Validator, result true, false
                    this.props.enqueueSnackbar(`정말 멋진 업무에요!`, { variant: 'success' });
                    break;
                    
                case 3:
                    // TODO Validator, result true, false
                    this.props.enqueueSnackbar(`회원가입이 성공했어요!`, { variant: 'success' });
                    break;

                default:
                    break;
            }
        }else{
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
                Component: <InputAccount handleClickMoveStep={this.handleClickMoveStep} />
            },
            {
                StepNum: 3,
                Component: <InputJobs />
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
                            <Button color="inherit" variant="outlined" disabled={this.state.stepNum === 0} onClick={() => { this.handleClickMoveStep(-1) }}>
                                <Typography>이전</Typography>
                            </Button>
                            <Button color="inherit" variant="outlined" onClick={this.handleClickMoveLoginPage}>
                                <Typography>메인으로 돌아가기</Typography>
                            </Button>
                            <Button color="inherit" variant="outlined" disabled={this.state.stepNum === stepInfo.stepsTitle.length - 1} onClick={() => { this.handleClickMoveStep(1) }}>
                                <Typography>다음</Typography>
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Grow>

            </Container>
        )
    }
}

export default withSnackbar(withStyles(styles)(withRouter(index)))
