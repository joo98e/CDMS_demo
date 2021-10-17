import React, { useState } from 'react'
import {
    Box,
    Paper,
    makeStyles,
    Typography,
    Container,
    TextField,
    Divider
} from "@material-ui/core";
import Back from '../../common/Back';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "block",
        width: "100%",
        minHeight: "90vh",
        boxSizing: "border-box",
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2)
    },
    mv : {
        marginTop : theme.spacing(2),
        marginBottom : theme.spacing(2)
    },
    mt4: {
        marginTop: theme.spacing(4)
    },
    vw50 : {
        width : "50vw"
    }
}));


export default function ProcessAdd() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Back />
            <Paper className={classes.mt4} elevation={4}>
                <Container maxWidth="lg">
                    <Divider className={classes.mv} />
                    <Typography variant="h6">
                        프로세스 이름
                    </Typography>
                    <TextField 
                        className={classes.vw50}
                        type="text"
                        variant="standard"
                    />
                    <Divider className={classes.mv} />
                    <Typography variant="h6">
                        설명
                    </Typography>
                    <TextField 
                        className={classes.vw50}
                        type="text"
                        variant="standard"
                    />
                    <Divider className={classes.mv} />

                    <Typography variant="h6">
                        담당자
                    </Typography>
                    <TextField 
                        className={classes.vw50}
                        type="text"
                        variant="standard"
                    />

                    <Divider className={classes.mv} />
                </Container>
            </Paper>
        </Box>
    )
}
