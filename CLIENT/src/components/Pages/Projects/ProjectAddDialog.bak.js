import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {
    Container, TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem,
    Stepper, Step, StepLabel, StepContent, Grid, Box
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
        margin: '0 10px'
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

export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState(null);
    const [infos, setInfos] = React.useState(Object);
    const [steps, setSteps] = React.useState(0);

    React.useEffect(() => {

        const fetchCategory = async () => {
            await axios.get('/projects/category')
                .then(res => {
                    setCategoryList(res.data);
                });
        }

        fetchCategory();

        return () => {

        }
    }, []);

    const stepNames = [
        '프로젝트',
        '기관'
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSteps(0);
    };

    const handleChangeProjectInfos = (e) => {
        let nextValue = { ...infos }
        nextValue[e.target.name] = e.target.value;
        setInfos({ ...nextValue });
        console.log(infos);
    }

    const handleClickSteps = (type) => {
        switch (type) {
            case "NEXT":
                setSteps(steps + 1);
                break;

            case "PREV":
                setSteps(steps - 1);
                break;

            case "FINISH":
                setSteps(steps + 1);
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <IconButton color="inherit" className={classes.trans} onClick={handleClickOpen}>
                <AddCircleIcon fontSize="large" />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            프로젝트 생성
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <Container>
                    <Container maxWidth="xs">
                        <Typography className={classes.stepperTitleStyle} variant="h4" align="center">
                            <IconButton color="inherit"><NotificationImportantIcon fontSize="large" /></IconButton>
                            {steps !== stepNames.length ? `${stepNames[steps]}` : `${infos.PROJ_TITLE}`}
                        </Typography>
                        <Stepper activeStep={steps} orientation={'horizontal'}>
                            {/* TODO Stepper 
                                    아래 List 태그 안에 있는 것들을 한 가지의
                                    함수로 묶거나 배열로 묶어서 저장하고 
                                    map으로 요기서 반복하게끔 만들기!!
                                */}
                            {stepNames.map((name, index) => {
                                return (
                                    <Step key={index}>
                                        <StepLabel>{name}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <Box className={classes.center}>
                            {
                                steps !== stepNames.length
                                &&
                                <div className={classes.alignBox}>
                                    <Button className={classes.buttonStyle} variant="outlined" color="inherit" onClick={() => { handleClickSteps("PREV") }} disabled={steps === 0} size="large">이전</Button>
                                    <Button className={classes.buttonStyle} variant="outlined" color="inherit" onClick={() => { handleClickSteps(steps === stepNames.length - 1 ? "FINISH" : "NEXT") }} size="large">
                                        {steps === stepNames.length - 1 ? "제출" : "다음"}
                                    </Button>
                                </div>
                            }
                        </Box>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        {
                            steps === 0 &&

                            <Grid item xs={12} md={12} lg={12}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="프로젝트명" />
                                        <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트명" inputProps={TextFieldInputProps} name="PROJ_TITLE" onChange={handleChangeProjectInfos} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="사업 구분" />
                                        <FormControl className={classes.textFieldStyle} variant="outlined">
                                            {categoryList ?
                                                <Select
                                                    labelId="PROJ_CATEGORY"
                                                    id="PROJ_CATEGORY"
                                                    name="PROJ_CATEGORY"
                                                    value={infos.PROJ_CATEGORY ? infos.PROJ_CATEGORY : ''}
                                                    onChange={handleChangeProjectInfos}
                                                >
                                                    {categoryList.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.CATEGORY_PK}>{item.CATEGORY_NAME}</MenuItem>
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
                                        <ListItemText primary="프로젝트 설명" />
                                        <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 설명" inputProps={TextFieldInputProps} name="PROJ_DESCRIPTION" onChange={handleChangeProjectInfos} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="프로젝트 담당자" />
                                        <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 담당자" inputProps={TextFieldInputProps} name="PROJ_DESCRIPTION" onChange={handleChangeProjectInfos} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="프로젝트 참여 인원 구성" />
                                        <PersonList />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grid>

                        }

                        {
                            steps === 1 &&

                            <Grid item xs={12} md={12} lg={12}>
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
                            </Grid>
                        }
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}
