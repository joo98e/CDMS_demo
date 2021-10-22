/** 
 * @param {title}             
 *                          표시될 타이틀명 / props로 전달 되지 않는다면 표시되지 않음
 * @param {defaultValue}
 *                          기본으로 가질 값 
 * @param {minValue}
 *                          최소값        
 * @param {maxValue}
 *                          최대값
 * @param {resultAction}
 *                          액션 / 첫번째 인자로 value를 받을 수 있음
 * @returns {UISlider}
 */

import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    Box, makeStyles, Typography, withStyles, Slider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "50%",
    },
    mb2: {
        marginBottom: theme.spacing(2)
    },
}));

const MySlider = withStyles(theme => ({
    root: {
        color: theme.palette.slider.background,
        height: theme.spacing(1),
        margin: theme.spacing(2),
    },
    thumb: {
        height: theme.spacing(3),
        width: theme.spacing(3),
        backgroundColor: theme.palette.slider.ball,
        border: '2px solid ' + theme.palette.slider.ballBorder,
        marginTop: theme.spacing(-1),
        marginLeft: theme.spacing(-1.5),
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: theme.spacing(1),
        borderRadius: theme.spacing(.5),
    },
    rail: {
        height: theme.spacing(1),
        borderRadius: theme.spacing(.5),
    },
}))(Slider);

export const UISlider = (props) => {
    const [curValue, setValue] = useState();
    const classes = useStyles();

    const handleChangeValue = (e, value) => {
        switch (e.type) {
            case "mousemove":
                setValue(value);
                break;

            case "mouseup":
                setValue(value);

                props.resultAction && props.resultAction(value);
                break;

            default:
                break;
        }
    }

    return (
        <Box className={classes.root}>
            {
                props.title &&
                <Typography className={classes.mb2} variant="h6">
                    {props.title}
                </Typography>
            }
            <MySlider
                defaultValue={props.defaultValue}
                valueLabelDisplay="auto"
                className={`${classes.mauto}`}
                min={props.minValue}
                max={props.maxValue}
                onChange={handleChangeValue}
                onChangeCommitted={handleChangeValue}
            />
        </Box>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UISlider)
