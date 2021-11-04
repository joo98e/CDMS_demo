import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setProjectInfo, setProjectInfoInit } from '../../../redux/action/ProducerAction'

import {
    Grid, Box, Container, TextField, Dialog, Typography, Divider, AppBar,
    Toolbar, IconButton, Slide, makeStyles,
} from '@material-ui/core';
import {
    CloseIcon,
    AddCircleIcon
} from '../../common/CustomIcons';

import { main, sub } from './ProjectAddOffer'
import FNValidator from '../../common/FNValidator';
import getDateFormat from '../../common/fn/getDateFormat';
import UIChipSet from '../../common/UIChipSet'
import UIDatePicker from '../../common/UIDatePicker'
import UIAddInfoDialog from '../../common/Producer/UIAddInfoDialog';
import UIPersonList from '../../common/UIPersonList';
import UIPersonListOnlyOne from '../../common/UIPersonListOnlyOne';
import API from '../../common/API';
import UIButton from '../../common/UIButton';

const useStyles = makeStyles(theme => ({
    root: {

    },
    header: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    mainTitle: {
        display: 'block',
        paddingTop: theme.spacing(4),
    },
    mh2: {
        margin: theme.spacing(2, 0, 2, 0)
    },
    desc: {
        color: theme.palette.text.desc
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectAddDialog = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const _member = useSelector((store) => store.User.member);
    const _accessInfo = useSelector((store) => store.User.accessInfo);
    const _projectInfo = useSelector((store) => store.Producer.projectInfo);
    const { ref_agcy_id } = useParams();
    const [open, setOpen] = useState(false);
    const [worker, setWorker] = useState([]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        dispatch(setProjectInfoInit());
        setOpen(false);
    };

    const handleChangeProjectInfos = (e) => {
        let nextValue = { ..._projectInfo }
        nextValue[e.target.name] = e.target.value;

        if (e.target.name === "desc") {
            console.log(e.target.value);
        };

        dispatch(setProjectInfo({ ...nextValue }));
    }

    const handleChangeDate = (value, name) => {
        const _result = name === "start_date" ? getDateFormat.YYYYMMDDHHMMSS_BEGIN(value) : getDateFormat.YYYYMMDDHHMMSS_END(value);

        let nextValue = { ..._projectInfo }
        nextValue[name] = _result;
        dispatch(setProjectInfo({ ...nextValue }));
    }

    const handleSetAddInfo = data => {
        dispatch(setProjectInfo({ ..._projectInfo, addInfo: data }));
    }

    const ResultAction = {
        main: {
            success: data => {
                dispatch(setProjectInfo({
                    ..._projectInfo,
                    mainPerson: data
                }));
            },
            fail: () => {
                console.log("fail");
            }
        },
        sub: {
            success: data => {
                dispatch(setProjectInfo({
                    ..._projectInfo,
                    subPerson: data
                }))
            },
            fail: () => {
                console.log("fail");
            }
        }
    }
    const handleValidateValue = () => {
        const target = _projectInfo;
        for (let item in target) {

            switch (item) {
                case "name":
                    if (!FNValidator("PROJNAME", target[item])) {
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
                            enqueueSnackbar('과정 기간을 확인해주세요.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('과정 시작일이 비어 있습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "end_date":
                    if (target[item] !== null) {
                        if (target[item] < target.start_date) {
                            enqueueSnackbar('과정 기간을 확인해주세요.', { variant: 'warning' });
                            return false;
                        }
                    } else if (target[item] === null) {
                        enqueueSnackbar('과정 종료일이 비어 있습니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "mainPerson":
                    console.log(target[item]);
                    
                    if (!FNValidator("EMPTY", target[item])) {
                        enqueueSnackbar('담당자는 반드시 구성해야 합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }

        handleSubmitProjectInsert();
    }

    const handleSubmitProjectInsert = () => {
        const URL = "/api/project/add";
        const data = {
            ..._accessInfo,
            ..._member,
            ..._projectInfo,
            ref_agcy_id: ref_agcy_id,
        }
        API.post(URL, data)
            .then(res => console.log(res));
    }

    useEffect(() => {
        API.post("/api/org/person", { delete_yn: "N" })
            .then(res => setWorker(res.data.result));

    }, [_member, ref_agcy_id, _accessInfo])

    return (
        <React.Fragment>
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
                        과정 등록
                    </Typography>
                    <Divider className={classes.mh2} />

                    <Container maxWidth="sm">
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    과정명
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="name"
                                    onChange={handleChangeProjectInfos}
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
                                    onChange={handleChangeProjectInfos}
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
                                    data={_projectInfo.addInfo}
                                    action={handleSetAddInfo}
                                />
                                {
                                    (_projectInfo.addInfo !== "" || _projectInfo.addInfo.length !== 0) &&
                                    <Grid className={classes.mh2} container>
                                        {_projectInfo.addInfo.map((item, index) => {
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
                                    주담당자
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <UIPersonListOnlyOne
                                    BtnInfo={main.BtnInfo}
                                    DialogInfo={main.DialogInfo}
                                    TableColumnName={main.TableColumnName}
                                    TableLoadedData={worker ? worker : [{}]}
                                    ResultMessage={main.ResultMessage}
                                    ResultAction={ResultAction.main}
                                />
                                <Box mt={2}>
                                    {
                                        !_projectInfo.mainPerson ?
                                            ""
                                            :
                                            <UIChipSet
                                                data={_projectInfo.mainPerson}
                                            />
                                    }
                                </Box>
                            </Grid>
                        </Grid>

                        <Divider className={classes.mh2} />

                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={4} lg={4}>
                                <Typography component="div">
                                    참여자
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <UIPersonList
                                    BtnInfo={sub.BtnInfo}
                                    DialogInfo={sub.DialogInfo}
                                    TableColumnName={sub.TableColumnName}
                                    TableLoadedData={worker ? worker : [{}]}
                                    ResultMessage={sub.ResultMessage}
                                    ResultAction={ResultAction.sub}
                                />
                                <Box mt={2}>
                                    {
                                        _projectInfo.subPerson &&
                                        _projectInfo.subPerson.map((item, index) => {
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

                        <Divider className={classes.mh2} />

                        <Box mt={4} mb={4} align="center">
                            <UIButton
                                name="등록하기"
                                variant="contained"
                                action={handleValidateValue}
                            />
                        </Box>
                    </Container>
                </Container>
            </Dialog>
        </React.Fragment>
    )
}

export default ProjectAddDialog
