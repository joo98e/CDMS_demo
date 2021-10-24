import React, { useEffect } from 'react'
import {
    Box, Typography, makeStyles,
} from '@material-ui/core'
import UISkeletonAvatar from './UISkeletonAvatar';
import getDateFormat from './fn/getDateFormat';
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: theme.spacing(4),
        padding: theme.spacing(2),
    },
    avatarBox: {
        display: "flex",
    },
    table: {
        display: "table"
    },
    nameBox: {
        display: "table-cell",
        verticalAlign: "middle",
        paddingRight: theme.spacing(2),
        color: theme.palette.text.desc,
    },
    titleBox: {
        display: "table-cell",
        verticalAlign: "middle",
        fontSize: theme.spacing(2),
        maxWidth: "50%",
        whiteSpace: "nowrap",
        overflow: 'hidden',
        textOverflow: "ellipsis",
    },
    tableBox: {
        display: "table",
        paddingRight: theme.spacing(2),
        color: theme.palette.text.desc,
    },
    dateTabelCell: {
        display: "table-cell",
        verticalAlign: "middle",
    },
    pr2 : {
        paddingRight : theme.spacing(2)
    }
}));

export const UINews = (props) => {
    const classes = useStyles();

    useEffect(() => {

    });

    return (
        <div className={classes.root}>
            <div className={classes.avatarBox}>
                <div className={classes.pr2}>
                    <UISkeletonAvatar
                        src={props.data.avatar_path}
                        alt={props.data.full_name}
                    />
                </div>
                <div className={classes.tableBox}>
                    <div className={classes.nameBox}>
                        <span>
                            {props.data.full_name}
                        </span>
                    </div>
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.titleBox}>
                    <span>
                        {props.data.message}
                    </span>
                </div>
            </div>
            <div className={classes.tableBox}>
                <div className={classes.dateTabelCell}>
                    <span>
                        {getDateFormat.TOSTRING(props.data.reg_date)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UINews
