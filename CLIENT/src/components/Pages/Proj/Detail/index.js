
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios'
import {
    Box, Grid, Grow, makeStyles, Paper, IconButton, Typography, Divider
} from "@material-ui/core"

import { AddCircleIcon } from '../../../common/CustomIcons';
import ProcessCard from '../../Process/ProcessCard';
import getNow from '../../../common/fn/getNow';
import getDateFormat from '../../../common/fn/getDateFormat';
import UICircularProgress from '../../../common/UICircularProgress'
import UIMultiPercentageChart from '../../../common/Chart/UIMultiPercentageChart';
import HelpNoProcess from './HelpNoProcess';
import API from '../../../common/API';
import UIButton from '../../../common/UIButton';
import UINewsByNotice from '../../../common/News/UINewsByNotice';

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
        position: "relative"
    },
    minHeight: {
        minHeight: theme.spacing(40)
    },
    maxHeight: {
        maxHeight: theme.spacing(30)
    },
    indent: {
        textIndent: theme.spacing(2)
    },
    lh_2: {
        lineHeight: "2em"
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    m1: {
        margin: theme.spacing(2)
    },
    p1: {
        padding: theme.spacing(2)
    },
    pb2: {
        paddingBottom: theme.spacing(2)
    },
    flex: {
        display: "flex",
        flexDirection : "column",
        justifyContent : "center",
    },
    titleBox: {
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
        fontSize: "2em",
    },
    subTitle: {
        display: "inline-block",
        paddingRight: theme.spacing(1),
        fontSize: "1em",
    },
    descColor: {
        color: theme.palette.text.desc
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    bdBox: {
        boxSizing: "border-box",
        padding: theme.spacing(2)
    },
    mainArea: {
        minHeight: theme.spacing(50),
        "& svg": {
            height: theme.spacing(36)
        }
    },
    card: {
        position: "relative",
        boxSizing: "border-box",
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
    },
    more: {
        position: "absolute",
        top: theme.spacing(1.5),
        right: theme.spacing(1.5)
    },
}));

export const ProjectDetail = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const _member = useSelector((store) => store.User.member);
    const { ref_proj_id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [awhile, setAwhile] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [processData, setProcessData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [writeStatus, setWriteStatus] = React.useState(false);
    const [helpOpen, setHelpOpen] = React.useState(false);
    const [ended, setEnded] = React.useState(false);

    const handleCloseHelp = () => {
        setHelpOpen(false)
    }

    useEffect(() => {
        const getProjectDetail = async () => {
            const condition = {
                ref_proj_id: ref_proj_id,
                delete_yn: 'N'
            }
            const URL = "/api/project/detail";

            axios.get(URL, {
                params: condition
            }).then((res) => {

                setProjectData(...res.data.result);
                if (getDateFormat.YYYYMMDD(res.data.result[0].end_date) < getDateFormat.YYYYMMDD(getNow())) {
                    setEnded(true);
                    enqueueSnackbar('종료된 프로젝트입니다.', { variant: "info" })
                }

                return res.data;

            }).catch(err => console.log(err));
        }

        const getProcessList = async () => {
            const condition = {
                ref_proj_id: ref_proj_id,
                colg_type: "TYPE::MAIN",
                delete_yn: "N",
            }
            const URL = "/api/process/colg";

            axios.get(URL, {
                params: condition
            }).then((res) => {

                // TODO 로드되는 과정에서 기능 오류 발견
                // if (res.data.result.length === 0 && writeStatus && !ended) {
                //     setHelpOpen(true);
                // }

                let data = [];
                for (const property in res.data.result) {
                    data.push([res.data.result[property].cur_task, res.data.result[property].total_task]);
                }

                setChartData(data);
                setProcessData(res.data.result);

                return res.data;
            }).catch(err => console.log(err));
        }

        // 뉴스
        const config = {
            type: "INCLUDE::PROJECT",
            ref_id: ref_proj_id,
            delete_yn : "N"
        }

        API.getNews(config)
            .then((res) => {
                setNewsData(res.data.result);
            });

        // 프로젝트, 프로세스, awhile
        setAwhile(true);
        getProjectDetail();
        getProcessList();

        // 글쓰기 권한
        if (_member.ref_allow_action.indexOf('WRITE') !== -1 || projectData.writer_seq === _member.seq) {
            setWriteStatus(true);
        }

    }, [])

    return (
        <Box className={classes.root}>
            <HelpNoProcess
                open={helpOpen}
                handleClose={handleCloseHelp}
                ref_proj_id={ref_proj_id}
            />
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={4}>
                        <div className={classes.titleBox}>
                            <span className={`${classes.hiddenText} + ${classes.mainTitle}`}>{projectData.name}</span>
                            <span className={`${classes.hiddenText} + ${classes.subTitle} + ${classes.descColor}`}>{projectData.desc}</span>
                        </div>
                    </Paper>
                </Grid>
                {
                    projectData ?
                        <React.Fragment>

                            {/* 과업 차트 */}
                            <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 600 : 0}>
                                <React.Fragment>
                                    <Grid item xs={12} md={3} lg={3}>
                                        <Paper className={`${classes.bdBox} + ${classes.mainArea} + ${classes.relative}`} elevation={4}>
                                            <Typography className={classes.mb1} variant="h6">
                                                프로젝트 진행도
                                            </Typography>
                                            <UIMultiPercentageChart
                                                name={"전체 진행도"}
                                                data={chartData}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={9} lg={9}>
                                        <Paper className={`${classes.bdBox} + ${classes.mainArea} + ${classes.relative}`} elevation={4}>
                                            <Typography className={classes.mb1} variant="h6">
                                                최근 활동
                                            </Typography>
                                            <UIButton
                                                class={classes.more}
                                                name="MORE"
                                                variant="contained"
                                                action={() => { }}
                                            />
                                            <Divider className={classes.mb1} />
                                            <Box className={classes.flex}>
                                                {
                                                    (newsData && newsData.length !== 0) ?
                                                        newsData.map((item, index) => {
                                                            return (
                                                                <UINewsByNotice
                                                                    key={index}
                                                                    num={index + 1}
                                                                    data={item}
                                                                />
                                                            )
                                                        })
                                                        :
                                                        <Typography className={classes.trans} variant="body1" align="center" component="div">
                                                            데이터가 없습니다.
                                                        </Typography>
                                                }
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </React.Fragment>
                            </Grow>

                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container spacing={4}>
                                    {
                                        ["TODO", "IN PROGRESS", "DONE"].map((category, index) => {
                                            let statusBy = [];
                                            for (let i = 0; i < processData.length; i++) {
                                                processData[i].status === `STATUS::${category}` && statusBy.push(processData[i]);
                                            }

                                            return (
                                                <Grow
                                                    key={index}
                                                    in={awhile}
                                                    style={{ transformOrigin: '0 0 0' }}
                                                    timeout={category === "TODO" ? 500 : category === "DOING" ? 1000 : category === "DONE" ? 1500 : 0}
                                                >
                                                    <Grid item xs={12} md={4} lg={4}>
                                                        <Paper className={`${classes.relative} + ${classes.pb2}`} elevation={4}>
                                                            <Typography className={classes.p1} variant="h4" align="center">
                                                                {category}
                                                            </Typography>
                                                            {
                                                                (statusBy && statusBy.length !== 0) ?

                                                                    statusBy.map((item, index) => {
                                                                        return (
                                                                            <ProcessCard
                                                                                key={index}
                                                                                item={item}
                                                                            />
                                                                        )
                                                                    })
                                                                    :
                                                                    (!writeStatus || (writeStatus && ended)) &&
                                                                    <Grid item xs={12} md={12} lg={12} className={classes.minHeight}>
                                                                        <Typography className={classes.trans} variant="body1" align="center" component="div">
                                                                            데이터가 없습니다.
                                                                        </Typography>
                                                                    </Grid>
                                                            }
                                                            {
                                                                (
                                                                    writeStatus
                                                                    &&
                                                                    !ended
                                                                ) &&
                                                                <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 1000 : 0}>
                                                                    <Grid item xs={12} md={12} lg={12}>
                                                                        <Paper elevation={4} className={`${classes.minHeight} + ${classes.relative}+ ${classes.card}`}>
                                                                            <IconButton
                                                                                className={classes.trans}
                                                                                color="inherit"
                                                                                onClick={() => {
                                                                                    history.push({
                                                                                        pathname: `/agency/project/detail/process/add/${projectData.id}`,
                                                                                        state: {
                                                                                            status: category
                                                                                        }
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <AddCircleIcon />
                                                                            </IconButton>
                                                                        </Paper>
                                                                    </Grid>
                                                                </Grow>
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                </Grow>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        :
                        <UICircularProgress />
                }
            </Grid>
        </Box>
    )
}

export default (ProjectDetail)
