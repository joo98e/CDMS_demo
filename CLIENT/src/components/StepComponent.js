import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    bg: {
        // color: "#FFF",
        // backgroundColor: '#888888'
    }
});

class StepComponent extends PureComponent {
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
        // 색깔 고치기

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

        const { classes } = this.props;

        return (
            <Box pt={30} pl={20} pr={20}>
                <Stepper activeStep={this.state.activeStep} orientation={'vertical'} className={classes.bg}>
                    {steps.map((name, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{name}</StepLabel>
                                <StepContent>
                                    <Typography style={{marginBottom:"15px"}}>{contents[index]}</Typography>
                                    <Button onClick={this.handlePrev} disabled={this.state.activeStep === 0} size="small">PREV</Button>
                                    <Button onClick={this.handleNext} size="small">NEXT</Button>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>

                {this.state.activeStep === steps.length ?
                    <Paper className={classes.bg} square elevation={0} >
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} size="small">
                            Reset
                        </Button>
                        <Button size="small">
                            출발하기
                        </Button>
                    </Paper>
                    :
                    ''
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    color: state.ui.color
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepComponent));