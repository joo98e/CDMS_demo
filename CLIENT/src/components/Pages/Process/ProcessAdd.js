import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios'
import {
    Grid, Box, Paper, makeStyles, Typography, Container, TextField, Divider,
    Chip, Avatar
} from "@material-ui/core";

import { main, sub } from './ProcessAddOffer'
import Back from '../../common/Back';
import UIPersonList from '../../common/UIPersonList'
import UIPersonListOnlyOne from '../../common/UIPersonListOnlyOne'
import { setProcessInfo, setProcessInfoInit } from '../../../redux/action/ProducerAction';
import ProcessAdditionalDialog from './ProcessAdditionalDialog';
import { UIChipSet } from '../../common/UIChipSet';

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
    w100: {
        width: "100%"
    },
    w50p: {
        width: "50%",
    },
    pdbx: {
        padding: theme.spacing(2),
        boxSizing: 'border-box'
    }
}));

export default function ProcessAdd() {
    const { enqueueSnackbar } = useSnackbar();
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

    const handleChangeInfos = (e) => {
        let nextState = { ..._processInfo };
        nextState[e.target.name] = e.target.value;
        dispatch(setProcessInfo({
            ..._processInfo,
            ...nextState
        }));
    }


    useEffect(() => {

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
                })
        }

        loadProcessWorkSpace();

        return () => {
            dispatch(setProcessInfoInit());
        }

    }, [ref_proj_id]);

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Paper className={classes.pdbx} elevation={4}>
                <Back />
                <Container maxWidth="lg">
                    <Divider className={classes.mv} />
                    <TextField
                        className={classes.w100}
                        name="name"
                        type="text"
                        variant="filled"
                        label="프로세스 이름"
                        onChange={handleChangeInfos}
                    />
                    <Divider className={classes.mv} />
                    <TextField
                        className={classes.w100}
                        name="desc"
                        type="text"
                        variant="filled"
                        label="설명"
                        onChange={handleChangeInfos}
                    />
                    <Divider className={classes.mv} />

                    <Typography className={classes.mb2} variant="h6">
                        주담당자
                    </Typography>
                    <Box className={classes.w50p}>
                        <UIPersonListOnlyOne
                            BtnInfo={main.BtnInfo}
                            DialogInfo={main.DialogInfo}
                            TableColumnName={main.TableColumnName}
                            TableLoadedData={processWorkForce ? processWorkForce.result : []}
                            ResultMessage={main.ResultMessage}
                            ResultAction={ResultAction.main}
                        />
                        <Box mt={2}>
                            {
                                !_processInfo.mainPerson ?
                                    ""
                                    :
                                    <UIChipSet
                                        data={_processInfo.mainPerson}
                                    />
                            }

                        </Box>
                    </Box>
                    <Divider className={classes.mv} />
                    <Typography className={classes.mb2} variant="h6">
                        서브 담당자
                    </Typography>
                    <Box className={classes.w50p}>
                        <UIPersonList
                            BtnInfo={sub.BtnInfo}
                            DialogInfo={sub.DialogInfo}
                            TableColumnName={sub.TableColumnName}
                            TableLoadedData={processWorkForce ? processWorkForce.result : []}
                            ResultMessage={sub.ResultMessage}
                            ResultAction={ResultAction.sub}
                        />
                        <Box mt={2}>
                            {
                                _processInfo.subPerson &&
                                _processInfo.subPerson.map((item, index) => {
                                    return (
                                        <UIChipSet
                                            key={index}
                                            data={item}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>

                    <Divider className={classes.mv} />
                    <Typography className={classes.mb2} variant="h6">
                        추가 정보 구성
                    </Typography>
                    <Box className={classes.w50p}>
                        <ProcessAdditionalDialog />
                    </Box>

                    <Divider className={classes.mv} />

                </Container>
            </Paper>
        </Box>
    )
}
