import React, { useEffect } from 'react'
import {
    makeStyles,
} from '@material-ui/core'
import UISkeletonAvatar from './UISkeletonAvatar';
import getDateFormat from './fn/getDateFormat';
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        minHeight: theme.spacing(4),
        padding: theme.spacing(2),
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column"
    },
    pr2: {
        paddingRight : theme.spacing(2)
    },
    author : {
        color : theme.palette.text.desc
    }
}));

export const UINews = (props) => {
    const classes = useStyles();

    useEffect(() => {

    });

    return (
        <div className={classes.root}>
            <div className={classes.pr2}>
                <UISkeletonAvatar
                    src={props.data.avatar_path}
                    alt={props.data.full_name}
                />
            </div>
            <div className={classes.flexColumn}>
                <span>
                    {props.data.message}
                </span>
                <span className={classes.author}>
                    {props.data.full_name}, {getDateFormat.TOSTRING(props.data.reg_date)}
                </span>
            </div>
        </div>
    )
}

export default UINews
