/** 
 * @param {}
 * @param {}
 * @param {}
 * @returns {}
 */

import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import {
    Button, withStyles, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, Paper,
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'

import UICircularProgress from '../common/UICircularProgress';

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
            isOpen: false
        }
    }

    handleChangeStatus = (type) => {
        this.setState({
            isOpen: !this.state.isOpen ? true : false,
            data: []
        });

        if (type === "SUBMIT") {
            this.props.enqueueSnackbar("SUBMIT", { variant: 'success' });

        } else if (type === "CANCLE") {
            this.props.enqueueSnackbar("CANCLE", { variant: 'warning' });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.textFieldStyle} color="inherit" variant="outlined" onClick={this.handleChangeStatus}>
                    기관 정보 추가하기
                </Button>

                {
                    this.state.isOpen &&
                    <Dialog className={classes.dialog} open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="lg">
                        <DialogTitle>
                            기관 정보
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText className={classes.flexBox}>
                                Key & Value로 구성해보세요.
                            </DialogContentText>
                            <Box>
                                
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            
                        </DialogActions>
                    </Dialog>
                }

            </div>
        )
    }
}


export default (withStyles(styles)(withSnackbar(UIPersonList)));