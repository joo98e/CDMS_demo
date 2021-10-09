import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams  } from 'react-router-dom';
import { setProjectInfo } from '../../../../redux/action/ProducerAction'

import {
    Container, TextField, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton,
    Grid, Chip, Avatar
} from '@material-ui/core';

import ProjectAdditionalDialog from './ProjectAdditionalDialog'
import ProjectDatePicker from './ProjectDatePicker';
import Slide from '@material-ui/core/Slide';
import getDateFormat from '../../../common/fn/getDateFormat';
import FNValidator from '../../../common/FNValidator';
import UIPersonList from '../../../common/UIPersonList';

import {
    BusinessIcon,
    CloseIcon,
    AddCircleIcon
} from '../../../common/CustomIcons';

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
    title: "프로젝트 등록",
    subTitle: "담당자 지정"
};
const TableColumnName = [
    "",
    "성명",
    "부서",
    "ID",
    "직책",
    "구성",
];

const ResultMessage = {
    success: "담당자가 지정되었습니다.",
    fail: "담당자 지정을 취소합니다."
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
    const [open, setOpen] = React.useState(false);
    const [personRow, setPersonRow] = React.useState(null);

    React.useEffect(() => {

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
        loadPersonRow();

        return () => {

        }

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(setProjectInfo(defaultState));
        setOpen(false);
    };

    const handleChangeDate = (value, name) => {
        const _result = name === "start_date" ? getDateFormat.YYYYMMDDHHMMSS_BEGIN(value) : getDateFormat.YYYYMMDDHHMMSS_END(value);

        let nextValue = { ..._projectInfo }
        nextValue[name] = _result;
        dispatch(setProjectInfo({ ...nextValue }));
    }

    const handleValidateValue = () => {
        
        for (let item in _projectInfo) {
            switch (item) {
                case "start_date":
                    if (_projectInfo[item] > _projectInfo.end_date) {
                        enqueueSnackbar('프로젝트 기간이 알맞지 않습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "end_date":
                    if (_projectInfo[item] < _projectInfo.start_date) {
                        enqueueSnackbar('프로젝트 기간이 알맞지 않습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "name":
                    if (!FNValidator("PROJNAME", _projectInfo[item])) {
                        enqueueSnackbar('한글, 영문이 반드시 포함되어야 하며 한글, 영문, 숫자만 사용 가능합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "desc":
                    if (_projectInfo[item] === "" || _projectInfo[item] === undefined) {
                        enqueueSnackbar('설명을 기재해주세요.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "person":
                    if (_projectInfo[item].length === 0 || _projectInfo[item].length === undefined) {
                        enqueueSnackbar('프로젝트 담당자를 구성해야 합니다.', { variant: 'warning' });
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
                    dispatch(setProjectInfo({
                        ..._projectInfo,
                        person: []
                    }));
                    enqueueSnackbar("프로젝트 등록에 성공했습니다.", { variant: 'success' });
                    history.go(0);
                } else {
                    enqueueSnackbar(res.data.resultCode, { variant: 'error' });
                }
            });
    }

    return (
        <div>
            <IconButton color="inherit" className={classes.trans} onClick={handleClickOpen}>
                {AddCircleIcon}
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            {CloseIcon}
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            프로젝트 등록
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
                                {BusinessIcon}
                            </IconButton>
                            프로젝트 등록
                        </Typography>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="프로젝트명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트명" inputProps={TextFieldInputProps} name="name" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 설명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 설명" inputProps={TextFieldInputProps} name="desc" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                {/* <ListItem>
                                    <ListItemText primary="프로젝트 썸네일" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 썸네일" inputProps={TextFieldInputProps} name="name" onChange={handleChangeProjectInfos} />
                                </ListItem> */}
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 시작일" />
                                    <ProjectDatePicker
                                        name="start_date"
                                        resultAction={handleChangeDate}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 종료일" />
                                    <ProjectDatePicker
                                        name="end_date"
                                        resultAction={handleChangeDate}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="추가 정보" />
                                    <ProjectAdditionalDialog />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 담당자" />
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
                                        _projectInfo.person &&
                                        _projectInfo.person.map((item, index) => {
                                            if (index > 5) {
                                                return "";
                                            } else {
                                                return (
                                                    <Chip key={item.seq} avatar={<Avatar src={item.avatar_path} />} label={`${item.full_name}`} />
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