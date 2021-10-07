
/**
 * @Ex    <StepperButtonGroup stepNum={this.state.stepNum} stepMaxNum={StepByComponent.length - 1} handleClickMoveStep={this.handleClickMoveStep} />
 * 
 * @param {props.stepNum}               : 현재 스텝
 * @param {props.stepMaxNum  }          : 총 스텝 수
 * @param {handleClickMoveStep}         : 스텝 증감 함수
 * @returns {<StepperButtonGroup />}
 */

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import {
    KeyboardArrowLeftIcon,
    KeyboardArrowRightIcon
} from "./CustomIcons"


const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        borderRadius: "8px"
    },
});

export default function StepperButtonGroup(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <MobileStepper
            variant="dots"
            color="inherit"
            steps={props.stepMaxNum + 1}
            position="static"
            activeStep={props.stepNum}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={() => { props.handleClickMoveStep(1) }} disabled={props.stepNum === props.stepMaxNum}>
                    Next
                    {theme.direction === 'rtl' ? KeyboardArrowLeftIcon : KeyboardArrowRightIcon}
                </Button>
            }
            backButton={
                <Button size="small" onClick={() => { props.handleClickMoveStep(-1) }} disabled={props.stepNum === 0}>
                    {theme.direction === 'rtl' ? KeyboardArrowRightIcon : KeyboardArrowLeftIcon}
                    Back
                </Button>
            }
        />
    );
}

