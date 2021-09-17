import React, { PureComponent } from 'react'
import {
    Container, Grow, Typography, withStyles,
    Box, Divider, Button, ButtonGroup
} from '@material-ui/core'
import { withRouter } from 'react-router-dom';

import Policy from './Policy'
import RegisterBox from './RegisterBox'
import StepComponent from '../../common/StepComponent'

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
        "회원 정보 입력",
        "가입 완료",
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
        this.setState({
            stepNum: this.state.stepNum + (param)
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
                Component: <RegisterBox handleClickMoveStep={this.handleClickMoveStep} />
            },
            {
                StepNum: 3,
                Component: <div>3</div>
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
                            {this.state.stepNum !== 1 ?
                                <Button color="inherit" variant="outlined" onClick={this.handleClickMoveLoginPage}>
                                    <Typography>메인으로 돌아가기</Typography>
                                </Button>
                                :
                                ""
                            }
                            <Button color="inherit" variant="outlined" onClick={() => { this.handleClickMoveStep(1) }}>
                                <Typography>다음</Typography>
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Grow>

            </Container>
        )
    }
}


export default withStyles(styles)(withRouter(index))
