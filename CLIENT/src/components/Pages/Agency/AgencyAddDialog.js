import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAgencyInfo, setAgencyInfoInit } from '../../../redux/action/ProducerAction'

import {
    Container, TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem,
    Grid
} from '@material-ui/core';

import Slide from '@material-ui/core/Slide';
import getDateFormat from '../../common/fn/getDateFormat';
import FNValidator from '../../common/FNValidator';
import UIPersonList from '../../common/UIPersonList';
import UIDatePicker from '../../common/UIDatePicker';
import AgencyAdditionalDialog from './AgencyAdditionalDialog';

import {
    BusinessIcon,
    CloseIcon,
    AddCircleIcon
} from '../../common/CustomIcons';
import UIChipSet from '../../common/UIChipSet';

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
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TextFieldInputProps = {
    min: 0,
    style: {
        textAlign: 'right'
    }
}

const defaultState = {
    name: "",
    desc: "",
    biz_area: ""
}

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
        <div>
            <IconButton color="inherit" className={classes.trans} onClick={handleClickOpen}>
                <AddCircleIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            기관 등록
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleValidateValue}>
                            등록하기
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Container maxWidth="xs">
                        <Typography className={classes.stepperTitleStyle} variant="h4" align="center">
                            <IconButton color="inherit">
                                <BusinessIcon />
                            </IconButton>
                            기관 등록
                        </Typography>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="사업 구분" />
                                    <FormControl className={classes.textFieldStyle} variant="filled">
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
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="기관명" />
                                    <TextField className={classes.textFieldStyle} variant="filled" placeholder="기관명" inputProps={TextFieldInputProps} name="name" onChange={handleChangeAgencyInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="기관 설명" />
                                    <TextField className={classes.textFieldStyle} variant="filled" placeholder="기관 설명" inputProps={TextFieldInputProps} name="desc" onChange={handleChangeAgencyInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="사업 시작일" />
                                    <UIDatePicker
                                        name="start_date"
                                        label="사업 시작일"
                                        class={classes.w100}
                                        resultAction={handleChangeDate}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="사업 종료일" />
                                    <UIDatePicker
                                        name="end_date"
                                        label="사업 종료일"
                                        class={classes.w100}
                                        resultAction={handleChangeDate}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="추가 정보" />
                                    <AgencyAdditionalDialog />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="기관 담당자" />
                                    <UIPersonList
                                        BtnInfo={BtnInfo}
                                        DialogInfo={DialogInfo}
                                        TableColumnName={TableColumnName}
                                        TableLoadedData={personRow !== null ? personRow.result : {}}
                                        ResultMessage={ResultMessage}
                                        ResultAction={ResultAction}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText />
                                    {
                                        _agencyInfo.person &&
                                        _agencyInfo.person.map((item, index) => {
                                            if (index > 5) {
                                                return false
                                            } else {
                                                return (
                                                    <UIChipSet
                                                        key={index}
                                                        data={item}
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </ListItem>
                                <Divider />

                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}