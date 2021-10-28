import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import axios from 'axios'

import { Container, Grid, Grow, Paper, IconButton, withStyles, Typography } from '@material-ui/core';
import { AddCircleIcon } from '../../common/CustomIcons';

import UICircularProgress from '../../common/UICircularProgress'
import AgencyCard from './AgencyCard'
import AgencyAddDialog from './AgencyAddDialog'

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(6)
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    relative: {
        position: 'relative',
        height: '350px',
    },
    minPadding: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
    },
    minHeight: {
        width: '100%',
        minHeight: '200px',
        maxHeight: '400px',
    },
    box: {
        position : "relative",
        minWidth : theme.spacing(48),
        minHeight : theme.spacing(48),
    }
});

export class Agency extends PureComponent {
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

        try {
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
        } catch (error) {
            console.log("세션이 종료되어 로그인 페이지로 이동합니다.");
            this.props.history.push("/login");
        }
    }

    getAgencyList = srchType => {
        const URL = '/api/agency/list';

        axios.get(URL, {
            params: {
                mem_seq: this.props.member.seq,
                delete_yn: 'N',
                status: "STATUS::OPEN",
                srchType: srchType !== (undefined || null) ? srchType : null
            }
        }).then(res => {
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
                    {
                        this.state.agency === null || this.state.agency.length === 0 ?
                            <Grow
                                in={this.state.awhile}
                                timeout={this.state.awhile ? 800 : 0}
                            >
                                <Grid item xs={12} md={12} lg={12} className={classes.box}>
                                    <Typography className={classes.trans} variant="h5">데이터가 없습니다.</Typography>
                                </Grid>
                            </Grow>
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
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Grow
                                            in={this.state.awhile}
                                            style={{ transformOrigin: '0 0 0' }}
                                            {...(this.state.awhile ? { timeout: 800 } : {})}
                                        >
                                            <Paper elevation={4} className={`${classes.relative}`}>
                                                <AgencyAddDialog />
                                            </Paper>
                                        </Grow>
                                    </Grid>
                                }
                            </React.Fragment>
                    }
                </Grid>
            </Container >
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.User.member
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Agency)))
