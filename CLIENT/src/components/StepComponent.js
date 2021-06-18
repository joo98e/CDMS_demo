import React, { PureComponent } from 'react'
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core';

export default class StepComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }
    }

    handlePrev = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    }

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    }

    render() {
        const steps = [
            '첫번째',
            '두번째',
            '세번째'
        ];

        const contents = [
            '가나다라마바사',
            'abcdefg',
            '12345667'
        ];

        return (
            <div>
                <Stepper activeStep={this.state.activeStep} orientation={'vertical'}>
                    {steps.map((name, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{name}</StepLabel>
                                <StepContent>
                                    <Typography>{contents[index]}</Typography>
                                    <Button onClick={this.handlePrev} disabled={this.state.activeStep === 0} variant="contained" color="default" size="small">PREV</Button>
                                    <Button onClick={this.handleNext} disabled={this.state.activeStep === steps.length} variant="contained" color="primary" size="small">NEXT</Button>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {this.state.activeStep === steps.length ?
                    <Paper square elevation={0} >
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} variant="contained" color="default" size="small">
                            Reset
                        </Button>
                        <Button onClick={this.handleReset} variant="contained" color="secondary" size="small">
                            출발하기
                        </Button>
                    </Paper>
                    :
                    ''
                }
            </div>
        )
    }
}
