import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { Typography, Divider, Grid, Paper, Button, makeStyles } from "@material-ui/core"

import UISkeletonAvatar from "../../common/UISkeletonAvatar"
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "block",
        width: "100%",
        minHeight: "90vh",
        boxSizing: "border-box",
        padding: theme.spacing(4)
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
    mt4 : {
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
        paddingRight: theme.spacing(1),
        fontSize: "1.5em",
    },
    subTitle: {
        display: "inline-block",
        paddingRight: theme.spacing(1),
    },
    descColor: {
        color: theme.palette.text.desc
    },
    more: {
        position: "absolute",
        top: theme.spacing(1.5),
        right: theme.spacing(1.5),
        background: theme.palette.background.paper
    }
}));

export const ProcessCard = (props) => {
    const classes = useStyles();
    const theme = useSelector(state => state.UI.theme)

    const data = {
        labels: [props.item.process_name],
        datasets: [
            {
                label: '현황',
                backgroundColor: theme.palette.background.default,
                borderColor: theme.palette.background.paper,
                borderWidth: 1,
                hoverBackgroundColor: theme.palette.background.paper,
                hoverBorderColor: theme.palette.text.disable,
                data: [props.item.cur_task, props.item.total_task],
            }
        ]
    };
    console.log(props.item.total_task);
    return (
        <React.Fragment>
            <div className={classes.titleBox}>
                <span className={classes.mainTitle}>{props.item.process_name}</span>
                <span className={`${classes.subTitle} + ${classes.descColor}`}>{props.item.process_desc}</span>
                <Button size="large" variant="outlined" className={classes.more}>MORE</Button>
            </div>
            <Divider />
            <Grid container spacing={3} className={classes.bdBox}>
                <Grid item xs={12} md={2} lg={2}>
                    <Paper className={`${classes.minHeight} + ${classes.mt2}`}>
                        <Bar
                            data={data}
                            width={25} height={25}
                            options={{
                                layout: { padding: 20 },
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                }
                            }}
                            style={{ background: "#FFF", borderRadius: theme.spacing(2) }}
                        />
                        {/* <ProcessCardChart
                            columnName={props.item.process_name}
                            MIN={{
                                name: "현재 진행도",
                                value: props.item.cur_task
                            }}
                            MAX={{
                                name: "전체 진행도",
                                value: props.item.total_task
                            }}
                        /> */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                    <Paper className={`${classes.mt2} + ${classes.minHeight}`}>
                        <Typography variant="h6" className={`${classes.indent} + ${classes.hiddenText}`}>
                            최근 활동
                        </Typography>
                    </Paper>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={6} lg={6}>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={5} lg={5}>
                    <Paper className={`${classes.mt2} + ${classes.minHeight}`}>
                        <Typography variant="h6" className={`${classes.indent} + ${classes.hiddenText}`}>
                            주담당자
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={3} md={3} lg={3}>
                                <div className={`${classes.writerBox} + ${classes.minHeight}`}>
                                    <UISkeletonAvatar
                                        src={props.item.avatar_path}
                                        alt={props.item.nickname}
                                    />
                                    <Typography component="div" align="center" variant="body1">
                                        {props.item.nickname}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={9} md={9} lg={9}>
                                <Grid container spacing={2} className={classes.mt4}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        부서
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Typography variant="body1">
                                            {props.item.dept_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        직급
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Typography variant="body1">
                                            {props.item.rank_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    theme: state.UI.theme
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCard)
