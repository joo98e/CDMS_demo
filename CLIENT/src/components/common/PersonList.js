import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button, withStyles, Avatar, Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    ListItemAvatar, ListItemText, ListItem, List, Divider, TextField,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    textFieldStyle: {
        width: '30vw',
        textAlign: 'right'
    },
    wrapper: {
        height: '30vh',
    }
});

export class PersonList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            internalWorkForce: [
                null
            ],
            externalWorkForce: {

            }
        }
    }

    componentDidMount() {
        // 내부 인력


        // 외부 인력
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
                                <DialogContentText>
                                    내부 인력 구성
                                </DialogContentText>
                                <Divider />

                                <List>
                                    <ListItem>
                                        {/* TODO 검색란 / onchange로 준비된 리스트에서 filter */}
                                        <TextField className={classes.textFieldStyle} variant="outlined" placeholder="#닉네임" fullWidth />
                                    </ListItem>

                                {/* 요청하여 받아온 것을 통해서 리스트 출력 */}
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon color="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        sdf
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon color="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        sdf
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon color="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        sdf
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon color="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        sdf
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon color="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        sdf
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                </List>
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
