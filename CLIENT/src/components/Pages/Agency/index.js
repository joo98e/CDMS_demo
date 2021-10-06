import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import {
    Container, Grid, Grow, Paper,
    Typography,
    withStyles,
} from '@material-ui/core';

import UICircularProgress from '../../common/UICircularProgress'
import AgencyCard from './AgencyCard'
import AgencyAddDialog from './AgencyAddDialog'
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
    minPadding: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,

    }
});

export class Agency extends Component {
    constructor(props) {
        super(props)

        this.state = {
            agency: null,
            awhile: false
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            awhile: true
        });

        switch (this.props.member.ref_auth_type) {
            /**
             * @param {srchType}
             * @description              : MINE / 내게 속한 것만
             * @description              : BIZ / 특정 사업 구분으로
             * @description              : ADMIN / 관리자 전용 / 전체 리스트
             */

            case 'M':
                this.getAgencyList("ADMIN");
                console.log("is admin");
                break;

            case 'U':
                this.getAgencyList("MINE");

                break;

            default:
                break;
        }
    }

    getAgencyList = srchType => {

        const URL = 'api/agency/list';

        axios.get(URL, {
            params: {
                mem_seq: this.props.member.seq,
                delete_yn: 'N',
                status: "STATUS::OPEN",
                srchType: srchType !== (undefined || null) ? srchType : null
            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    agency: res.data.result
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper className={classes.minPadding} elevation={4}>
                            <Typography variant="h5">나의 기관 리스트</Typography>
                        </Paper>
                    </Grid>
                    {
                        this.state.agency === null ?
                            <UICircularProgress />
                            :
                            <React.Fragment>
                                {
                                    this.state.agency.map((item, index) => {
                                        return (
                                            <AgencyCard
                                                key={item.id}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                                {
                                    this.props.member.ref_allow_action.indexOf('WRITE') !== -1 &&
                                    <Grid item xs={12} md={6} lg={4} >
                                        <Grow
                                            in={this.state.awhile}
                                            style={{ transformOrigin: '0 0 0' }}
                                            {...(this.state.awhile ? { timeout: 800 } : {})}
                                        >
                                            <Paper elevation={4} className={classes.relative}>
                                                <AgencyAddDialog />
                                            </Paper>
                                        </Grow>
                                    </Grid>
                                }
                            </React.Fragment>
                    }
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.User.member
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Agency))