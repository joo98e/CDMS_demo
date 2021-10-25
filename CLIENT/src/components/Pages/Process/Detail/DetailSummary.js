import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    Zoom, Grid, Paper, Typography, Box,
    makeStyles, Divider, withStyles
} from '@material-ui/core'
import UIPercentageChart from '../../../common/Chart/UIPercentageChart';
import { FollowStarIcon } from '../../../common/CustomIcons';
import UICardHeader from '../../../common/Card/UICardHeader';
import UISkeletonAvatar from '../../../common/UISkeletonAvatar';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxSizing: "border-box",
        padding: theme.spacing(4)
    },
    sizing: {
        padding: theme.spacing(0.5, 1, 1, 1),
        boxSizing: "border-box"
    },
    sizing2: {
        padding: theme.spacing(1, 8, 4, 8),
        boxSizing: "border-box"
    },
    m1: {
        margin: theme.spacing(1)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    },
    py: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    pb2: {
        paddingBottom: theme.spacing(2)
    },
    pb1: {
        paddingBottom: theme.spacing(1)
    },
    desc: {
        color: theme.palette.text.desc
    },
    disabled: {
        color: theme.palette.text.disabled
    }
}));

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

const Worker = props => {
    const styles = MainWorkerStyles();
    return (
        <Box className={styles.wrap}>
            <div>
                <UISkeletonAvatar
                    class={styles.root}
                    src={props.data.avatar_path}
                    alt={props.data.full_name}
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

export const DetailBoard = (props) => {
    const classes = useStyles();

    useEffect(() => {
        console.log(props.data);
    }, [props.data]);

    return (
        <React.Fragment>
            {
                (props.data.procDetail && props.data.procMainWorker && props.data.procSubWorker)
                &&
                <Zoom in={props.value === props.index} timeout={800}>
                    <Grid container spacing={3}>

                        {/* 1열 */}
                        <Grid item xs={12} md={3} lg={3}>
                            <Grid container spacing={3} direction="column">
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.sizing}>
                                        <UICardHeader
                                            title={"진행도"}
                                        />
                                        <Divider className={classes.mb1} />
                                        <Box className={classes.sizing}>
                                            <UIPercentageChart
                                                min={props.data.procDetail[0].cur_task}
                                                max={props.data.procDetail[0].total_task}
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.sizing}>
                                        <UICardHeader
                                            title={"현재 진행도"}
                                        />
                                        <Divider className={classes.mb1} />
                                        <Typography className={classes.pb2} variant="h2" align="center">
                                            <sup style={{ fontSize: "64px" }}>{props.data.procDetail[0].cur_task}</sup>
                                            <span className={classes.disabled}>/</span>
                                            <sub className={classes.disabled} style={{ fontSize: "48px" }}>{props.data.procDetail[0].total_task}</sub>
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.sizing}>
                                        <Typography className={classes.m1} variant="h6">
                                            프로세스 설명
                                        </Typography>
                                        <Divider className={classes.mb1} />
                                        <Typography className={classes.m1} variant="body2">
                                            {props.data.procDetail[0].desc}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* 2열 */}
                        <Grid item xs={12} md={3} lg={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.sizing}>
                                        <UICardHeader
                                            title={"담당자"}
                                        />
                                        <Divider className={classes.mb1} />
                                        <Worker data={props.data.procMainWorker[0]} />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.sizing}>
                                        <UICardHeader
                                            title={"참여자"}
                                        />
                                        <Divider className={classes.mb1} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* 3열 */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper className={classes.sizing}>
                                        <UICardHeader
                                            title={"최근 활동"}
                                        />
                                        <Divider className={classes.mb1} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Zoom>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBoard)
