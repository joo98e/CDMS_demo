import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import * as actions from '../../../_actions/Actions/UserInfo';


import {
    Button, withStyles, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, Paper, Chip,
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'

import UIPersonRow from '../../common/UIPersonRow';
import UICircularProgress from '../../common/UICircularProgress';

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

export class PersonList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            workForce: {}
        }
    }

    componentDidMount() {
        // 인력 리스트
        this.callApi()
            .then(res => {
                this.setState({ workForce: res });
                console.log(this.state.workForce);
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        let response = await fetch('/api/users/project/work');
        let workForce = await response.json();

        return workForce;
    }

    handleChangeStatus = (type) => {
        this.setState({
            isOpen: !this.state.isOpen ? true : false
        });

        if (type === "SUBMIT") {
            this.props.enqueueSnackbar('내부 인력 구성이 반영되었습니다.', { variant: 'success' });
        } else if (type === "CANCLE") {
            this.props.enqueueSnackbar('내부 인력 구성이 취소되었습니다.', { variant: 'warning' });

            this.props.setProjectPersonInit();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.textFieldStyle} color="inherit" variant="outlined" onClick={this.handleChangeStatus}>
                    구성하기
                </Button>

                {
                    this.state.isOpen &&
                    <Dialog className={classes.dialog} open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="lg">
                        <DialogTitle>
                            프로젝트 참여 인원 구성
                        </DialogTitle>

                        <DialogContent>
                            <Box className={classes.wrapper}>
                                <DialogContentText className={classes.flexBox}>
                                    내부 인력 구성
                                </DialogContentText>
                                <Divider />

                                {/* {
                                    this.props.projectMember.map((item, idx) => {
                                        return <Chip key={idx} variant="outlined" size="small" label="Basic" />
                                    })
                                } */}

                                {/* TODO 검색란 / onchange로 준비된 리스트에서 filter */}
                                {/* Chip */}
                                {/* Chip array */}
                                {/* search 박스 오른쪽 위로 올리기 */}
                                {/* https://material-ui.com/components/chips/ */}

                                {
                                    this.state.workForce ?
                                        <TableContainer component={Paper} color="inherit">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center"></TableCell>
                                                        <TableCell align="left">성명</TableCell>
                                                        <TableCell align="left">부서</TableCell>
                                                        <TableCell align="left">ID</TableCell>
                                                        <TableCell align="left">이메일</TableCell>
                                                        <TableCell align="left">구성</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.state.workForce.map((item, index) => {
                                                            return <UIPersonRow key={index} data={item} />
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        :
                                        <UICircularProgress />
                                }

                            </Box>

                            {/* <Box className={classes.wrapper}>
                                <DialogContentText>
                                    외부 인력 구성
                                </DialogContentText>
                            </Box> */}
                            
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { this.handleChangeStatus("CANCLE") }} color="inherit" variant="outlined">
                                앗, 취소예요!
                            </Button>
                            <Button onClick={() => { this.handleChangeStatus("SUBMIT") }} color="inherit" variant="outlined">
                                완료!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projectMember : state.Producer.projectMember
});

const mapDispatchToProps = (dispatch) => {
    return {
        setProjectPersonInit: () => { dispatch(actions.setProjectPersonInit()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(styles)
    (withSnackbar(PersonList))
);
