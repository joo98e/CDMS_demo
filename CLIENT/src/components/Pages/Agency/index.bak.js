import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Container, Grid, Grow, Paper, withStyles, Typography, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import AgencyCard from './AgencyCard'
import AgencyAddDialog from './AgencyAddDialog'
import UIButton from '../../common/UIButton';
import API from '../../common/API';

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
        height: '325px',
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
        position: "relative",
        minWidth: theme.spacing(48),
        minHeight: theme.spacing(48),
    },
    alertBox: {
        position: "relative",
        minHeight: "10vw",
    }
});

export class Agency extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            agency: null,
            awhile: false,
            open: false,
            write: null,
        }
    }

    componentDidMount() {
        API.permit(this.props.member)
            .then(res => {
                this.setState({
                    ...this.state,
                    write: API.permitted("WRITE", res),
                    awhile: true
                });
            });

        try {
            switch (this.props.member.ref_auth_type) {
                /**
                 * @param                    {srchType}
                 * @description              : MINE / 내게 속한 것만
                 * @description              : BIZ / 특정 사업 구분으로
                 * @description              : ADMIN / 관리자 전용 / 전체 리스트
                 */

                case 'M':
                    this.getAgencyList("ADMIN");
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
        const config = {
            mem_seq: this.props.member.seq,
            delete_yn: 'N',
            status: "STATUS::OPEN",
            srchType: srchType !== (undefined || null) ? srchType : null
        }

        API.get('/api/agency/list', config)
            .then(res => {
                this.setState({
                    ...this.state,
                    agency: res.data.result,
                    open: res.data.length !== 0 ? true : false
                });
                console.log(res);
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
                            <React.Fragment>
                                {
                                    !this.state.write ?
                                        <Grow
                                            in={this.state.awhile}
                                            timeout={this.state.awhile ? 800 : 0}
                                        >
                                            <Grid item xs={12} md={12} lg={12} className={classes.box}>
                                                <Typography className={classes.trans} variant="h5">
                                                    참여하고 있는 프로젝트가 없습니다.
                                                </Typography>
                                            </Grid>
                                        </Grow>
                                        :
                                        <Grid item xs={12} md={6} lg={4}>
                                            <Grow
                                                in={this.state.awhile}
                                                timeout={this.state.awhile ? 800 : 0}
                                            >
                                                <Paper elevation={4} className={`${classes.relative}`}>
                                                    <AgencyAddDialog />
                                                </Paper>
                                            </Grow>
                                        </Grid>
                                }
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {
                                    this.state.agency.map((item, index) => {
                                        return (
                                            <AgencyCard
                                                key={index}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                                {
                                    this.state.write &&
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Grow
                                            in={this.state.awhile}
                                            timeout={this.state.awhile ? 800 : 0}
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


                {
                    (this.state.agency === null || this.state.agency.length === 0) && this.state.write
                    &&
                    <Dialog open={this.state.open} fullWidth>
                        <DialogContent className={classes.alertBox}>
                            <Typography className={classes.trans} variant="h6" align="center" style={{ width: "100%" }}>
                                플러스 버튼을 클릭해 프로젝트를 생성해보세요.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <UIButton
                                name="닫기"
                                variant="contained"
                                action={() => this.setState({ ...this.state, open: false })}
                            />
                        </DialogActions>
                    </Dialog>
                }

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
