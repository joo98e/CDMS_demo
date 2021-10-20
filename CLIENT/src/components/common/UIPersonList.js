/** 
 * @param {BtnInfo}                      : props / Required
 * @param {DialogInfo}                   : props / Required
 * @param {TableColumnName}              : props / Required
 * @param {TableLoadedData}              : props / Required
 * @param {ResultMessage}                : props / Required
 * @param {ResultAction}                 : props / success, fail로 데이터 반환 및 처리할 것
 * @returns {}
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withSnackbar } from 'notistack';

import {
    Button, withStyles, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, Paper,
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, InputBase, IconButton, Tooltip
} from '@material-ui/core'
import UIButton from './UIButton';
import UICircularProgress from '../common/UICircularProgress';
import UIPersonRow from '../common/UIPersonRow';
import { SearchIcon } from './CustomIcons';

const styles = theme => ({
    textFieldStyle: {
        width: '100%',
        textAlign: 'right',
    },
    wrapper: {
        height: '70vh',
    },
    flexBox: {
        display: 'flex'
    },
    dialog: {
        position: 'relative'
    },
    srchBox: {
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
    }
});

export class UIPersonList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            data: [],
            srchWord: null,
            srchData: this.props.TableLoadedData
        }
    }

    componentDidMount() {
        this.handleSearchButton();
    }



    UIPersonRowChangeData = newItem => {
        let _temp = this.state.data;
        let status = false;

        for (let idx in _temp) {
            if (_temp[idx].seq === newItem.seq) {
                _temp.splice(idx, 1);
                status = true;
            }
        }

        if (status) {
            this.setState({
                ...this.state,
                data: [..._temp]
            });
        } else {
            this.setState({
                ...this.state,
                data: [
                    ...this.state.data,
                    newItem
                ]
            });
        }
    }

    handleChangeStatus = (type) => {
        this.setState({
            isOpen: !this.state.isOpen ? true : false,
            data: []
        });

        if (type === "SUBMIT") {
            if (this.props.ResultAction) this.props.ResultAction.success(this.state.data);
            this.props.enqueueSnackbar(this.props.ResultMessage.success, { variant: 'success' });

        } else if (type === "CANCLE") {
            if (this.props.ResultAction) this.props.ResultAction.fail();
            this.props.enqueueSnackbar(this.props.ResultMessage.fail, { variant: 'warning' });
        }
    }

    handleChangeSrchWord = e => {
        this.setState({
            srchWord: e.target.value
        });

        let _target = [];

        this.props.TableLoadedData &&
            this.props.TableLoadedData.filter(data => {
                if (this.state.srchWord === null || this.state.srchWord === "") {
                    _target = this.props.TableLoadedData;
                }
                else if (data.full_name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    _target = [
                        ..._target,
                        data
                    ]
                }
            });

        this.setState({
            srchData: _target
        });
    }

    handleSearchButton = () => {

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <UIButton
                    class={classes.textFieldStyle}
                    name="구성하기"
                    variant="contained"
                    color="primary"
                    action={this.handleChangeStatus}
                />
                {
                    this.state.isOpen &&
                    <Dialog className={classes.dialog} open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="lg">
                        <DialogTitle>
                            {this.props.DialogInfo.title}
                        </DialogTitle>

                        <Box className={classes.srchBox}>
                            <Tooltip title="이름으로 검색해보세요!">
                                <IconButton
                                    onClick={this.handleSearchButton}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                            <InputBase
                                name="srchWord"
                                placeholder="이름으로 검색하기"
                                onChange={this.handleChangeSrchWord}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        this.handleSearchButton();
                                    }
                                }}
                            />
                        </Box>

                        <DialogContent>
                            <Box className={classes.wrapper}>
                                <DialogContentText className={classes.flexBox}>
                                    {this.props.DialogInfo.subTitle}
                                </DialogContentText>
                                <Divider />

                                {
                                    this.props.TableLoadedData ?
                                        <TableContainer component={Paper} color="inherit">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {
                                                            this.props.TableColumnName.map((item, index) => {
                                                                return (
                                                                    <TableCell
                                                                        key={index}
                                                                        className={item[1] ? item[1].className : ""}
                                                                    >
                                                                        {item[0]}
                                                                    </TableCell>
                                                                )
                                                            })
                                                        }
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.props.TableLoadedData && this.props.TableLoadedData.length !== 0 ?
                                                            this.state.srchWord === null || this.state.srchWord === "" ?
                                                                this.props.TableLoadedData.map((item, index) => {
                                                                    return (
                                                                        <UIPersonRow
                                                                            key={index}
                                                                            item={item}
                                                                            data={this.state.data}
                                                                            UIPersonRowChangeData={this.UIPersonRowChangeData}
                                                                        />
                                                                    )
                                                                })
                                                                :
                                                                this.state.srchData.map((item, index) => {
                                                                    return (
                                                                        <UIPersonRow
                                                                            key={index}
                                                                            item={item}
                                                                            data={this.state.data}
                                                                            UIPersonRowChangeData={this.UIPersonRowChangeData}
                                                                        />
                                                                    )
                                                                })
                                                            :
                                                            <UICircularProgress />
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        :
                                        <UICircularProgress />
                                }

                            </Box>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { this.handleChangeStatus("CANCLE") }} color="inherit" variant="outlined">
                                {this.props.BtnInfo.cancle}
                            </Button>
                            <Button onClick={() => { this.handleChangeStatus("SUBMIT") }} color="inherit" variant="outlined">
                                {this.props.BtnInfo.complete}
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        )
    }
}


export default (withStyles(styles)(withSnackbar(UIPersonList)));

UIPersonList.propTypes = {
    BtnInfo: PropTypes.object.isRequired,
    DialogInfo: PropTypes.object.isRequired,
    TableColumnName: PropTypes.arrayOf(PropTypes.array).isRequired,
    TableLoadedData: PropTypes.arrayOf(PropTypes.object).isRequired,
    ResultMessage: PropTypes.object.isRequired
}