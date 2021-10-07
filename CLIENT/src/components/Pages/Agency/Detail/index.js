import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router'

import {
    Grid, Box, Typography, Paper, Grow,
    withStyles,
    Divider,
    Container
} from "@material-ui/core"

import UICircularProgress from '../../../common/UICircularProgress'

const styles = theme => ({
    root: {
        display: 'block',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(4)
    },
    indent: {
        textIndent: theme.spacing(2)
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    lh_2: {
        lineHeight: "2em"
    },
    minHeight: {
        minHeight: "25em"
    },
    bxsizing: {
        boxSizing: "border-box",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    hiddenText: {
        display: 'block',
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        marginLeft: theme.spacing(.5),
        marginRight: theme.spacing(.5)
    }
});

export class AgencyDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            awhile: false,
            data: {}
        }
    }

    componentDidMount() {
        this.setState({
            awhile: true,
            data: {}
        });
        this.getAgencyDetailInfo();
    }

    getAgencyDetailInfo = () => {
        const condition = {
            member_seq: this.props.member.seq,
            ref_agcy_id: this.props.match.params.ref_agcy_id,
            delete_yn: 'N'
        }
        const URL = "/api/agency/detail"

        axios.get(URL, {
            params: {
                ...condition,

            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    data: {
                        ...res.data.result[0],
                        add_info: JSON.parse(res.data.result[0].add_info)
                    }
                });
                console.log(this.state.data)
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper elevation={4} >
                            <Typography
                                className={`${classes.indent} + ${classes.lh_2}`}
                                variant={"h4"}>
                                {this.state.data.name ? this.state.data.name : "Loading..."}
                            </Typography>
                        </Paper>
                    </Grid>
                    {
                        this.state.data ?
                            <React.Fragment>
                                {/* Area #1 */}
                                <Grid item xs={12} md={12} lg={6}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 600 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing}`}
                                        >
                                            <Typography
                                                className={`${classes.indent} + ${classes.lh_2}`}
                                                variant={"h6"}
                                            >

                                            </Typography>
                                            {/* <Divider /> */}
                                        </Paper>
                                    </Grow>
                                </Grid>

                                {/* Area #2 */}
                                <Grid item xs={12} md={6} lg={3}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 600 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing}`}
                                        >
                                            <Typography
                                                className={`${classes.lh_2}`}
                                                variant={"h6"}
                                            >
                                                정보
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                container
                                                className={classes.mt1}
                                            >
                                                {
                                                    this.state.data.add_info && this.state.data.add_info.length !== 0 ?
                                                        this.state.data.add_info.map((item, index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <Grid item xs={6} md={6} lg={6}>
                                                                        <Typography
                                                                            className={classes.hiddenText}
                                                                            variant="body1"
                                                                            align="left"
                                                                        >
                                                                            {item.key}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={6} lg={6}>
                                                                        <Typography
                                                                            className={classes.hiddenText}
                                                                            variant="body1"
                                                                            align="left"
                                                                        >
                                                                            {item.value}
                                                                        </Typography>
                                                                    </Grid>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                        :
                                                        <Typography variant="body1">
                                                            데이터가 없습니다.
                                                        </Typography>
                                                }
                                            </Grid>
                                        </Paper>
                                    </Grow>
                                </Grid>

                                {/* Area #3 */}
                                <Grid item xs={12} md={6} lg={3}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 600 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing}`}
                                        >
                                            <Typography
                                                className={`${classes.lh_2}`}
                                                variant={"h6"}
                                            >
                                                등록자
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                container
                                                className={classes.mt1}
                                            >
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <Typography
                                                        variant="body1"
                                                        align="left"
                                                        className={classes.hiddenText}
                                                    >
                                                        성명
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={6}>
                                                    <Typography
                                                        variant="body1"
                                                        align="left"
                                                        className={classes.hiddenText}
                                                    >
                                                        {this.state.data.full_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grow>
                                </Grid>

                                {/* Area #3 */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 400 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing}`}
                                        >
                                            <Typography
                                                className={`${classes.lh_2}`}
                                                variant={"h5"}
                                            >
                                                진행중인 프로젝트
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                container
                                                className={classes.mt1}
                                            >
                                                
                                            </Grid>
                                        </Paper>
                                    </Grow>
                                </Grid>

                                {/* Area #4 */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 400 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing}`}
                                        >
                                            <Typography
                                                className={`${classes.lh_2}`}
                                                variant={"h5"}
                                            >
                                                종료된 프로젝트
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                container
                                                className={classes.mt1}
                                            >

                                            </Grid>
                                        </Paper>
                                    </Grow>
                                </Grid>

                            </React.Fragment>
                            :
                            <UICircularProgress />
                    }
                </Grid>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.User.member
})

const mapDispatchToProps = {

}

export default
    connect(mapStateToProps, mapDispatchToProps)
        (withRouter
            (withStyles
                (styles)
                (AgencyDetail)));
