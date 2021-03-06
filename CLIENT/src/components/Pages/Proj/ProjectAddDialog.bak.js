import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setProjectInfo, setProjectInfoInit } from '../../../redux/action/ProducerAction'
import {
    Container, TextField, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton,
    Grid
} from '@material-ui/core';

import ProjectAdditionalDialog from './ProjectAdditionalDialog'
import ProjectDatePicker from './ProjectDatePicker';
import Slide from '@material-ui/core/Slide';
import getDateFormat from '../../common/fn/getDateFormat';
import FNValidator from '../../common/FNValidator';
import UIPersonList from '../../common/UIPersonList';
import UIChipSet from '../../common/UIChipSet'
import {
    BusinessIcon,
    CloseIcon,
    AddCircleIcon
} from '../../common/CustomIcons';

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
    vw50: {
        width: "100%"
    },
    w50p: {
        width: "50%",
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
    const [open, setOpen] = React.useState(false);
    const [personRow, setPersonRow] = React.useState(null);

    React.useEffect(() => {

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
        loadPersonRow();

        return () => {

        }

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(setProjectInfoInit());
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
                        enqueueSnackbar('???????????? ????????? ????????? ????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "end_date":
                    if (_projectInfo[item] < _projectInfo.start_date) {
                        enqueueSnackbar('???????????? ????????? ????????? ????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "name":
                    if (!FNValidator("PROJNAME", _projectInfo[item])) {
                        enqueueSnackbar('??????, ????????? ????????? ??????????????? ?????? ??????, ??????, ????????? ?????? ???????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "desc":
                    if (_projectInfo[item] === "" || _projectInfo[item] === undefined) {
                        enqueueSnackbar('????????? ??????????????????.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "person":
                    if (_projectInfo[item].length === 0 || _projectInfo[item].length === undefined) {
                        enqueueSnackbar('???????????? ???????????? ???????????? ?????????.', { variant: 'warning' });
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
                    enqueueSnackbar("???????????? ????????? ??????????????????.", { variant: 'success' });
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
                            ???????????? ??????
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleValidateValue}>
                            ????????????
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Container maxWidth="xs">
                        <Typography className={classes.stepperTitleStyle} variant="h4" align="center">
                            <IconButton color="inherit">
                                <BusinessIcon />
                            </IconButton>
                            ???????????? ??????
                        </Typography>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="???????????????" />
                                    <TextField className={classes.textFieldStyle} variant="filled" label="???????????????" inputProps={TextFieldInputProps} name="name" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="???????????? ??????" />
                                    <TextField className={classes.textFieldStyle} variant="filled" label="???????????? ??????" inputProps={TextFieldInputProps} name="desc" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                {/* <ListItem>
                                    <ListItemText primary="???????????? ?????????" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="???????????? ?????????" inputProps={TextFieldInputProps} name="name" onChange={handleChangeProjectInfos} />
                                </ListItem> */}
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="???????????? ?????????" />
                                    <ProjectDatePicker
                                        name="start_date"
                                        textFieldStyle={classes.textFieldStyle}
                                        resultAction={handleChangeDate}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="???????????? ?????????" />
                                    <ProjectDatePicker
                                        name="end_date"
                                        textFieldStyle={classes.textFieldStyle}
                                        resultAction={handleChangeDate}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="?????? ??????" />
                                    <ProjectAdditionalDialog />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="???????????? ?????????" />
                                    <UIPersonList
                                        BtnInfo={BtnInfo}
                                        DialogInfo={DialogInfo}
                                        TableColumnName={TableColumnName}
                                        TableLoadedData={personRow !== null ? personRow.result : {}}
                                        ResultMessage={ResultMessage}
                                        ResultAction={ResultAction}
                                    />
                                    {
                                        _projectInfo.person &&
                                        _projectInfo.person.map((item, index) => {
                                            return (
                                                <UIChipSet
                                                    data={item}
                                                />
                                            )
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