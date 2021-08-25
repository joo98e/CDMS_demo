import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button, withStyles, Avatar, 
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    ListItemAvatar, ListItemText, ListItem, List, Divider,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    textFieldStyle: {
        width: '30vw',
        textAlign: 'right'
    },
});

export class ProjectPersonList extends Component {
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
                    <Dialog open={this.state.isOpen} onClose={this.handleChangeStatus} fullWidth maxWidth="lg">
                        <DialogTitle>
                            프로젝트 참여 인원 구성하기!
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                내부 인력 구성
                                {/* TODO 
                                    텍스트 안에 리스트가 들어갈 수 없음! 픽스 필요함!!!!!!
                                */}
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                <PersonIcon color="inherit"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            sdf
                                        </ListItemText>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                <PersonIcon color="inherit"/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            sdf
                                        </ListItemText>
                                    </ListItem>
                                    <Divider />
                                </List>
                            </DialogContentText>

                            <DialogContentText>
                                외부 인력 구성
                            </DialogContentText>

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectPersonList))
