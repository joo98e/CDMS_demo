import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import {
    Typography,
    Divider,
    Grid,
    Paper,
    Button,
    Tooltip,
    makeStyles
} from "@material-ui/core"

import UISkeletonAvatar from "../../common/UISkeletonAvatar"
import ProcessCardChart from './ProcessCardChart';
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
        display: "inline-block",
        margin: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(2),
        background: theme.palette.background.default
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
        labels: ['??????'],
        datasets: [
            {
                label: '??????',
                backgroundColor: theme.palette.background.default,
                borderColor: theme.palette.background.paper,
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 255, 255, 0.4)',
                hoverBorderColor: theme.palette.text.disable,
                data: [2, 10],
            }
        ]
    };

    return (
        <React.Fragment>
            <div className={classes.titleBox}>
                <span className={classes.mainTitle}>{props.item.process_name}</span>
                <span className={`${classes.subTitle} + ${classes.descColor}`}>{props.item.process_desc}</span>
                <Button size="large" variant="outlined" className={classes.more}>?????????</Button>
            </div>
            <Divider />
            <Grid container spacing={3} className={classes.bdBox}>
                <Grid item xs={12} md={2} lg={2}>
                    <Paper className={`${classes.minHeight} + ${classes.mt2}`}>
                        <Bar
                            data={data}
                            width={25}
                            height={25}
                            options={{
                                layout : {
                                    padding : 20
                                },
                                maintainAspectRatio: false,
                                plugins: {
                                    layout : {
                                        padding : 20
                                    },
                                    legend: {
                                        display: true,
                                        title : {
                                            display : true,
                                            text : "??????",
                                            color : "#FFF",
                                            font : {
                                                family : "NanumSquareRound",
                                                size : theme.spacing(2)
                                            }
                                        },
                                        labels: {
                                            font: {
                                                family: "NanumSquareRound",
                                            }
                                        }
                                    },
                                }, scales: {
                                    xAxis: {
                                        
                                    }
                                }
                            }}
                        />
                        {/* <ProcessCardChart
                            columnName={props.item.process_name}
                            MIN={{
                                name: "?????? ?????????",
                                value: props.item.cur_task
                            }}
                            MAX={{
                                name: "?????? ?????????",
                                value: props.item.total_task
                            }}
                        /> */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={10} lg={10}>
                    <Paper className={`${classes.minHeight} + ${classes.mt2}`}>
                        <Typography variant="body1" className={`${classes.indent} + ${classes.hiddenText}`}>
                            ?????? ??????
                        </Typography>

                        {/* ????????? ?????? ???????????? */}
                        <Grid container spacing={1}>
                            <Grid item xs={3} md={3} lg={3}>
                                <div
                                    className={classes.writerBox}
                                >
                                    <UISkeletonAvatar
                                        src={props.item.avatar_path}
                                        alt={props.item.last_name}
                                    />
                                    {props.item.last_name}
                                </div>
                            </Grid>
                            <Grid item xs={9} md={9} lg={9}>
                                <div
                                    className={classes.m2}
                                >
                                    <Typography variant="body1" className={classes.lh_2}>
                                        {props.item.dept_name}
                                    </Typography>
                                    <Typography variant="body1" className={classes.lh_2}>
                                        {props.item.rank_name}
                                    </Typography>
                                </div>
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
