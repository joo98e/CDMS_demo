import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import {
    Container, Grid, Grow, Paper, Box,
    IconButton,
    withStyles,
} from '@material-ui/core';

import UICircularProgress from '../../common/UICircularProgress'
import ProjectCard from './ProjectCard'
import ProjectAddDialog from './ProjectAddDialog'
import { SatelliteTwoTone } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(6)
    },
    m2: {
        display: "inline-block",
        margin: theme.spacing(2)
    },
    relative: {
        position: 'relative',
        height: '272px',
    },
});

export class Projects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: null,
            awhile : false
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile : true
        });
        
        this.getProjectList();
    }

    // TODO 내가속한프로젝트보기

    getProjectList = () => {
        const URL = '/projects';
        const params = this.props.member;
        axios.get(URL, {
            params: {
                ...params
            }
        }).then(res => {
            this.setState({
                ...this.state,
                projects: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.root}>
                {
                    this.state.projects === null ?
                        <UICircularProgress />
                        :
                        <Grid container>
                            <Grid container item xs={12} spacing={3}>

                                {this.state.projects.map((item, index) => {
                                    return (
                                        <ProjectCard
                                            key={index}
                                            infos={item}
                                        />
                                    )
                                })
                                }
                                
                                <Grid item xs={12} md={6} lg={4} >
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        {...(this.state.awhile ? { timeout: 800 } : {})}
                                    >
                                        <Paper elevation={4} className={classes.relative}>
                                            <ProjectAddDialog />
                                        </Paper>
                                    </Grow>
                                </Grid>
                            </Grid>
                        </Grid>
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.user.member
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Projects))
