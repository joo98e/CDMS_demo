import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router'

import {
    Grid, Box, Typography, Paper, Grow,
    withStyles, IconButton,
    Divider
} from "@material-ui/core"

import getNow from '../../../common/fn/getNow';
import getDateFormat from '../../../common/fn/getDateFormat';
import UICircularProgress from '../../../common/UICircularProgress'
import ProjectCard from '../../Proj/ProjectCard';
import { AddCircleIcon } from '../../../common/CustomIcons'
import API from '../../../common/API'
import UIButton from '../../../common/UIButton'
import UINewsByNotice from '../../../common/News/UINewsByNotice'
import { UICardHeader } from '../../../common/Card/UICardHeader'

const styles = theme => ({
    root: {
        display: 'block',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(4)
    },
    flexBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    p1: {
        padding: theme.spacing(2)
    },
    vertical_m_1: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(.5)
    },
    lh_2: {
        lineHeight: "2em"
    },
    minHeight: {
        height: "100%"
    },
    h_560px: {
        height: "100%",
        minHeight: '280px',
        maxHeight: '560px',
    },
    bxsizing: {
        boxSizing: "border-box",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    hiddenText: {
        display: 'block',
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        marginLeft: theme.spacing(.5),
        marginRight: theme.spacing(.5)
    },
    subText: {
        color: theme.palette.text.desc
    },
    relative: {
        position: "relative"
    },
    trans: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    more: {
        position: "absolute",
        top: theme.spacing(1.5),
        right: theme.spacing(1.5)
    },
    bdBox: {
        boxSizing: "border-box",
        padding: theme.spacing(2)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    },
});

export class AgencyDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            awhile: false,
            data: {},
            projectData: [],
            endProjectData: [],
            newsData: [],
            writeStatus: false
        }
    }

    componentDidMount() {
        this.setState({
            awhile: true
        });
        this.getAgencyDetailInfo();
        this.getProjectList();
        this.getNewsData();
    }

    getNewsData = () => {
        // 뉴스
        const config = {
            type: "INCLUDE::AGENCY",
            ref_id: this.props.match.params.ref_agcy_id
        }

        API.getNews(config)
            .then((res) => {
                console.log(res);
                this.setState({
                    ...this.state,
                    newsData: res.data.result
                });
            });
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
        }).then(res => {
            if (res.data.result.length === 0) {

            } else {
                this.setState({
                    ...this.state,
                    data: {
                        ...res.data.result[0],
                        reg_date: getDateFormat.YYYYMMDD(res.data.result[0].reg_date),
                        start_date: getDateFormat.YYYYMMDD(res.data.result[0].start_date),
                        upd_date: getDateFormat.YYYYMMDD(res.data.result[0].upd_date),
                        add_info: JSON.parse(res.data.result[0].add_info)
                    },
                    writeStatus: this.props.member.seq === res.data.result[0].writer_seq ? true : false
                });
            }
        })
            .catch((err) => {
                console.log(err);
                alert("잘못된 접근입니다.")
                this.props.history.push('/');
            });

    }

    getProjectList = () => {

        // 현재 프로젝트
        const condition = {
            // limit: 2,
            ref_agcy_id: this.props.match.params.ref_agcy_id,
            unretired: getNow(),
            order_by: "DESC",
            delete_yn: 'N'
        }
        const URL = '/api/project/list';

        axios.get(URL, {
            params: condition
        }).then(res => {
            if (res.data.resultCode !== -1) {
                this.setState({
                    projectData: res.data.result
                });
            } else {
                // Error
            }

        });

        // 이전 프로젝트
        const endedCondition = {
            // limit: 3,
            ref_agcy_id: this.props.match.params.ref_agcy_id,
            retired: getNow(),
            order_by: "DESC",
            delete_yn: 'N'
        }
        const endedURL = '/api/project/list';

        axios.get(endedURL, {
            params: endedCondition
        }).then(res => {
            if (res.data.resultCode !== -1) {
                this.setState({
                    endProjectData: res.data.result
                });
            } else {
                // Error
            }

        })
            .catch((err) => {
                console.log(err);
                alert("잘못된 접근입니다.")
                this.props.history.push('/');
            });;
    }



    render() {
        const { classes } = this.props;

        const toWrite = [
            {
                key: "부서",
                value: this.state.data.dept
            },
            {
                key: "직무",
                value: this.state.data.rank
            },
            {
                key: "성명",
                value: this.state.data.full_name
            },
            {
                key: "생성일",
                value: this.state.data.reg_date
            },
            {
                key: "사업 시작일",
                value: this.state.data.start_date
            },
            {
                key: "사업 종료일",
                value: this.state.data.upd_date
            },
        ];

        return (
            <Box className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper elevation={4}>
                            <UICardHeader
                                title={this.state.data.name ? this.state.data.name : "Loading..."}
                                titleVariant="h4"
                                subTitle={this.state.data.desc && this.state.data.desc}
                            />
                        </Paper>
                    </Grid>
                    {
                        this.state.data ?
                            <React.Fragment>
                                {/* Area #1 */}
                                <Grid item xs={12} md={12} lg={8}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 600 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing} + ${classes.relative} + ${classes.bdBox}`}
                                        >
                                            <Typography
                                                className={classes.mb1}
                                                variant={"h6"}
                                            >
                                                최근 활동
                                            </Typography>
                                            <Divider />
                                            <UIButton
                                                class={classes.more}
                                                name="MORE"
                                                variant="contained"
                                                action={() => { }}
                                            />
                                            <Box className={classes.flexColumn}>
                                                {
                                                    (this.state.newsData && this.state.newsData.length !== 0) ?
                                                        this.state.newsData.map((item, index) => {
                                                            return (
                                                                <UINewsByNotice
                                                                    key={index}
                                                                    num={index + 1}
                                                                    data={item}
                                                                />
                                                            )
                                                        })
                                                        :
                                                        <Typography className={classes.trans} variant="body1" align="center" component="div">
                                                            데이터가 없습니다.
                                                        </Typography>
                                                }
                                            </Box>
                                        </Paper>
                                    </Grow>
                                </Grid>

                                {/* Area #2 */}
                                <Grid item xs={12} md={12} lg={4}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 600 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing} + ${classes.relative} + ${classes.bdBox}`}
                                        >
                                            <Typography
                                                className={`${classes.mb1}`}
                                                variant={"h6"}
                                            >
                                                정보
                                            </Typography>
                                            <UIButton
                                                class={classes.more}
                                                name="MORE"
                                                variant="contained"
                                                action={() => { }}
                                            />
                                            <Divider />
                                            {
                                                this.state.data.add_info && this.state.data.add_info.length !== 0 ?
                                                    this.state.data.add_info.map((item, index) => {
                                                        return (
                                                            <Grid
                                                                key={index}
                                                                container
                                                                className={classes.vertical_m_1}
                                                            >
                                                                <Grid item xs={6} md={6} lg={6}>
                                                                    <Typography
                                                                        className={`${classes.hiddenText} + ${classes.subText}`}
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
                                                            </Grid>
                                                        )
                                                    })
                                                    :
                                                    <Typography className={classes.trans} variant="body1">
                                                        데이터가 없습니다.
                                                    </Typography>
                                            }
                                        </Paper>
                                    </Grow>
                                </Grid>

                                {/* Area #3 */}
                                {/* <Grid item xs={12} md={6} lg={3}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 600 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={`${classes.minHeight} + ${classes.bxsizing} + ${classes.bdBox}`}
                                        >
                                            <Typography
                                                className={`${classes.mb1}`}
                                                variant={"h6"}
                                            >
                                                등록자
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                container
                                                className={classes.vertical_m_1}
                                            >
                                                {this.state.data &&
                                                    toWrite.map((item, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Grid item xs={6} md={6} lg={6}>
                                                                    <Typography
                                                                        variant="body1"
                                                                        align="left"
                                                                        className={`${classes.hiddenText} + ${classes.subText}`}
                                                                    >
                                                                        {item.key}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={6} md={6} lg={6}>
                                                                    <Typography
                                                                        variant="body1"
                                                                        align="left"
                                                                        className={classes.hiddenText}
                                                                    >
                                                                        {item.value}
                                                                    </Typography>
                                                                </Grid>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </Paper>
                                    </Grow>
                                </Grid> */}

                                {/* Area #4 */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grow
                                        in={this.state.awhile}
                                        style={{ transformOrigin: '0 0 0' }}
                                        timeout={this.state.awhile ? 400 : 0}
                                    >
                                        <Paper
                                            elevation={4}
                                            className={classes.bxsizing}
                                        >
                                            <Typography
                                                className={`${classes.lh_2}`}
                                                variant={"h5"}
                                            >
                                                진행중인 프로젝트
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                className={classes.vertical_m_1}
                                                container
                                                spacing={4}
                                            >
                                                {
                                                    this.state.projectData && this.state.projectData.length !== 0 &&
                                                    this.state.projectData.map((item, index) => {
                                                        return (
                                                            <ProjectCard
                                                                key={index}
                                                                item={item}
                                                            />
                                                        )
                                                    })
                                                }

                                                {
                                                    this.state.writeStatus ?
                                                        <Grid item xs={12} md={3} lg={3}>
                                                            <Paper elevation={4} className={`${classes.relative} + ${classes.h_560px}`}>
                                                                <IconButton
                                                                    className={classes.trans}
                                                                    color="inherit"
                                                                    onClick={() => {
                                                                        this.props.history.push(`/agency/project/add/${this.props.match.params.ref_agcy_id}`)
                                                                    }}
                                                                >
                                                                    <AddCircleIcon />
                                                                </IconButton>
                                                            </Paper>
                                                        </Grid>
                                                        :
                                                        this.state.projectData && this.state.projectData.length === 0 &&
                                                        <Grid item xs={12} md={12} lg={12} className={`${classes.h_560px} + ${classes.flexBox}`}>
                                                            <Typography variant="body1" align="center" component="div">
                                                                데이터가 없습니다.
                                                            </Typography>
                                                        </Grid>
                                                }

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
                                            className={classes.bxsizing}
                                        >
                                            <Typography
                                                className={`${classes.lh_2}`}
                                                variant={"h5"}
                                            >
                                                종료된 프로젝트
                                            </Typography>
                                            <Divider />
                                            <Grid
                                                className={classes.vertical_m_1}
                                                container
                                                spacing={4}
                                            >
                                                {
                                                    this.state.endProjectData && this.state.endProjectData.length !== 0 ?
                                                        this.state.endProjectData.map((item, index) => {
                                                            return (
                                                                <ProjectCard
                                                                    key={index}
                                                                    item={item}
                                                                />
                                                            )
                                                        })
                                                        :
                                                        <Grid item xs={12} md={12} lg={12} className={`${classes.h_560px} + ${classes.flexBox}`}>
                                                            <Typography variant="body1" align="center" component="div">
                                                                데이터가 없습니다.
                                                            </Typography>
                                                        </Grid>
                                                }
                                            </Grid>
                                        </Paper>
                                    </Grow>
                                </Grid>

                            </React.Fragment>
                            :
                            <UICircularProgress />
                    }
                </Grid>
            </Box >
        )
    }
}

const mapStateToProps = (state) => ({
    member: state.User.member,
    theme: state.UI.theme
})

const mapDispatchToProps = {

}

export default
    connect(mapStateToProps, mapDispatchToProps)
        (withRouter
            (withStyles
                (styles)
                (AgencyDetail)));
