import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {
    Container, TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem,
    Stepper, Step, StepLabel, StepContent
} from '@material-ui/core';

import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
        '첫번째',
        '두번째',
        '세번째'
    ];

    const contents = [
        '알아주세요알아주세요알아주세요알아주세요알아주세요알아주세요알아주세요알아주세요.',
        '말해주세요.',
        '마지막입니다.'
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeProjectInfos = (e) => {
        let nextValue = { ...infos }
        nextValue[e.target.name] = e.target.value;
        setInfos({ ...nextValue });
        console.log(infos);
    }

    return (
        <React.Fragment>
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
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Typography className={classes.stepperTitleStyle} variant="h4" align="center">
                        <Typography variant="h4" align="right">
                            {`${steps + 1}/${stepNames.length}`}
                        </Typography>
                        <IconButton color="inherit"><NotificationImportantIcon fontSize="large" /></IconButton>
                        프로젝트를 알려주세요!
                    </Typography>
                    <Divider />

                    <Stepper>
                        {/* TODO Stepper */}
                        {/* TODO 아래 List 태그 안에 있는 것들을 한 가지의
                                 함수로 묶거나 배열로 묶어서 저장하고 
                                 map으로 요기서 반복하게끔 만들기!!
                        */}
                    </Stepper>

                    <List>
                        <ListItem>
                            <ListItemText primary="프로젝트명" />
                            <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트명" inputProps={TextFieldInputProps} name="PROJ_TITLE" onChange={handleChangeProjectInfos} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="기관명" />
                            <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관명" inputProps={TextFieldInputProps} name="PROJ_AGENCY_NAME" onChange={handleChangeProjectInfos} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="사업 구분" />
                            <FormControl className={classes.textFieldStyle} variant="outlined">
                                {/* TODO 사업 구분 해야함 */}
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
                                                <MenuItem key={index} value={item.PROJECT_CATEGORY_PK}>{item.PROJECT_CATEGORY_NAME}</MenuItem>
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
                            <ListItemText primary="프로젝트 기관 담당자" />
                            <TextField className={classes.textFieldStyle} variant="outlined" placeholder="프로젝트 설명" inputProps={TextFieldInputProps} name="PROJ_DESCRIPTION" onChange={handleChangeProjectInfos} />
                        </ListItem>
                        <Divider />
                    </List>
                </Container>
            </Dialog>
        </React.Fragment>
    );
}
