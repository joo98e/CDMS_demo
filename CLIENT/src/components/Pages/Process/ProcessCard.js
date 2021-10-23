import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Typography, Divider, Grid, Paper, Box, makeStyles } from "@material-ui/core"

import UISkeletonAvatar from "../../common/UISkeletonAvatar"
import UIPercentageChart from '../../common/Chart/UIPercentageChart'
import UIButton from '../../common/UIButton'

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: "border-box",
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
    },
    relative: {
        position: `relative`
    },
    inline: {
        display: 'inline'
    },
    minHeight: {
        height: theme.spacing(24),
    },
    indent: {
        textIndent: theme.spacing(2)
    },
    bdBox: {
        boxSizing: "border-box",
        padding: theme.spacing(2)
    },
    lh_2: {
        lineHeight: "2em"
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    mt2: {
        marginTop: theme.spacing(2)
    },
    mt4: {
        marginTop: theme.spacing(5)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    },
    m2: {
        margin: theme.spacing(2)
    },
    p1: {
        padding: theme.spacing(2)
    },
    plr2 : {
        padding : theme.spacing(0, 2, 0, 2)
    },
    pb1: {
        paddingBottm: theme.spacing(1)
    },
    writerBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: theme.spacing(2),
        marginTop: theme.spacing(4),
        borderRadius: theme.spacing(2),
        background: theme.palette.background.default,
    },
    titleBox: {
        position: "relative",
        display: "flex",
        padding: theme.spacing(1),
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        textIndent: theme.spacing(1),
        flexDirection: "column"
    },
    mainTitle: {
        display: "inline-block",
        maxWidth: "75%",
        paddingRight: theme.spacing(1),
        fontSize: "1.5em",
    },
    subTitle: {
        display: "inline-block",
        maxWidth: "75%",
        paddingRight: theme.spacing(1),
    },
    descColor: {
        color: theme.palette.text.desc
    },
    more: {
        position: "absolute",
        top: theme.spacing(1.5),
        right: theme.spacing(1.5)
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    marginBox: {
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
    },
}));

export const ProcessCard = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const chartData = [
        props.item.cur_task === null ? 0 : props.item.cur_task,
        props.item.total_task === null ? 0 : props.item.total_task
    ];

    const handleClickGoProcessDetail = () => {
        history.push(`/agency/project/process/detail/${props.item.process_id}`);
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <div className={classes.titleBox}>
                <span className={`${classes.hiddenText} + ${classes.mainTitle}`}>{props.item.process_name}</span>
                <span className={`${classes.hiddenText} + ${classes.subTitle} + ${classes.descColor}`}>{props.item.process_desc}</span>
                <UIButton
                    class={classes.more}
                    name="자세히"
                    variant="contained"
                    action={handleClickGoProcessDetail}
                />
            </div>
            <Divider />
            <Grid container spacing={3} className={classes.bdBox}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={`${classes.mt2} + ${classes.minHeight}`}>
                        <Typography variant="h6" className={`${classes.indent} + ${classes.hiddenText}`}>
                            주담당자
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={4} md={4} lg={4}>
                                <div className={`${classes.writerBox} + ${classes.minHeight}`}>
                                    <UISkeletonAvatar
                                        src={props.item.avatar_path}
                                        alt={props.item.nickname}
                                    />
                                    <Typography className={`${classes.hiddenText} + ${classes.plr2}`} component="div" align="center" variant="body1">
                                        {props.item.nickname}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={8} md={8} lg={8}>
                                <Grid container spacing={2} className={classes.mt4}>
                                    <Grid item xs={3} md={3} lg={3}>
                                        <Typography variant="body1" className={classes.hiddenText}>
                                            부서
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9} md={9} lg={9}>
                                        <Typography variant="body1" className={classes.hiddenText}>
                                            {props.item.dept_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3}>
                                        <Typography variant="body1" className={classes.hiddenText}>
                                            직급
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9} md={9} lg={9}>
                                        <Typography variant="body1" className={classes.hiddenText}>
                                            {props.item.rank_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={`${classes.maxHeight} + ${classes.bdBox}`}>
                        <Typography className={classes.mb1} variant="h6">
                            프로세스 진행도
                        </Typography>
                        <Box className={`${classes.relative} + ${classes.marginBox}`}>
                            <UIPercentageChart
                                name={"프로세스 진행도"}
                                min={chartData[0]}
                                max={chartData[1]}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* <Grid item xs={12} md={12} lg={12}>
                    <Paper className={`${classes.mt2} + ${classes.minHeight}`}>
                        <Typography variant="h6" className={`${classes.indent} + ${classes.hiddenText}`}>
                            최근 활동
                        </Typography>
                    </Paper>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={6} lg={6}>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </Paper >
    )
}

const mapStateToProps = (state) => ({
    theme: state.UI.theme
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCard)
