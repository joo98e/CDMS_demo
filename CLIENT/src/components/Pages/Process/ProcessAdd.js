import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'
import {
    Grid,
    Box,
    Paper,
    makeStyles,
    Typography,
    Container,
    TextField,
    Divider,
} from "@material-ui/core";

import Back from '../../common/Back';
import UIPersonList from '../../common/UIPersonList'

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
    mv: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    mt4: {
        marginTop: theme.spacing(4)
    },
    vw50: {
        width: "100%"
    },
    w50p: {
        width: "50%",
        "&sss": {

        }
    }
}));

const BtnInfo = {
    open: "주 담당자 지정",
    complete: "담당자 지정",
    cancle: "담당자 지정 취소"
    
};

const DialogInfo = {
    title: "새 프로세스 등록",
    subTitle: "담당자 지정"
};

const TableColumnName = [
    [""],
    ["성명"],
    [
        "부서",
        {
            className: "mobile-person-row"
        }
    ],
    [
        "ID",
        {
            className: "mobile-person-row"
        }
    ],
    [
        "직책",
        {
            className: "mobile-person-row"
        }
    ],
    ["구성"],
];

const ResultMessage = {
    success: "담당자가 지정되었습니다.",
    fail: "담당자 지정을 취소합니다."
};

const ResultAction = {
    success: () => {
        console.log("success");
    },
    fail: () => {
        console.log("fail");
    }
}



export default function ProcessAdd() {
    const [processWorkForce, setProcessWorkForce] = useState();

    useEffect(() => {
        const loadProcessWorkSpace = async () => {
            const condition = {
                ref_proj_id : "",
                delete_yn : "N"
            }

            await axios.get()
        }

        return () => {

        }

    }, []);


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
                    <div className={classes.w50p}>
                        <UIPersonList
                            BtnInfo={BtnInfo}
                            DialogInfo={DialogInfo}
                            TableColumnName={TableColumnName}
                            TableLoadedData={[]}
                            ResultMessage={ResultMessage}
                            ResultAction={ResultAction}
                        />
                    </div>

                    <Divider className={classes.mv} />
                </Container>
            </Paper>
        </Box>
    )
}
