/** 
 * @param {}
 * @param {}
 * @param {}
 * @returns {}
 */

import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

import {
    Button, withStyles,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid,  Input, Tooltip
} from '@material-ui/core'
import UIButton from '../../common/UIButton';
import * as actions from '../../../redux/action/ProducerAction'

const styles = theme => ({
    flexBox: {
        display: 'flex'
    },
    w100: {
        width: '100%'
    },
});

export class AgencyAdditionalDialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            nowLength: this.props.agencyInfo.addInfo.length !== 0 ?
                this.props.agencyInfo.addInfo.length
                :
                1,
            data: this.props.agencyInfo.addInfo.length !== 0 ?
                this.props.agencyInfo.addInfo
                :
                [
                    {
                        key: "",
                        value: ""
                    }
                ]
        }
    }

    handleChangeStatus = () => {

        if (this.state.isOpen) {
            if (this.nullCheck()) {
                return false;
            } else {
                if (Array.isArray(this.state.data) && this.state.data.length !== 0) {
                    this.props.setAgencyInfo({
                        ...this.props.agencyInfo,
                        addInfo: JSON.stringify(this.state.data)
                    });
                 }
            };

            this.props.enqueueSnackbar("추가 정보 구성이 완료되었습니다.", { variant: "success" });
        }
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen ? true : false
        });
    }

    handleChangeValue = (e) => {
        const _type = e.target.name.indexOf("key") !== -1 ? "key" : "value";
        const target = e.target.name.replace(/\D/g, "") - 1;
        const nextState = [...this.state.data];

        if (_type === "key")
            nextState[target].key = e.target.value;
        else if (_type === "value")
            nextState[target].value = e.target.value;

        this.setState({
            ...this.state,
            data: nextState
        });
    }

    handleAddField = () => {
        if (this.nullCheck()) return;

        this.setState({
            ...this.state,
            nowLength: this.state.nowLength + 1,
            data: [
                ...this.state.data,
                {
                    key: "",
                    value: ""
                }
            ]
        });
    }

    nullCheck = () => {
        try {
            if (this.state.data.length !== 0) {
                let _key = document.getElementsByName(`key_${this.state.nowLength}`)[0].value;
                let _value = document.getElementsByName(`value_${this.state.nowLength}`)[0].value;

                if ((!_key || !_value)) {
                    this.props.enqueueSnackbar("key 혹은 value가 비어 있습니다.", { variant: "warning" });
                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            console.log("error", error);
            console.log("this.state.data", this.state.data);
            console.log("this.props.agencyInfo.addInfo", this.props.agencyInfo.addInfo);
        }

    }

    handleRemoveField = () => {
        if (this.state.data.length === 0) {
            return this.props.enqueueSnackbar("더 이상 삭제할 항목이 없습니다.", { variant: "error" })
        }
        let nextState = [...this.state.data];
        nextState.pop();

        this.setState({
            ...this.state,
            nowLength: this.state.nowLength - 1,
            data: nextState
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div
                onKeyUp={e => {
                    if (e.key === "Enter") {
                        this.handleAddField();
                    } else if (e.key === "Delete") {
                        this.handleRemoveField();
                    }
                }}
            >
                
                <UIButton
                    class={classes.w100}
                    name="구성하기"
                    variant="contained"
                    color="primary"
                    action={this.handleChangeStatus}
                />

                {
                    this.state.isOpen &&
                    <Dialog className={classes.dialog} open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="md">
                        <DialogTitle>
                            기관 등록
                        </DialogTitle>

                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <DialogContentText className={classes.flexBox}>
                                        추가 정보를 구성해보세요.
                                    </DialogContentText>
                                </Grid>

                                <Grid item xs={6} md={6} lg={6}>
                                    <Input
                                        fullWidth
                                        placeholder="예시 : 기관 위치"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Input
                                        fullWidth
                                        placeholder="예시 : 서울특별시 강서구 양천로 583"
                                        disabled
                                    />
                                </Grid>

                                {
                                    this.state.data &&
                                    this.state.data.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Grid item xs={6} md={6} lg={6}>
                                                    <Input
                                                        fullWidth
                                                        placeholder="key"
                                                        name={`key_${index + 1}`}
                                                        value={item.key}
                                                        onChange={this.handleChangeValue}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6}>
                                                    <Input
                                                        fullWidth
                                                        placeholder="value"
                                                        name={`value_${index + 1}`}
                                                        value={item.value}
                                                        onChange={this.handleChangeValue}
                                                    />
                                                </Grid>
                                            </React.Fragment>
                                        )
                                    })
                                }

                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Tooltip title="엔터키로도 항목 추가가 가능해요.">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    onClick={this.handleAddField}
                                >
                                    항목 추가
                                </Button>
                            </Tooltip>
                            <Tooltip title="DELETE키로도 항목 제거가 가능해요.">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    onClick={this.handleRemoveField}
                                >
                                    최근 항목 제거
                                </Button>
                            </Tooltip>
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={this.handleChangeStatus}
                            >
                                완료
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    agencyInfo: state.Producer.agencyInfo
})

const mapDispatchToProps = dispatch => {
    return {
        setAgencyInfo: payload => { dispatch(actions.setAgencyInfo(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(AgencyAdditionalDialog)));