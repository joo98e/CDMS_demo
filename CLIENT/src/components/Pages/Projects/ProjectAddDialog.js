import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {
    TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem
} from '@material-ui/core';

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
    const [currentCategory, setCurrentCategory] = React.useState(0);
    const [infos, setInfos] = React.useState(null);

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
            <IconButton className={classes.trans} onClick={handleClickOpen}>
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
                            {/* {categoryList ?
                                <Select
                                    labelId="PROJ_CATEGORY"
                                    id="PROJ_CATEGORY"
                                    name="PROJ_CATEGORY"
                                    value={infos.PROJ_CATEGORY === null ? '' : infos.PROJ_CATEGORY}
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
                            } */}
                        </FormControl>
                    </ListItem>
                    <Divider />
                </List>
            </Dialog>
        </React.Fragment>
    );
}
