import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
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

import { main, sub } from './ProcessAddOffer'
import Back from '../../common/Back';
import UIPersonList from '../../common/UIPersonList'
import UIPersonListOnlyOne from '../../common/UIPersonListOnlyOne'
import { setProcessInfo, setProcessInfoInit } from '../../../redux/action/ProducerAction';

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
    mb2: {
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
    }
}));

export default function ProcessAdd() {
    const { ref_proj_id } = useParams();
    const dispatch = useDispatch();
    const _processInfo = useSelector((store) => store.Producer.processInfo);
    const [processWorkForce, setProcessWorkForce] = useState(null);

    const ResultAction = {
        main: {
            success: data => {
                console.log(data);
                dispatch(setProcessInfo({
                    ..._processInfo,
                    mainPerson: data
                }));
            },
            fail: () => {
                console.log("fail");
            }
        },
        sub: {
            success: data => {
                dispatch(setProcessInfo({
                    ..._processInfo,
                    subPerson: data
                }))
            },
            fail: () => {
                console.log("fail");
            }
        }
    }


    useEffect(() => {
        console.log("_processInfo", _processInfo);

        const loadProcessWorkSpace = async () => {
            const URL = "/api/process/newcolg"
            const condition = {
                ref_proj_id: ref_proj_id,
                delete_yn: "N"
            }

            await axios.get(URL, {
                params: condition
            })
                .then((res) => {
                    setProcessWorkForce(res.data);
                    console.log(res.data);
                })
        }

        loadProcessWorkSpace();

        return () => {

        }

    }, [ref_proj_id]);

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

                    <Typography className={classes.mb2} variant="h6">
                        주담당자
                    </Typography>
                    <div className={classes.w50p}>
                        <UIPersonListOnlyOne
                            BtnInfo={main.BtnInfo}
                            DialogInfo={main.DialogInfo}
                            TableColumnName={main.TableColumnName}
                            TableLoadedData={processWorkForce ? processWorkForce.result : []}
                            ResultMessage={main.ResultMessage}
                            ResultAction={ResultAction.main}
                        />
                    </div>
                    <Divider className={classes.mv} />
                    <Typography className={classes.mb2} variant="h6">
                        서브 담당자
                    </Typography>
                    <div className={classes.w50p}>
                        <UIPersonList
                            BtnInfo={sub.BtnInfo}
                            DialogInfo={sub.DialogInfo}
                            TableColumnName={sub.TableColumnName}
                            TableLoadedData={processWorkForce ? processWorkForce.result : []}
                            ResultMessage={sub.ResultMessage}
                            ResultAction={ResultAction.sub}
                        />
                    </div>

                    <Divider className={classes.mv} />
                </Container>
            </Paper>
        </Box>
    )
}
