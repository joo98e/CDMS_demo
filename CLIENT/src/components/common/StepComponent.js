import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import {
    Box, Stepper, Step, StepLabel, StepContent, Typography,
} from '@material-ui/core';

/**
 * @param {stepInfo}             : Object, 
 *                                 const stepInfo = {
 *                                     stepsTitle: [
 *                                         "타이틀명1",
 *                                         "타이틀명2",
 *                                         "타이틀명3",
 *                                     ],
 *                                     stepsDesc: [
 *                                         "데스크립션1",
 *                                         "데스크립션2",
 *                                         "데스크립션3"
 *                                     ],
 *                                     sortBy: "vertical" || "horizontal",
 *                                     resultComponent: <컴포넌트 /> || ""
 *                                 }
 * 
 * @param {stepNum}              : 현재 스텝 단계 수
 * @param {stepMaxNum}           : 총 스텝 단계 수
 * 
 * @returns {<StepComponent />}
 */

class StepComponent extends PureComponent {

    componentDidMount() {
        console.log(this.props.stepMaxNum);
    }
    

    render() {
        // 색깔 고치기

        const steps = this.props.stepInfo.stepsTitle;
        const contents = this.props.stepInfo.stepsDesc;
        const resultComponent = this.props.stepInfo.resultComponent;

        return (
            <Box>
                <Stepper activeStep={this.props.stepNum} orientation={this.props.stepInfo.sortBy} >
                    {steps.map((name, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{name}</StepLabel>
                                <StepContent>
                                    <Typography>{contents[index]}</Typography>
                                </StepContent>
                            </Step>    
                        );
                    })}
                </Stepper>
                {this.props.stepMaxNum === this.props.stepNum ?
                    resultComponent
                    :
                    ''
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    color: state.ui.color
});

export default connect(mapStateToProps)(StepComponent);