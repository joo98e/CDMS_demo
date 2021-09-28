import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    
});

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
            '알아주세요알아주세요알아주세요알아주세요알아주세요알아주세요알아주세요알아주세요.',
            '말해주세요.',
            '마지막입니다.'
        ];

        const { classes } = this.props;

        return (
            <Box>
                <Stepper activeStep={this.state.activeStep} orientation={'vertical'} className={classes.bg}>
                    {steps.map((name, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{name}</StepLabel>
                                <StepContent>
                                    <Typography style={{ marginBottom: "15px" }}>{contents[index]}</Typography>
                                    <Button onClick={this.handlePrev} disabled={this.state.activeStep === 0} size="small">PREV</Button>
                                    <Button onClick={this.handleNext} size="small">NEXT</Button>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>

                {this.state.activeStep === steps.length ?
                    <Paper square elevation={0} >
                        <Box display="flex" justifyContent="center" alignItems="space-around" pt={1} pb={4}>
                            <Button onClick={this.handleReset} size="medium">
                                처음으로
                            </Button>
                            <Link to="/login">
                                <Button size="medium">
                                    로그인하기
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button size="medium">
                                    회원가입
                                </Button>
                            </Link>
                        </Box>
                    </Paper>
                    :
                    ''
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    color: state.UI.color
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepComponent));