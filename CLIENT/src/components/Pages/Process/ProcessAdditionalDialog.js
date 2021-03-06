import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import * as actions from '../../../redux/action/ProducerAction'

import {
    Button, withStyles,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid, Input, Tooltip
} from '@material-ui/core'

import FNValidator from '../../common/FNValidator'
import UIButton from '../../common/UIButton'

const styles = theme => ({
    flexBox: {
        display: 'flex'
    },
    textFieldStyle: {
        width: '100%',
        textAlign: 'right'
    },
});

export class ProcessAdditionalDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            nowLength: this.props.processInfo.addInfo.length !== 0 ?
                this.props.processInfo.addInfo.length
                :
                1,
            data: this.props.processInfo.addInfo.length !== 0 ?
                this.props.processInfo.addInfo
                :
                [
                    {
                        key: "",
                        value: ""
                    }
                ]
        }
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

    nullCheck = () => {
        try {
            if (this.state.data.length !== 0) {
                let _key = document.getElementsByName(`key_${this.state.nowLength}`)[0].value
                let _value = document.getElementsByName(`value_${this.state.nowLength}`)[0].value
                FNValidator("EMPTY", this.state.data);

                if (!_key || !_value) {
                    this.props.enqueueSnackbar("key ?????? value??? ?????? ????????????.", { variant: "warning" });
                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleAddField = () => {
        if (this.nullCheck()) return false;

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

    handleChangeStatus = () => {
        if (this.state.isOpen) {
            if (this.nullCheck()) {
                return false;
            } else {
                if (Array.isArray(this.state.data) && this.state.data.length !== 0) {
                    this.props.setProcessInfo({
                        ...this.props.processInfo,
                        addInfo: JSON.stringify(this.state.data)
                    });
                }
            };
            
            this.state.data.length !== 0 ?
                this.props.enqueueSnackbar("?????? ?????? ????????? ?????????????????????.", { variant: "success" })
                :
                this.props.enqueueSnackbar("????????? ????????? ????????????.", { variant: "warning" })
        }

        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen ? true : false,
        });
    }

    handleRemoveField = () => {
        if (this.state.data.length === 0) {
            return this.props.enqueueSnackbar("??? ?????? ????????? ????????? ????????????.", { variant: "error" })
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
                    class={classes.textFieldStyle}
                    name="????????????"
                    variant="contained"
                    tip=""
                    color="primary"
                    action={this.handleChangeStatus}
                />

                {
                    this.state.isOpen &&
                    <Dialog className={classes.dialog} open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="md">
                        <DialogTitle>
                            ???????????? ??????
                        </DialogTitle>

                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <DialogContentText className={classes.flexBox}>
                                        ?????? ????????? ??????????????????.
                                    </DialogContentText>
                                </Grid>

                                <Grid item xs={6} md={6} lg={6}>
                                    <Input
                                        fullWidth
                                        placeholder="?????? : ???????????????"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Input
                                        fullWidth
                                        placeholder="?????? : ????????????"
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
                                                        id={`key_${index + 1}`}
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
                            <Tooltip title="??????????????? ?????? ????????? ????????????.">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    onClick={this.handleAddField}
                                >
                                    ?????? ??????
                                </Button>
                            </Tooltip>
                            <Tooltip title="DELETE????????? ?????? ????????? ????????????.">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    onClick={this.handleRemoveField}
                                >
                                    ?????? ?????? ??????
                                </Button>
                            </Tooltip>
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={this.handleChangeStatus}
                            >
                                ??????
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    processInfo: state.Producer.processInfo
})

const mapDispatchToProps = dispatch => {
    return {
        setProcessInfo: payload => { dispatch(actions.setProcessInfo(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(ProcessAdditionalDialog)));