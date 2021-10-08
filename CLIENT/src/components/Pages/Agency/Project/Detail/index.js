















import React, { useState, useSelector, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { useParams } from 'react-router';
import axios from 'axios'

import {
    Box, Grid, Grow, makeStyles, Paper, Typography
} from "@material-ui/core"

import getDateFormat from '../../../../common/fn/getDateFormat';
import UICircularProgress from '../../../../common/UICircularProgress'

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "block",
        width: "100%",
        minHeight: "90vh",
        boxSizing: "border-box",
        padding: theme.spacing(4)
    },
    minHeight: {
        minHeight : theme.spacing(40)
    }
}));

export const ProjectDetail = (props) => {
    const classes = useStyles();
    const { ref_proj_id } = useParams();

    const [awhile, setAwhile] = useState(false);
    const [projectData, setProjectData] = useState([]);

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

        setAwhile(true);
        getProjectDetail();

    }, [ref_proj_id])

    return (
        <Box className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={4} >
                        <Typography
                            variant="h4">
                            {ref_proj_id}
                        </Typography>
                    </Paper>
                </Grid>
                {
                    projectData ?
                        <React.Fragment>
                            <Grow
                                in={awhile}
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={awhile ? 600 : 0}
                            >
                                <Grid item xs={12} md={6} lg={4}>
                                    <Paper elevation={4} className={classes.minHeight}>
                                        123213123123
                                    </Paper>
                                </Grid>
                            </Grow>
                            <Grow
                                in={awhile}
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={awhile ? 800 : 0}
                            >
                                <Grid item xs={12} md={6} lg={4}>
                                    <Paper elevation={4} className={classes.minHeight}>
                                        .235235235
                                    </Paper>
                                </Grid>
                            </Grow>
                            <Grow
                                in={awhile}
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={awhile ? 1000 : 0}
                            >
                                <Grid item xs={12} md={6} lg={4}>
                                    <Paper elevation={4} className={classes.minHeight}>
                                        2315235235
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
