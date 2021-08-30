import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button, withStyles, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, Paper,
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core'

import PersonRow from '../../common/PersonRow'

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
        let response = await fetch('/users/project/work');
        let workForce = await response.json();

        return workForce;
    }

    handleChangeStatus = () => {
        this.setState({
            isOpen: !this.state.isOpen ? true : false
        });
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

                                {/* TODO 검색란 / onchange로 준비된 리스트에서 filter */}
                                {/* Chip */}
                                {/* Chip array */}
                                {/* search 박스 오른쪽 위로 올리기 */}
                                {/* https://material-ui.com/components/chips/ */}
                                {/* <List>
                                    <ListItem>
                                        <TextField className={classes.textFieldStyle} variant="outlined" placeholder="#닉네임" fullWidth />
                                    </ListItem>
                                    <ListItem>

                                    </ListItem>
                                </List> */}

                                {
                                    this.state.workForce ?
                                        <TableContainer component={Paper} color="inherit">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left" size="small"></TableCell>
                                                        <TableCell align="left">부서</TableCell>
                                                        <TableCell align="left">ID</TableCell>
                                                        <TableCell align="left">성명</TableCell>
                                                        <TableCell align="left">이메일</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.state.workForce.map((item, index) => {
                                                            return <PersonRow key={index} data={item} datad={4545} />
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        :
                                        <div>circullator</div>
                                }

                            </Box>

                            {/* <Box className={classes.wrapper}>
                                <DialogContentText>
                                    외부 인력 구성
                                </DialogContentText>
                            </Box> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleChangeStatus} color="inherit" variant="outlined">
                                앗, 취소예요!
                            </Button>
                            <Button onClick={this.handleChangeStatus} color="inherit" variant="outlined">
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonList))
