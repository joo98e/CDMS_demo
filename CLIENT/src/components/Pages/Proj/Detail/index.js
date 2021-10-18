
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios'

import {
    Box, Grid, Grow, makeStyles, Paper, IconButton, Typography
} from "@material-ui/core"

import Chart from "./Chart"
import ProcessCard from '../../Process/ProcessCard';
import UICircularProgress from '../../../common/UICircularProgress'
import { AddCircleIcon } from '../../../common/CustomIcons';
import getDateFormat from '../../../common/fn/getDateFormat';
import getNow from '../../../common/fn/getNow';

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
    indent: {
        textIndent: theme.spacing(2)
    },
    lh_2: {
        lineHeight: "2em"
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    m_1: {
        margin: theme.spacing(2)
    },
    p_1: {
        padding: theme.spacing(2)
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
}));

export const ProjectDetail = (props) => {
    const classes = useStyles();
    const history = useHistory();
    // TODO 글쓰기 권한 지정해줘야함
    const _member = useSelector((store) => store.User.member);
    const { ref_proj_id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [awhile, setAwhile] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [processData, setProcessData] = useState([]);

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
                console.log(...res.data.result);
                return res.data;
            });
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
                setProcessData(res.data.result);
                console.log("processData", res.data.result);
                return res.data;
            }).catch(err => console.log(err));
        }

        setAwhile(true);
        getProjectDetail();
        getProcessList();

        if (getDateFormat.YYYYMMDD(projectData.end_date) < getDateFormat.YYYYMMDD(getNow())) {
            enqueueSnackbar('종료된 프로젝트입니다.', { variant: "info" })
        }
    }, [ref_proj_id])

    return (
        <Box className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={4}>
                        <div className={classes.titleBox}>
                            <span className={classes.mainTitle}>{projectData.name}</span>
                            <span className={`${classes.subTitle} + ${classes.descColor}`}>{projectData.desc}</span>
                        </div>
                    </Paper>
                </Grid>
                {
                    projectData ?
                        <React.Fragment>

                            {/* 과업 차트 */}
                            <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 600 : 0} >
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={4}>
                                        <Chart
                                            data={processData}
                                        />
                                    </Paper>
                                </Grid>
                            </Grow>

                            {/* 과업 목록 */}

                            <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 1000 : 0} >
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={4} className={`${classes.minHeight} + ${classes.relative}`}>
                                        {
                                            (processData && processData.length !== 0) ?
                                                processData.map((item, index) => {
                                                    return (
                                                        <ProcessCard
                                                            key={index}
                                                            item={item}
                                                        />
                                                    )
                                                })
                                                :
                                                <Typography className={classes.trans} variant="h6" component="div">
                                                    진행중인 프로세스가 없습니다.
                                                </Typography>
                                        }

                                    </Paper>
                                </Grid>
                            </Grow>
                            {
                                (
                                    (_member.ref_allow_action.indexOf('WRITE') !== -1 || projectData.writer_seq === _member.seq)
                                    &&
                                    getDateFormat.YYYYMMDD(projectData.end_date) > getDateFormat.YYYYMMDD(getNow())
                                ) &&
                                <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 1000 : 0}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper elevation={4} className={`${classes.minHeight} + ${classes.relative}`}>
                                            <IconButton
                                                className={classes.trans}
                                                color="inherit"
                                                onClick={() => {
                                                    history.push(`/agency/project/detail/process/add/${projectData.id}`)
                                                }}
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                        </Paper>
                                    </Grid>
                                </Grow>
                            }
                        </React.Fragment>
                        :
                        <UICircularProgress />
                }
            </Grid>
        </Box>
    )
}

export default (ProjectDetail)
