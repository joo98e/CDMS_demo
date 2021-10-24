import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Grid, Box, Container, Paper,
    AppBar, makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxSizing: "border-box",
        padding: theme.spacing(4)
    }
}));

export const ProcessDetail = (props) => {
    const classes = useStyles();
    const { ref_proc_id } = useParams();
    const [processDetail, setProcessDetail] = useState({});

    useEffect(() => {
        const getProcessDetail = () => {
            const condition = {
                ref_proc_id : ref_proc_id,
                delete_yn : "N"
            }
            const URL = "/api/process/detail";

            axios.get(URL, { params: condition })
                .then(res => {
                    setProcessDetail(res.data);
                })
                .catch(err => console.log(err));
        }

        getProcessDetail();

    }, [ref_proc_id]);

    return (
        <Box className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper elevation={4}>
                        num
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper elevation={4}>
                        num
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper elevation={4}>
                        num
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper elevation={4}>
                        num
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDetail)