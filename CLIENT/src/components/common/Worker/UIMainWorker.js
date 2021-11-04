import React from 'react'
import {
    Typography, Box, makeStyles
} from '@material-ui/core'
import UISkeletonAvatar from '../UISkeletonAvatar';

const MainWorkerStyles = makeStyles(theme => ({
    root: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        overflow: "hidden"
    },
    wrap: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1),
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
    },
    pl: {
        paddingLeft: theme.spacing(3)
    },
    desc: {
        color: theme.palette.text.desc
    },
}));


export const MainWorker = (props) => {
    const styles = MainWorkerStyles();

    return (
        <Box className={styles.wrap}>
            <div>
                <UISkeletonAvatar
                    class={styles.root}
                    src={props.data.avatar_path}
                    alt={props.data.last_name}
                />
            </div>
            <div className={styles.pl}>
                <Typography variant="h6">
                    {props.data.full_name}
                </Typography>
                <Typography className={styles.desc} variant="body2">
                    {props.data.dept_name} {props.data.rank_name}
                </Typography>
                <Typography className={styles.desc} variant="body2">
                    {props.data.id}
                </Typography>
                <Typography className={styles.desc} variant="body2">
                    {props.data.phone}
                </Typography>
            </div>
        </Box>
    )
}

export default MainWorker
