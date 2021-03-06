import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../redux/action/UserInfoAction'

import {
    Container, Avatar, IconButton, Typography,
    Dialog, DialogContent, Box,
    DialogContentText, DialogTitle, Divider, Button,
    ImageList, ImageListItem, ImageListItemBar
} from '@material-ui/core'
import { AddCircleIcon, FavoriteIcon } from '../../common/CustomIcons';

import ImageData from './ImageData';

export class InputProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nowAvatarName: null,
            nowAvatarPath: null,
            nowAvatarNum: null,
            dialogToggle: false,
            popoverToggle: false,
            avatar_file: null,
            avatar_name: null
        }
    }

    handleFileUpload = (e) => {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = e => {
            this.setState({
                ...this.state,
                nowAvatarName: e.target.value,
                nowAvatarNum : null,
                nowAvatarPath: e.target.result
            });
        }

        this.props.setRegisterMemberInfo({
            ...this.props.registerMember,
            avatar_file : e.target.files[0],
            avatar_name : e.target.value
        });
    }

    handleFileChange = (num, src, name) => {
        this.setState({
            ...this.state,
            nowAvatarName: name,
            nowAvatarNum: num,
            nowAvatarPath: src
        });

        this.props.setRegisterMemberInfo({
            ...this.props.registerMember,
            avatar_file: null,
            avatar_name: name,
        });
    }

    handleToggleAvatarDialog = () => {
        this.setState({
            ...this.state,
            dialogToggle: this.state.dialogToggle === false ? true : false
        });
    }

    handlePopoverToggle = () => {
        this.setState({
            ...this.state,
            popoverToggle: !this.state.popoverToggle ? true : false
        });
    }

    handleAvatarChange = e => {
        this.setState({
            ...this.state,
            dialogToggle: false
        });
        return;
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="sm">
                <IconButton
                    className={classes.setAvatarBtn}
                    onClick={this.handleToggleAvatarDialog}
                    onMouseEnter={this.handlePopoverToggle}
                    onMouseLeave={this.handlePopoverToggle}
                >
                    <Avatar
                        className={classes.mainAvatar}
                        src={this.state.nowAvatarPath !== null ? this.state.nowAvatarPath : "/static/avatars/items/default/34.png"}
                    />
                </IconButton>
                <Typography variant="body1" align="center">
                    {this.state.nowAvatarPath === null ? "???????????? ???????????? ???????????? ??????????????????." : "????????? ?????? ??????!"}
                </Typography>

                {
                    this.state.dialogToggle &&
                    <Dialog
                        fullWidth
                        open={this.state.dialogToggle}
                        onClose={this.handleToggleAvatarDialog}
                    >
                        <Box className={classes.profileDialog}>
                            <DialogTitle align="left">
                                ????????? ????????????
                            </DialogTitle>
                            <DialogContent>
                                <Avatar
                                    className={classes.mainAvatar}
                                    src={this.state.nowAvatarPath !== null ? this.state.nowAvatarPath : "/static/avatars/items/default/34.png"}
                                />
                                <Button
                                    className={classes.completeBtn}
                                    onClick={this.handleAvatarChange}
                                    variant="contained"
                                    size="medium"
                                >
                                    ??????
                                </Button>
                                <Divider className={classes.mb} />
                                <ImageList>
                                    <ImageListItem>
                                        <IconButton
                                            color="inherit"
                                            component="label"
                                            className={classes.trans}
                                        >
                                            <AddCircleIcon />
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                file={this.props.registerMember.avatar_file}
                                                onChange={this.handleFileUpload}
                                            />
                                        </IconButton>
                                    </ImageListItem>
                                    {
                                        ImageData.map((item, index) => {
                                            return (
                                                <ImageListItem key={index}>
                                                    <img
                                                        src={item.src}
                                                        alt={item.alt}
                                                        loading="lazy"
                                                    />
                                                    <IconButton></IconButton>
                                                    <ImageListItemBar
                                                        position="top"
                                                        style={{
                                                            background:
                                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                        }}
                                                        actionIcon={
                                                            <IconButton
                                                                style={{ color: this.state.nowAvatarNum !== index ? 'rgba(213, 213, 213, 0.3)' : 'rgb(255, 112, 112, 0.8)' }}
                                                                onClick={() => { this.handleFileChange(index, item.src, item.name) }}
                                                            >
                                                                <FavoriteIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                </ImageListItem>
                                            )
                                        })
                                    }
                                </ImageList>
                                <DialogContentText>
                                </DialogContentText>
                            </DialogContent>
                        </Box>
                    </Dialog>
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    registerMember: state.Producer.registerMember
})

const mapDispatchToProps = dispatch => {
    return {
        setRegisterMemberInfo: payload => { dispatch(actions.setRegisterMemberInfo(payload)) },
        setRegisterMemberInfoInit: () => { dispatch(actions.setRegisterMemberInfoInit()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputProfile);


