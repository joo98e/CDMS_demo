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

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    },
    mb2: {
        marginBottom: theme.spacing(2)
    },
}));

export const UIRating = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState();

    const StyledRating = withStyles(theme => ({
        icon: {
            color: theme.palette.rating && props.ratingType ?
                theme.palette.rating[props.ratingType].default
                :
                theme.palette.secondary.dark
        },
        iconFilled: {
            color: theme.palette.rating && props.ratingType ?
                theme.palette.rating[props.ratingType].fill
                :
                theme.palette.secondary.main
        },
        iconHover: {
            color: theme.palette.rating && props.ratingType ?
                theme.palette.rating[props.ratingType].hover
                :
                theme.palette.secondary.light
        }
    }))(Rating);

    const handleChangeValue = (event, value) => {
        setValue(value);
        props.resultAction && props.resultAction(value);
    }

    return (
        <Box>
            <Typography className={classes.mb2} variant="h6">
                {props.title}
            </Typography>
            <StyledRating
                className={classes.root}
                name={props.name}
                icon={props.ratingIcon}
                value={value}
                defaultValue={0}
                precision={0.5}
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

export default connect(mapStateToProps, mapDispatchToProps)(UIRating)
