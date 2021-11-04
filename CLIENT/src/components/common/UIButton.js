/** 
 * @param {class}               :   스타일
 * @param {name}                :   버튼 이름
 * @param {tip}                 :   툴팁 내용
 * @param {variant}             :   버튼 유형
 * @param {color}               :   컬러
 * @param {action}              :   결과 함수
 * @returns {UIButton}
 */

import React from 'react'
import {
    Button, Tooltip, makeStyles, Typography
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {

    },
    buttonColor: {
        backgroundColor: theme.palette.background.whiteButton
    },
    textColor: {
        color: theme.palette.text.white,
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
                style={
                    props.inputStyle &&
                    {
                        ...props.inputStyle
                    }
                }
            >
                <Typography className={classes.textColor} variant="body1">
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

