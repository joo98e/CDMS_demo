import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import {
    Container, Grid, Grow, Paper, Box,

    withStyles,
} from '@material-ui/core';

import UICircularProgress from '../../common/UICircularProgress'
import Card from '../../common/Card'

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(6)
    },
    m2: {
        display: "inline-block",
        margin: theme.spacing(2)
    }
});

export class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            awhile: false,
            projects: null
        }
    }

    componentDidMount() {
        this.setState({
            awhile: true
        });

        this.getProjectList();
    }

    // TODO 내가속한프로젝트보기

    getProjectList = () => {
        const URL = '/projects';
        const params = JSON.parse(this.props.member);

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
                                        <Card
                                            key={index}
                                            infos={item}
                                        />
                                    )
                                })
                                }
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
