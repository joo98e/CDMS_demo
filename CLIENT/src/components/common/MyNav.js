import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as actions from '../../redux/action/UserInfoAction'

import {
    Box, AppBar, Toolbar, IconButton, Typography, withStyles, Tooltip
} from '@material-ui/core';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Avatar } from '@material-ui/core';
// import AccountTreeIcon from '@material-ui/icons/AccountTree';
// import HomeIcon from '@material-ui/icons/Home';
import UISidebar from './UISideBar';

const styles = theme => ({
    root: {
        flewGrow: 1
    },
    ml: {
        marginLeft: theme.spacing(2)
    },
    mr: {
        marginRight: theme.spacing(2),
    },
    title: {
        flewGrow: 1
    },

});

export class MyNav extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <UISidebar />

                        <Box flexGrow={1} className={classes.ml}>
                            <Typography variant="h6">
                                
                            </Typography>
                        </Box>

                        

                        {this.props.user.auth ?
                            <Tooltip title="로그아웃">
                                <Link to="/login">
                                    <IconButton color="inherit" onClick={this.props.handleSessionQuit}>
                                        <LockOpenIcon color="inherit" />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            :
                            <Typography>
                                세션을 종료하세요.
                            </Typography>
                        }
                        
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSessionQuit: () => { dispatch(actions.outAuthenticated()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyNav))
