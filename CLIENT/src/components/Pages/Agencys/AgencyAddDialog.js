import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
    Container, TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem,
    Grid
} from '@material-ui/core';

import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FNValidator from '../../common/FNValidator';
import UIPersonList from '../../common/UIPersonList';

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
    const _tmp = useSelector((store) => store.user.accessInfo);
    const _members = useSelector((store) => store.user.member);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [infos, setInfos] = React.useState(defaultState);
    const [categoryList, setCategoryList] = React.useState(null);
    const [personRow, setPersonRow] = React.useState(null);
    const [accessInfos] = React.useState(_tmp);
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {

        const loadCategory = async () => {
            const condition = {
                delete_yn: 'N'
            };
            await axios.get('api/agency/category', {
                params: condition
            })
                .then(res => {
                    setCategoryList(res.data.result);
                    console.log(res.data);
                });
        }

        const loadPersonRow = async () => {
            const condition = {
                inside_yn: 'Y',
                delete_yn: 'N'
            };
            await axios.post('api/org/person', condition)
                .then(res => {
                    setPersonRow(res.data);
                    console.log(res.data);
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
        setOpen(false);
        setInfos(defaultState);
    };

    const handleValidateValue = () => {
        for (let item in infos) {

            switch (item) {
                case "name":
                    if (!FNValidator("AGCYNAME", infos[item])) {
                        enqueueSnackbar('한글, 영문이 반드시 포함되어야 하며 한글, 영문, 숫자만 사용 가능합니다.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "desc":
                    if (infos[item] === "" || infos[item] === undefined) {
                        enqueueSnackbar('설명을 기재해주세요!', { variant: 'warning' });
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
        let nextValue = { ...infos }
        nextValue[e.target.name] = e.target.value;
        setInfos({ ...nextValue });
        console.log(infos);
    }

    const handleClickAddAgency = () => {
        const URL = 'api/agency/add';
        const data = {
            ...infos,
            ...accessInfos,
            ..._members
        }
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        axios.post(URL, data, config);
        console.log("posted");
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
                            기관 등록
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
                            기관 등록
                        </Typography>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="사업 구분" />
                                    <FormControl className={classes.textFieldStyle} variant="outlined">
                                        {categoryList ?
                                            <Select
                                                labelId="biz_area"
                                                id="biz_area"
                                                name="biz_area"
                                                value={infos.biz_area ? infos.biz_area : ''}
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
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관명" inputProps={TextFieldInputProps} name="name" onChange={handleChangeAgencyInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="기관 설명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관 설명" inputProps={TextFieldInputProps} name="desc" onChange={handleChangeAgencyInfos} />
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
                                    />
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