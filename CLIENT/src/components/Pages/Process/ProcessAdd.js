import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios'
import {
    Box, Paper, makeStyles, Typography, Container, TextField, Divider,
    Grow
} from "@material-ui/core";

import { setProcessInfo, setProcessInfoInit } from '../../../redux/action/ProducerAction';

import { main, sub } from './ProcessAddOffer'
import Back from '../../common/Back';
import ProcessAdditionalDialog from './ProcessAdditionalDialog';
import FNValidator from '../../common/FNValidator'
import getDateFormat from '../../common/fn/getDateFormat'

import UIPersonList from '../../common/UIPersonList'
import UIPersonListOnlyOne from '../../common/UIPersonListOnlyOne'
import UIChipSet from '../../common/UIChipSet';
import UIButton from '../../common/UIButton'
import UISlider from '../../common/UISlider'
import UIRating from '../../common/UIRating';

import {
    RatingStarIcon
} from "../../common/CustomIcons"
import { UIDatePicker } from '../../common/UIDatePicker';

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
    },
    mauto: {
        display: "block",
        margin: "0 auto"
    }
}));

export default function ProcessAdd() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { ref_proj_id } = useParams();
    const history = useHistory();
    const _processInfo = useSelector((store) => store.Producer.processInfo);
    const _accessInfo = useSelector((store) => store.User.accessInfo);
    const _member = useSelector((store) => store.User.member);
    const [processWorkForce, setProcessWorkForce] = useState(null);
    const [awhile, setAwhile] = React.useState(false);

    const ResultAction = {
        main: {
            success: data => {
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

    const handleChangeSlider = value => {
        dispatch(setProcessInfo({
            ..._processInfo,
            total_task: value
        }));
        enqueueSnackbar(`이 프로세스의 총 과업 수를 ${value}단계로 설정했습니다.`, { variant: "info" });
    }

    const handleChangeRating = value => {
        dispatch(setProcessInfo({
            ..._processInfo,
            rating: value
        }));
        enqueueSnackbar(`이 프로세스의 중요도를 ${value}단계로 설정했습니다.`, { variant: "info" });
    }

    const handleDateChange = (value, name) => {
        const _result = name === "start_date" ? getDateFormat.YYYYMMDDHHMMSS_BEGIN(value) : getDateFormat.YYYYMMDDHHMMSS_END(value);

        let nextValue = { ..._processInfo }
        nextValue[name] = _result;
        dispatch(setProcessInfo({ ...nextValue }));
    }

    const handleValidateValue = () => {
        const target = _processInfo;
        for (let item in target) {

            switch (item) {
                case "name":
                    if (!FNValidator("PROCNAME", target[item])) {
                        enqueueSnackbar('한글, 영문이 반드시 포함되어야 하며 한글, 영문, 숫자만 사용 가능합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "desc":
                    if (target[item] === "" || target[item] === undefined) {
                        enqueueSnackbar('설명을 기재해주세요.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "start_date":
                    if (target[item] !== null) {
                        if (target[item] > target.end_date) {
                            enqueueSnackbar('프로세스 기간을 확인해주세요.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('프로세스 시작일이 비어 있습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "end_date":
                    if (target[item] !== null) {
                        if (target[item] < target.start_date) {
                            enqueueSnackbar('프로세스 기간을 확인해주세요.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('프로세스 종료일이 비어 있습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "mainPerson":
                    if (!FNValidator("EMPTY", target[item])) {
                        enqueueSnackbar('주담당자는 반드시 구성해야 합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "total_task":
                    if (!FNValidator("TOTAL_TASK", target[item])) {
                        enqueueSnackbar('총 과업 수 구성이 필요합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "rating":
                    if (!FNValidator("RATING", target[item])) {
                        enqueueSnackbar('중요도를 설정해주세요!', { variant: 'warning' });
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }

        handleSubmitProcessInsert();
    }

    const handleSubmitProcessInsert = () => {
        const URL = "/api/process/add";
        const data = {
            ..._accessInfo,
            ..._member,
            ..._processInfo,
            ref_proj_id: ref_proj_id,
        }

        console.log(data);
        axios.post(URL, data)
            .then(res => {
                enqueueSnackbar("프로세스 등록에 성공하였습니다.", { variant: "success" });
                history.push(`/agency/project/detail/${ref_proj_id}`);
            });
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

        setAwhile(true);
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
                <Grow
                    in={awhile}
                    timeout={awhile ? 800 : 0}
                    style={{ transformOrigin: '0 0 0' }}
                >
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
                        <Typography className={classes.mb2} variant="h6">
                            프로세스 시작일
                        </Typography>
                        <UIDatePicker
                            name="start_date"
                            class={classes.w100}
                            label="프로세스 시작일"
                            resultAction={handleDateChange}
                        />

                        <Divider className={classes.mv} />
                        <Typography className={classes.mb2} variant="h6">
                            프로세스 종료일
                        </Typography>
                        <UIDatePicker
                            name="end_date"
                            class={classes.w100}
                            label="프로세스 종료일"
                            resultAction={handleDateChange}
                        />

                        <Divider className={classes.mv} />
                        <UISlider
                            title="총 과업 수 설정"
                            defaultValue={1}
                            minValue={1}
                            maxValue={20}
                            resultAction={handleChangeSlider}
                        />

                        <Divider className={classes.mv} />
                        <UIRating
                            title="프로세스 중요도 설정"
                            name="rating"
                            ratingType="star"
                            defaultValue={0}
                            ratingIcon={<RatingStarIcon />}
                            resultAction={handleChangeRating}
                        />

                        <Divider className={classes.mv} />
                        <UIButton
                            class={classes.mauto}
                            name="등록"
                            variant="contained"
                            tip="제출 버튼"
                            color="primary"
                            action={handleValidateValue}
                        />
                    </Container>
                </Grow>
            </Paper>
        </Box>
    )
}
