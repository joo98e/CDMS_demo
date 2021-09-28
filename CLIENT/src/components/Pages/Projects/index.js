import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import {
    Container, Grid, Grow, Paper,
    withStyles,
} from '@material-ui/core';

import UICircularProgress from '../../common/UICircularProgress'
import ProjectCard from './ProjectCard'
import ProjectAddDialog from './ProjectAddDialog'
// import { SatelliteTwoTone } from '@material-ui/icons';

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
            awhile: false
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });

        this.getProjectList();
    }

    // TODO 내가속한프로젝트보기
    // TODO 프로젝트 리스트
    // TODO 카드 구현
    // TODO 그로우 구현
    // TODO 플러스 버튼 다이얼로그 구현
    // TODO DB 프로젝트참여자리스트 구현 

    getProjectList = () => {
        const URL = 'api/projects';
        axios.get(URL, {
            params: {
                ...this.props.member
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
                            <Grid container spacing={3}>

                                {
                                    this.state.projects.map((item, index) => {
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
    member: state.User.member
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Projects))
