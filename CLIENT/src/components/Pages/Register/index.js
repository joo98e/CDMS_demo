import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
    Container, Grow, Typography, withStyles,
    Box, Divider, Button, ButtonGroup
} from '@material-ui/core'

import Policy from './Policy'
import RegisterBox from './RegisterBox'
import StepComponent from '../../common/StepComponent'
import StepperButtonGroup from '../../common/StepperButtonGroup'



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
        minWidth : theme.spacing(48),
        margin : "0 auto"
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

const StepByComponent = [
    {
        StepNum: 1,
        Component: <Policy />
    },
    {
        StepNum: 2,
        Component: <RegisterBox />
    },
    {
        StepNum: 3,
        Component: <div>3</div>
    },
];

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

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.columnBox} maxWidth="lg">

                <StepComponent stepInfo={stepInfo} stepNum={this.state.stepNum} stepMaxNum={StepByComponent.length - 1 }/>

                {
                    StepByComponent.map((item, idx) => {
                        return (
                            <Grow
                                key={idx}
                                in={this.state.stepNum === idx}
                                {...(this.state.stepNum === idx ? { timeout: 1000 } : {})}
                                className={this.state.stepNum === idx ? classes.show : classes.hide}
                            >
                                <Box>
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
                        <StepperButtonGroup stepNum={this.state.stepNum} stepMaxNum={StepByComponent.length - 1} handleClickMoveStep={this.handleClickMoveStep} />
                    </Box>
                </Grow>

            </Container>
        )
    }
}


export default withStyles(styles)(index)
