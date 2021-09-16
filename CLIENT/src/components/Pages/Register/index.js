import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
    Container, Grow, Typography, withStyles,
    Box, Divider, Button, ButtonGroup
} from '@material-ui/core'

import Policy from './Policy'
import RegisterBox from './RegisterBox'
import StepComponent from '../../common/StepComponent'



const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    maximumHorizon: {
        minWidth: '100%'
    },
    maximumVertical: {
        minHeight: '100%'
    },
    policyContent: {
        minHeight: '65%'
    },
    registerBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        height: '100vh',
        overflowY: 'scroll'
    },
    columnBox: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper
    },
    show: {
        display: 'block'
    },
    hide: {
        display: 'none'
    }
});

const stepInfo = {
    stepsTitle: [
        "이용 약관",
        "회원 정보 입력",
        "가입 완료",
    ],
    stepsDesc: [
        "",
        "",
        ""
    ],
    sortBy: "horizontal",
    resultComponent: <div>123</div>
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
        console.log(this.state.stepNum);
    }

    handleClickResetStep = () => {
        this.setState({
            stepNum: 1
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.columnBox} maxWidth="lg">

                <StepComponent stepInfo={stepInfo} stepNum={this.state.stepNum} />

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

                <ButtonGroup>
                    <Button variant="contained" disabled={this.state.stepNum === 0} onClick={() => { this.handleClickMoveStep(-1) }}>이전</Button>
                    <Button variant="contained" disabled={this.state.stepNum === StepByComponent.length - 1} onClick={() => { this.handleClickMoveStep(1) }}>다음</Button>
                </ButtonGroup>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
