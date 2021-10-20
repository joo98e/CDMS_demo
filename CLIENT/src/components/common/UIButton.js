import React, { useState } from 'react'
import {
    Button, Tooltip, makeStyles, Typography
} from "@material-ui/core"
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {

    },
    buttonColor: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.button
    }
}));


function UIButton(props) {

    const classes = useStyles();

    const ButtonRender = () => {
        return (
            <Button
                className={`${classes.buttonColor} + ${props.class ? props.class : ""}`}
                variant={props.variant}
                fullWidth={props.fullWidth ? true : false}
                onClick={props.action ? props.action : () => {
                    console.error("오류, action이 정의되지 않았습니다.");
                }}
            >
                <Typography variant="body1">
                    {props.name}
                </Typography>
            </Button>
        )
    }

    return (
        <React.Fragment>
            {
                (props.tip && props.tip !== "") ?
                    <Tooltip title={props.tip}>{ButtonRender()}</Tooltip>
                    :
                    ButtonRender()
            }
        </React.Fragment>
    )
}

UIButton.propTypes = {

}

export default UIButton

