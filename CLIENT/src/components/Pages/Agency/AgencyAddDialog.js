import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAgencyInfo, setAgencyInfoInit } from '../../../redux/action/ProducerAction'

import {
    Container, TextField, FormControl, Select, Dialog, Typography,
    Divider, AppBar, Toolbar, IconButton,
    Grid, Box
} from '@material-ui/core';

import Slide from '@material-ui/core/Slide';
import getDateFormat from '../../common/fn/getDateFormat';
import FNValidator from '../../common/FNValidator';
import UIPersonList from '../../common/UIPersonList';
import UIDatePicker from '../../common/UIDatePicker';
import UIButton from '../../common/UIButton';
import UIChipSet from '../../common/UIChipSet';
import UIAddInfoDialog from '../../common/Producer/UIAddInfoDialog';
import {
    CloseIcon,
    AddCircleIcon
} from '../../common/CustomIcons';


const useStyles = makeStyles((theme) => ({
    header: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper
    },
    title: {
        flex: 1,
        marginLeft: theme.spacing(2),
    },
    mainTitle: {
        display: 'block',
        paddingTop: theme.spacing(4),
    },
    mh2: {
        margin: theme.spacing(2, 0, 2, 0)
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    desc: {
        color: theme.palette.text.desc
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BtnInfo = {
    open: "구성하기",
    complete: "완료",
    cancle: "취소"
};

const DialogInfo = {
    title: "PM 지정",
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

export default function AgencyAddDialog() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const _accessInfo = useSelector((store) => store.User.accessInfo);
    const _member = useSelector((store) => store.User.member);
    const _agencyInfo = useSelector((store) => store.Producer.agencyInfo);
    const dispatch = useDispatch();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
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
                delete_yn: 'N'
            };
            await axios.post('/api/org/person', condition)
                .then(res => {
                    setPersonRow(res.data);
                })
                .catch(err => console.error(err));
        }

        loadCategory();
        loadPersonRow();

        return () => {

        }

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(setAgencyInfoInit());
        setOpen(false);
    };

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
                        enqueueSnackbar('시작일이 비어 있습니다.', { variant: 'warning' });
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
                        enqueueSnackbar('종료일이 비어 있습니다.', { variant: 'warning' });
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
                        enqueueSnackbar('PM은 반드시 구성해야 합니다.', { variant: 'warning' });
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

        if (e.target.name === "desc") {
            console.log(e.target.value);
        };

        dispatch(setAgencyInfo({ ...nextValue }));
    }

    const handleSetAddInfo = data => {
        dispatch(setAgencyInfo({ ..._agencyInfo, addInfo: data }));
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
        console.log(data);

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        axios.post(URL, data, config)
            .then(res => {
                if (res.data.resultCode === 1) {
                    dispatch(setAgencyInfoInit());
                    enqueueSnackbar("등록에 성공했습니다.", { variant: 'success' });
                    history.goBack();
                } else {
                    enqueueSnackbar(res.data.resultCode, { variant: 'error' });
                }
            });
    }

    return (
        <div>
            <IconButton color="inherit" className={classes.trans} onClick={handleClickOpen}>
                <AddCircleIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.header} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="md">
                    <Typography className={classes.mainTitle} variant="h4" align="center">
                        기관/사업 등록
                    </Typography>
                    <Divider className={classes.mh2} />
                    <Container maxWidth="sm">
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    기관/사업 구분
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <FormControl variant="filled" fullWidth>
                                    {categoryList ?
                                        <Select
                                            native
                                            labelId="biz_area"
                                            id="biz_area"
                                            name="biz_area"
                                            value={_agencyInfo.biz_area ? _agencyInfo.biz_area : ""}
                                            onChange={handleChangeAgencyInfos}
                                        >
                                            {categoryList.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })}
                                        </Select>
                                        :
                                        ''
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    기관명 혹은 사업명
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="기관명 혹은 사업명"
                                    name="name"
                                    onChange={handleChangeAgencyInfos}
                                />
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    설명
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    placeholder="설명"
                                    name="desc"
                                    multiline
                                    minRows={4}
                                    onChange={handleChangeAgencyInfos}
                                    style={{ whiteSpace: "pre-wrap" }}
                                />
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    시작일
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <UIDatePicker
                                    fullWidth
                                    name="start_date"
                                    resultAction={handleChangeDate}
                                />
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    종료일
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <UIDatePicker
                                    fullWidth
                                    name="end_date"
                                    resultAction={handleChangeDate}
                                />
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    추가 정보 구성
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <UIAddInfoDialog
                                    btnProps={{
                                        start: {
                                            name: "구성하기",
                                            fullWidth: true
                                        },
                                        end: {
                                            name: "완료",
                                        }
                                    }}
                                    title="추가 구성"
                                    fullWidth
                                    maxWidth="md"
                                    subTitle="추가 정보를 구성해보세요."
                                    data={_agencyInfo.addInfo}
                                    action={handleSetAddInfo}
                                />
                                {
                                    (_agencyInfo.addInfo !== "" || _agencyInfo.addInfo.length !== 0) &&
                                    <Grid className={classes.mh2} container>
                                        {_agencyInfo.addInfo.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Grid item xs={6} md={6} lg={6}>
                                                        <Typography className={classes.desc} variant="body1">
                                                            {item.key}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={6} lg={6}>
                                                        <Typography variant="body1">
                                                            {item.value}
                                                        </Typography>
                                                    </Grid>
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid>
                                }
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    PM
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
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
                                        _agencyInfo.person.map((item, index) => {
                                            return (
                                                <UIChipSet
                                                    key={index}
                                                    data={item}
                                                />
                                            )
                                        })
                                    }
                                </Box>
                            </Grid>
                        </Grid>

                        <Box display="flex" justifyContent="center" alignItems="center" mt={8} mb={8}>
                            <UIButton
                                name="등록하기"
                                variant="contained"
                                action={handleValidateValue}
                                inputStyle={{ justifyContent: "flex-end" }}
                            />
                        </Box>

                    </Container>
                </Container>
            </Dialog>
        </div>
    );
}