
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {
    Box, 
    makeStyles
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "block",
        width: "100%",
        minHeight: "90vh",
        boxSizing: "border-box",
        padding: theme.spacing(4)
    },
}));

export const ProjectDetail = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { ref_proj_id } = useParams();

    useEffect(() => {

        return () => {

        }
    }, []);

    return (
        <Box className={classes.root}>

        </Box>
    )
}

export default (ProjectDetail)
