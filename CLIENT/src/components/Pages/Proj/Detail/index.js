















import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useParams } from 'react-router';
import axios from 'axios'

import {
    Box, Grid, Grow, makeStyles, Paper, IconButton
} from "@material-ui/core"

import Chart from "./Chart"
import ProcessCard from '../../Process/ProcessCard';
import UICircularProgress from '../../../common/UICircularProgress'
import { AddCircleIcon } from '../../../common/CustomIcons';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "block",
        width: "100%",
        minHeight: "90vh",
        boxSizing: "border-box",
        padding: theme.spacing(4)
    },
    relative : {
        position : "relative"
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
    const { ref_proj_id } = useParams();

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
                return res.data;
            });
        }

        const getProcessList = async () => {
            const condition = {
                ref_proj_id: ref_proj_id,
                colg_type: "TYPE::MAIN",
                delete_yn: "N",
            }
            const URL = "/api/process/colgmain";

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
                                    <Paper elevation={4} className={classes.minHeight}>
                                        {
                                            processData &&
                                            processData.map((item, index) => {
                                                return (
                                                    <ProcessCard
                                                        key={index}
                                                        item={item}
                                                    />
                                                )
                                            })
                                        }
                                    </Paper>
                                </Grid>
                            </Grow>
                            <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 1000 : 0} >
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={4} className={`${classes.minHeight} + ${classes.relative}`}>
                                        <IconButton color="inherit" className={classes.trans}>
                                            {AddCircleIcon}
                                        </IconButton>
                                    </Paper>
                                </Grid>

                            </Grow>
                        </React.Fragment>
                        :
                        <UICircularProgress />
                }
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)
