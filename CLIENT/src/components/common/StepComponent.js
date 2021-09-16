import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    
});


    // horizontal , Vertical

class StepComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            valueError: {
                id: false,
                password: false
            }
        }
    }

    componentDidMount() {
        console.log(this.props.stepInfo);
    }

    render() {
        // 색깔 고치기

        const steps = this.props.stepInfo.stepsTitle;
        const contents = this.props.stepInfo.stepsDesc;
        const resultComponent = this.props.stepInfo.resultComponent;
        const { classes } = this.props;

        return (
            <Box>
                <Stepper activeStep={this.props.stepNum} orientation={this.props.stepInfo.sortBy} className={classes.bg}>
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
                {this.state.activeStep === steps.length - 1 ?
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
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepComponent));