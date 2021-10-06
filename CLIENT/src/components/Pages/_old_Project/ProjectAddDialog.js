import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import {
    Container, TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem,
    Grid
} from '@material-ui/core';

import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import PersonList from './PersonList';

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
    alignBox: {
        display: 'flex',
        justifyContent: 'space-between',
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
    PROJ_TITLE: "",
    PROJ_CATEGORY : "",
    PROJ_DESCRIPTION : "",
    PROJ_MANAGER : "",
    PROJ_AGENCY_NAME : "",
    PROJ_AGENCY_MANAGER : "",
    PROJ_AGENCY_MANAGER_PHONE : "",
    PROJ_AGENCY_MANAGER_EMAIL : "",
    PROJ_MAX_TASK : ""
}

export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState(null);
    const [infos, setInfos] = React.useState(defaultState);
    const [steps, setSteps] = React.useState(0);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {

        const fetchCategory = async () => {
            await axios.get('api/projects/category')
                .then(res => {
                    setCategoryList(res.data);
                });
        }

        fetchCategory();

        return () => {

        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInfos(defaultState);
    };

    const handleValidateValue = () => {
        let _base = "PROJ_";
        
        for (let idx in infos) {
            
            switch (idx) {
                case _base + "TITLE":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('제목 없는 프로젝트는 없어요.', {variant:'warning'});
                        return false;
                    }
                    break;

                case _base + "CATEGORY":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('사업 구분이 필요합니다.', {variant:'warning'});
                        return false;
                    }
                    break;

                case _base + "DESCRIPTION":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('간단한 설명이라도 추가해주세요!', {variant:'warning'});
                        return false;
                    } else if (infos[idx].length < 10) {
                        enqueueSnackbar("짧아도 너무 짧은데요!", {variant:'error'});
                        return false;
                    }
                    break;

                case _base + "MANAGER":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('프로젝트 담당자이 필요합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case _base + "AGENCY_NAME":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('기관명이 필요합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case _base + "AGENCY_MANAGER":

                    break;

                case _base + "AGENCY_MANAGER_PHONE":

                    break;

                case _base + "AGENCY_MANAGER_EMAIL":

                    break;

                case _base + "MAX_TASK":

                    break;

                default:
                    break;
            }
        }
    }

    const handleChangeProjectInfos = (e) => {
        let nextValue = { ...infos }
        nextValue[e.target.name] = e.target.value;
        setInfos({ ...nextValue });
    }

    return (
        <div>
            <IconButton color="inherit" className={classes.trans} onClick={handleClickOpen}>
                <AddCircleIcon fontSize="large" />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            프로젝트 생성
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleValidateValue}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Container maxWidth="xs">
                        <Typography className={classes.stepperTitleStyle} variant="h4" align="center">
                            <IconButton color="inherit"><NotificationImportantIcon fontSize="large" /></IconButton>
                            프로젝트 생성
                        </Typography>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="프로젝트명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트명" inputProps={TextFieldInputProps} name="PROJ_TITLE" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 설명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 설명" inputProps={TextFieldInputProps} name="PROJ_DESCRIPTION" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 담당자" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 담당자" inputProps={TextFieldInputProps} name="PROJ_MANAGER" onChange={handleChangeProjectInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="프로젝트 참여 인원 구성" />
                                    <PersonList />
                                </ListItem>
                                <Divider />
                            </List>

                            <ListItem>
                                <ListItemText primary="기관명" />
                                <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관명" inputProps={TextFieldInputProps} name="PROJ_AGENCY_NAME" onChange={handleChangeProjectInfos} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="기관 담당자" />
                                <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관 담당자" inputProps={TextFieldInputProps} name="PROJ_AGENCY_MANAGER" onChange={handleChangeProjectInfos} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="기관 담당자 번호" />
                                <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관 담당자 번호" inputProps={TextFieldInputProps} name="PROJ_AGENCY_MANAGER_PHONE" onChange={handleChangeProjectInfos} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="기관 담당자 이메일 주소" />
                                <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관 담당자 이메일 주소" inputProps={TextFieldInputProps} name="PROJ_AGENCY_MANAGER_EMAIL" onChange={handleChangeProjectInfos} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="프로젝트 과업 수" />
                                <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 과업 수" inputProps={TextFieldInputProps} name="PROJ_MAX_TASK" onChange={handleChangeProjectInfos} />
                            </ListItem>
                            <Divider />
                        </Grid>
                        {/* <Box className={classes.center}>
                            <Button
                                className={classes.buttonStyle}
                                variant="outlined"
                                color="inherit"
                                onClick={() => {}}
                                size="large"
                            >
                                제출
                            </Button>
                        </Box> */}
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}




// const stepNames = [
//     '프로젝트',
//     '기관'
// ];

// const handleClickSteps = (type) => {
//     switch (type) {
//         case "NEXT":
//             setSteps(steps + 1);
//             break;

//         case "PREV":
//             setSteps(steps - 1);
//             break;

//         case "FINISH":
//             console.log("Finish");
//             setSteps(steps + 1);
//             break;

//         default:
//             break;
//     }
// }