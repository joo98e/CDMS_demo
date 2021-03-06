import React, { useState, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid, Input
} from '@material-ui/core'
import UIButton from '../UIButton';
import FNValidator from '../FNValidator';

export const UIAddInfoDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [infos, setInfos] = useState([]);
    const [length, setLength] = useState(null);

    const handleFormCalc = type => {
        let keyForm = document.getElementsByName(`key_${length}`)[0];
        let valueForm = document.getElementsByName(`value_${length}`)[0];

        switch (type) {
            case "push":
                if (keyForm.value === "" || valueForm.value === "") {
                    return enqueueSnackbar("한 가지 이상의 값이 비어 있습니다.", { variant: "error" });
                } else {
                    // 추가
                    let nextState = [...infos, { key: "", value: "" }];
                    setInfos(nextState);
                    setLength(length + 1);
                }

                setTimeout(() => {
                    document.getElementsByName(`key_${length + 1}`)[0].focus();
                }, 50);
                break;

            case "pop":
                let nextState = [...infos];
                nextState.pop();
                props.action(nextState);
                break;

            default:
                break;
        }

    }

    const handleChangeValue = (e) => {
        const _type = e.target.name.indexOf("key") !== -1 ? "key" : "value";
        const target = e.target.name.replace(/\D/g, "") - 1;
        const nextState = [...infos];

        if (_type === "key")
            nextState[target].key = e.target.value;
        else if (_type === "value")
            nextState[target].value = e.target.value;

        setInfos(nextState);
    }

    const handleChangeStatus = () => {
        setOpen(!open ? true : false);

        if (props.action) {
            props.action(infos);
        }
    }

    useEffect(() => {
        if (!FNValidator("EMPTY", props.data)) {
            setInfos([{ key: "", value: "" }]);
            setLength(1);
        } else {
            setInfos(props.data);
            setLength(props.data.length);
        }

        return () => {

        }
    }, [props.data]);

    return (
        <React.Fragment>
            <UIButton
                name={props.btnProps.start.name ? props.btnProps.start.name : "버튼"}
                fullWidth={props.btnProps.start.fullWidth ? true : false}
                variant="contained"
                action={handleChangeStatus}
            />
            <Dialog
                open={open}
                onClose={handleChangeStatus}
                maxWidth={props.maxWidth ? props.maxWidth : false}
                fullWidth={props.fullWidth ? true : false}
            >
                {props.title &&
                    <DialogTitle>{props.title}</DialogTitle>
                }
                <DialogContent>
                    {props.title &&
                        <DialogContentText>{props.subTitle}</DialogContentText>
                    }

                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                            <Input
                                fullWidth
                                placeholder="(예시) 주소"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Input
                                fullWidth
                                placeholder="(예시) 서울특별시 강서구 양천로 615-10"
                                disabled
                            />
                        </Grid>

                        {
                            (infos && infos.length !== 0) &&
                            infos.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <Input
                                                fullWidth
                                                placeholder="이름"
                                                name={`key_` + (index + 1)}
                                                value={item.key}
                                                onChange={handleChangeValue}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <Input
                                                fullWidth
                                                placeholder="값"
                                                name={`value_` + (index + 1)}
                                                value={item.value}
                                                onChange={handleChangeValue}
                                                onKeyUp={e => e.key === "Enter" && handleFormCalc("push")}
                                            />
                                        </Grid>
                                    </React.Fragment>
                                )
                            })
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <UIButton
                        name="항목 추가"
                        variant="contained"
                        action={() => handleFormCalc("push")}
                    />
                    <UIButton
                        name="항목 삭제"
                        variant="contained"
                        action={() => handleFormCalc("pop")}
                    />
                    <UIButton
                        name={props.btnProps.end.name}
                        variant="contained"
                        action={handleChangeStatus}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default UIAddInfoDialog
