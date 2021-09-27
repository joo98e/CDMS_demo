/**
 * @param {}             :
 * @param {}             :
 * @param {}             :
 * @returns {}
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withSnackbar } from 'notistack';
import lodash from 'lodash'

import {
    Button, withStyles, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, Paper,
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'

import UICircularProgress from '../common/UICircularProgress';
import UIPersonRow from '../common/UIPersonRow';

const styles = theme => ({
    textFieldStyle: {
        width: '30vw',
        textAlign: 'right',
    },
    wrapper: {
        height: '70vh',
    },
    flexBox: {
        display: 'flex'
    }
});

export class UIPersonList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            personData: []
        }
    }

    componentDidMount() {
        
    }

    UIPersonRowChangeData = newItem => {
        let _temp = this.state.personData;
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
                personData: [..._temp]
            });
        } else {
            this.setState({
                ...this.state,
                personData: [
                    ...this.state.personData,
                    newItem
                ]
            });
        }
        setTimeout(() => {
            console.log(this.state.personData);
        }, 1000);
    }

    handleChangeStatus = (type) => {
        this.setState({
            isOpen: !this.state.isOpen ? true : false,
            personData: []
        });
        
        if (type === "SUBMIT") {
            this.props.enqueueSnackbar(this.props.ResultMessage.success, { variant: 'success' });
        } else if (type === "CANCLE") {
            this.props.enqueueSnackbar(this.props.ResultMessage.fail, { variant: 'warning' });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.textFieldStyle} color="inherit" variant="outlined" onClick={this.handleChangeStatus}>
                    {this.props.BtnInfo.open}
                </Button>

                {
                    this.state.isOpen &&
                    <Dialog className={classes.dialog} open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="lg">
                        <DialogTitle>
                            {this.props.DialogInfo.title}
                        </DialogTitle>

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
                                                                    <TableCell key={index}>{item}</TableCell>
                                                                )
                                                            })
                                                        }
                                                        {/* <TableCell align="center"></TableCell>
                                                        <TableCell align="left">{this.props.TableColumnName[0]}</TableCell>
                                                        <TableCell align="left">{this.props.TableColumnName[1]}</TableCell>
                                                        <TableCell align="left">{this.props.TableColumnName[2]}</TableCell>
                                                        <TableCell align="left">{this.props.TableColumnName[3]}</TableCell>
                                                        <TableCell align="left">{this.props.TableColumnName[4]}</TableCell> */}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.props.TableLoadedData ?
                                                            this.props.TableLoadedData.map((item, index) => {
                                                                return (
                                                                    <UIPersonRow
                                                                        key={index}
                                                                        item={item}
                                                                        personData={this.state.personData}
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
    TableColumnName: PropTypes.arrayOf(PropTypes.string).isRequired,
    TableLoadedData: PropTypes.arrayOf(PropTypes.object).isRequired,
    ResultMessage: PropTypes.object.isRequired
}