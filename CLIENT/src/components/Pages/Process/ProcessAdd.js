import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
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
import { ProcessAdditionalDialog } from './ProcessAdditionalDialog';

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

    const handleChangeInfos = (e) => {
        let nextState = { ..._processInfo };
        nextState[e.target.name] = e.target.value;
        dispatch(setProcessInfo({
            ..._processInfo,
            ...nextState
        }));
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
                    <TextField
                        className={classes.vw50}
                        name="name"
                        type="text"
                        variant="filled"
                        label="프로세스 이름"
                        onChange={handleChangeInfos}
                    />
                    <Divider className={classes.mv} />
                    <TextField
                        className={classes.vw50}
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
                                _processInfo.mainPerson ?
                                    <Chip clickable color="primary" avatar={<Avatar src={_processInfo.mainPerson.avatar_path} />} label={`${_processInfo.mainPerson.full_name}`} />
                                    :
                                    <div></div>
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
                                        <Chip key={item.seq} clickable color="primary" onClick={console.log(5)} avatar={<Avatar src={item.avatar_path} />} label={`${item.full_name}`} />
                                    )
                                })
                            }
                        </Box>
                    </Box>

                    <Divider className={classes.mv} />
                    <Typography className={classes.mb2} variant="h6">
                        추가 정보 구성
                    </Typography>
                    <ProcessAdditionalDialog
                        
                    />

                    <Divider className={classes.mv} />
                </Container>
            </Paper>
        </Box>
    )
}
