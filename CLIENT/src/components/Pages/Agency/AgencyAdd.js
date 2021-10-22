import React from 'react';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAgencyInfo, setAgencyInfoInit } from '../../../redux/action/ProducerAction'
import {
    Container, TextField, Typography, Divider, Box, Paper, Grow,
    FormControl, Select, MenuItem, InputLabel, makeStyles
} from '@material-ui/core';

import Back from '../../common/Back'
import getDateFormat from '../../common/fn/getDateFormat';
import FNValidator from '../../common/FNValidator';
import UIPersonList from '../../common/UIPersonList';
import UIChipSet from '../../common/UIChipSet'
import UIDatePicker from '../../common/UIDatePicker';
import UIButton from '../../common/UIButton';
import AgencyAdditionalDialog from './AgencyAdditionalDialog';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    flexBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    stepperTitleStyle: {
        display: 'block',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    buttonStyle: {
        display: 'block',
        margin: '0 auto'
    },
    center: {
        width: "15em",
        margin: '0 auto 2em auto'
    },
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

const BtnInfo = {
    open: "구성하기",
    complete: "완료",
    cancle: "취소"
};

const DialogInfo = {
    title: "기관 등록",
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

export default function FullScreenDialog() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const _accessInfo = useSelector((store) => store.User.accessInfo);
    const _member = useSelector((store) => store.User.member);
    const _agencyInfo = useSelector((store) => store.Producer.agencyInfo);
    const dispatch = useDispatch();

    const classes = useStyles();
    const [awhile, setAwhile] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState(null);
    const [personRow, setPersonRow] = React.useState(null);

    React.useEffect(() => {

        const loadCategory = async () => {
            const condition = {
                delete_yn: 'N'
            };
            await axios.get('/api/agency/category', {
                params: condition
            })
                .then(res => {
                    setCategoryList(res.data.result);
                });
        }

        const loadPersonRow = async () => {
            const condition = {
                inside_yn: 'Y',
                delete_yn: 'N'
            };
            await axios.post('/api/org/person', condition)
                .then(res => {
                    setPersonRow(res.data);
                })
                .catch(err => console.error(err));
        }

        setAwhile(true);
        loadCategory();
        loadPersonRow();

        return () => {

        }

    }, []);

    const handleChangeDate = (value, name) => {
        const _result = name === "start_date" ? getDateFormat.YYYYMMDDHHMMSS_BEGIN(value) : getDateFormat.YYYYMMDDHHMMSS_END(value);

        let nextValue = { ..._agencyInfo }
        nextValue[name] = _result;
        dispatch(setAgencyInfo({ ...nextValue }));
    }

    const handleValidateValue = () => {
        const target = _agencyInfo;

        for (let item in target) {
            switch (item) {
                case "name":
                    if (!FNValidator("AGCYNAME", target[item])) {
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
                            enqueueSnackbar('사업 기간을 확인해주세요.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('사업 시작일이 비어 있습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "end_date":
                    if (target[item] !== null) {
                        if (target[item] < target.start_date) {
                            enqueueSnackbar('사업 기간을 확인해주세요.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('사업 종료일이 비어 있습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "biz_area":
                    if (target[item] === "" || target[item] === undefined) {
                        enqueueSnackbar('사업 구분이 필요합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "person":
                    if (target[item].length === 0 || target[item].length === undefined) {
                        enqueueSnackbar('기관 담당자를 구성해야 합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }

        handleClickAddAgency();
    }

    const handleChangeAgencyInfos = (e) => {
        let nextValue = { ..._agencyInfo }
        nextValue[e.target.name] = e.target.value;
        dispatch(setAgencyInfo({ ...nextValue }));
    }

    const ResultAction = {
        success: data => {
            dispatch(setAgencyInfo({
                ..._agencyInfo,
                person: data
            }))
        },
        fail: () => {

        }
    }

    const handleClickAddAgency = () => {
        const URL = '/api/agency/add';
        const data = {
            ..._accessInfo,
            ..._member,
            ..._agencyInfo
        };

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        axios.post(URL, data, config)
            .then(res => {
                if (res.data.resultCode === 1) {
                    dispatch(setAgencyInfo({
                        ..._agencyInfo,
                        person: []
                    }));
                    enqueueSnackbar("기관 등록에 성공했습니다.", { variant: 'success' });
                    history.go(0);
                } else {
                    enqueueSnackbar(res.data.resultCode, { variant: 'error' });
                }
            });
    }

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
                        <FormControl className={classes.w100} variant="filled">
                            <InputLabel>사업 구분</InputLabel>
                            {categoryList ?
                                <Select
                                    labelId="biz_area"
                                    id="biz_area"
                                    name="biz_area"
                                    value={_agencyInfo.biz_area ? _agencyInfo.biz_area : ''}
                                    onChange={handleChangeAgencyInfos}
                                >
                                    {categoryList.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                                :
                                ''
                            }
                        </FormControl>
                        <Divider className={classes.mv} />
                        <TextField
                            className={classes.w100}
                            variant="filled"
                            label="기관명"
                            name="name"
                            onChange={handleChangeAgencyInfos}
                            align="left"
                        />
                        <Divider className={classes.mv} />
                        <TextField
                            className={classes.w100}
                            variant="filled"
                            label="설명"
                            name="desc"
                            onChange={handleChangeAgencyInfos}
                            align="left"
                        />
                        <Divider className={classes.mv} />
                        <UIDatePicker
                            name="start_date"
                            label="사업 시작일"
                            class={classes.w100}
                            resultAction={handleChangeDate}
                        />
                        <Divider className={classes.mv} />
                        <UIDatePicker
                            name="end_date"
                            label="사업 종료일"
                            class={classes.w100}
                            resultAction={handleChangeDate}
                        />

                        <Divider className={classes.mv} />
                        <Typography className={classes.mb2} variant="h6">
                            추가 정보 구성하기
                        </Typography>
                        <Box className={classes.w50p}>
                            <AgencyAdditionalDialog />
                        </Box>

                        <Divider className={classes.mv} />
                        <Typography className={classes.mb2} variant="h6">
                            사업 참여 인력 구성하기
                        </Typography>
                        <Box className={classes.w50p}>
                            <UIPersonList
                                BtnInfo={BtnInfo}
                                DialogInfo={DialogInfo}
                                TableColumnName={TableColumnName}
                                TableLoadedData={personRow !== null ? personRow.result : {}}
                                ResultMessage={ResultMessage}
                                ResultAction={ResultAction}
                            />
                        </Box>
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
    );
}