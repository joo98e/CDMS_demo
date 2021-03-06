import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setProjectInfo, setProjectInfoInit } from '../../../redux/action/ProducerAction'
import {
    Container, TextField, Typography, Divider, Box, Paper, Grow,
} from '@material-ui/core';

import ProjectAdditionalDialog from './ProjectAdditionalDialog'
import getDateFormat from '../../common/fn/getDateFormat';
import FNValidator from '../../common/FNValidator';
import UIPersonList from '../../common/UIPersonList';
import UIChipSet from '../../common/UIChipSet'
import UIDatePicker from '../../common/UIDatePicker';
import UIButton from '../../common/UIButton';
import getNow from '../../common/fn/getNow';
import Back from '../../common/Back'
import API from '../../common/API';

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
    textFieldStyle: {
        width: '30vw',
        textAlign: 'right'
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
    open: "????????????",
    complete: "??????",
    cancle: "??????"
};

const DialogInfo = {
    title: "???????????? ??????",
    subTitle: "????????? ??????"
};

const TableColumnName = [
    [""],
    ["??????"],
    [
        "??????",
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
        "??????",
        {
            className: "mobile-person-row"
        }
    ],
    ["??????"],
];

const ResultMessage = {
    success: "???????????? ?????????????????????.",
    fail: "????????? ????????? ???????????????."
};

export default function FullScreenDialog() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { ref_agcy_id } = useParams();
    const _accessInfo = useSelector((store) => store.User.accessInfo);
    const _member = useSelector((store) => store.User.member);
    const _projectInfo = useSelector((store) => store.Producer.projectInfo);
    const dispatch = useDispatch();

    const classes = useStyles();
    const [awhile, setAwhile] = React.useState(false);
    const [personRow, setPersonRow] = React.useState(null);

    React.useEffect(() => {
        dispatch(setProjectInfoInit());
        const loadPersonRow = async () => {
            const condition = {
                ref_agcy_id : ref_agcy_id,
                seq : _member.seq,
                delete_yn: 'N'
            };
            await axios.post('/api/org/person', condition)
                .then(res => {
                    setPersonRow(res.data);
                })
                .catch(err => console.error(err));
        }

        setAwhile(true);
        loadPersonRow();

        return () => {
            dispatch(setProjectInfoInit());
        }

    }, []);

    const handleChangeDate = (value, name) => {
        const _result = name === "start_date" ? getDateFormat.YYYYMMDDHHMMSS_BEGIN(value) : getDateFormat.YYYYMMDDHHMMSS_END(value);

        let nextValue = { ..._projectInfo }
        nextValue[name] = _result;
        dispatch(setProjectInfo({ ...nextValue }));
    }

    const handleValidateValue = () => {
        const target = _projectInfo;
        for (let item in target) {

            switch (item) {
                case "name":
                    if (!FNValidator("PROJNAME", target[item])) {
                        enqueueSnackbar('??????, ????????? ????????? ??????????????? ?????? ??????, ??????, ????????? ?????? ???????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "desc":
                    if (target[item] === "" || target[item] === undefined) {
                        enqueueSnackbar('????????? ??????????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "start_date":
                    if (target[item] !== null) {
                        if (target[item] > target.end_date) {
                            enqueueSnackbar('???????????? ????????? ??????????????????.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('???????????? ???????????? ?????? ????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "end_date":
                    if (target[item] !== null) {
                        if (target[item] < target.start_date) {
                            enqueueSnackbar('???????????? ????????? ??????????????????.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('???????????? ???????????? ?????? ????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "person":
                    if (target[item].length === 0 || target[item].length === undefined) {
                        enqueueSnackbar('???????????? ???????????? ????????? ???????????? ?????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }

        handleClickAddProject();
    }

    const handleChangeProjectInfos = (e) => {
        let nextValue = { ..._projectInfo }
        nextValue[e.target.name] = e.target.value;
        dispatch(setProjectInfo({ ...nextValue }));
    }

    const ResultAction = {
        success: data => {
            dispatch(setProjectInfo({
                ..._projectInfo,
                person: data
            }))
        },
        fail: () => {

        }
    }

    const handleClickAddProject = () => {
        const URL = '/api/project/add';
        const data = {
            ..._accessInfo,
            ..._member,
            ..._projectInfo,
            ref_agcy_id: ref_agcy_id,
        };

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        axios.post(URL, data, config)
            .then(res => {
                if (res.data.resultCode === 1) {
                    
                    const newsConfig = {
                        name: _projectInfo.name,
                        type: "INCLUDE::AGENCY",
                        ref_id: ref_agcy_id,
                        writer: _member.seq,
                        message: `${_projectInfo.name} ??????????????? ?????????????????????.`,
                        url: `/agency/project/detail/${res.data.result.last_insert_id}`,
                        reg_date: getNow()
                    }
                    API.insertNews(newsConfig);

                    dispatch(setProjectInfo({
                        ..._projectInfo,
                        person: []
                    }));
                    enqueueSnackbar("???????????? ????????? ??????????????????.", { variant: 'success' });
                    history.goBack();
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
                        <TextField
                            className={classes.w100}
                            variant="filled"
                            label="???????????????"
                            name="name"
                            onChange={handleChangeProjectInfos}
                            align="left"
                        />
                        <Divider className={classes.mv} />
                        <TextField
                            className={classes.w100}
                            variant="filled"
                            label="???????????? ??????"
                            multiline
                            rows={4}
                            name="desc"
                            onChange={handleChangeProjectInfos}
                            align="left"
                        />

                        <Divider className={classes.mv} />
                        <UIDatePicker
                            name="start_date"
                            label="???????????? ?????????"
                            class={classes.w100}
                            resultAction={handleChangeDate}
                        />

                        <Divider className={classes.mv} />
                        <UIDatePicker
                            name="end_date"
                            label="???????????? ?????????"
                            class={classes.w100}
                            resultAction={handleChangeDate}
                        />

                        <Divider className={classes.mv} />
                        <Typography className={classes.mb2} variant="h6">
                            ?????? ??????
                        </Typography>
                        <Box className={classes.w50p}>
                            <ProjectAdditionalDialog />
                        </Box>

                        <Divider className={classes.mv} />
                        <Typography className={classes.mb2} variant="h6">
                            ???????????? ?????????
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
                            <Box mt={2}>
                                {
                                    _projectInfo.person &&
                                    _projectInfo.person.map((item, index) => {
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
                        <UIButton
                            class={classes.mauto}
                            name="??????"
                            variant="contained"
                            tip="?????? ??????"
                            color="primary"
                            action={handleValidateValue}
                        />
                    </Container>
                </Grow>
            </Paper>
        </Box>
    );
}