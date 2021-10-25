import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Grid, Box, Paper, Grow, Zoom,
    makeStyles, useTheme
} from '@material-ui/core'
import DetailTabs from './DetailTabs';
import DetailSummary from './DetailSummary'
import DetailBoard from './DetailBoard'

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxSizing: "border-box",
        padding: theme.spacing(4)
    },
    titleBox: {
        display: "flex",
        padding: theme.spacing(1),
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        textIndent: theme.spacing(1),
        flexDirection: "column"
    },
    mainTitle: {
        display: "inline-block",
        paddingRight: theme.spacing(1),
        fontSize: "2em",
    },
    subTitle: {
        display: "inline-block",
        paddingRight: theme.spacing(1),
        fontSize: "1em",
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    descColor: {
        color: theme.palette.text.desc
    },
    bdBox: {
        boxSizing: "border-box",
        padding: theme.spacing(2)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    }
}));

export const ProcessDetail = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { ref_proc_id } = useParams();
    const [processDetail, setProcessDetail] = useState({});

    const [awhile, setAwhile] = useState();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const getProcessDetail = () => {
            const condition = {
                ref_proc_id: ref_proc_id,
                delete_yn: "N"
            }
            const URL = "/api/process/detail";

            axios.get(URL, { params: condition })
                .then(res => {
                    if (res.data.resultCode < 0) {
                        console.log("프로세스 디테일 데이터 오류");
                    }
                    setProcessDetail(res.data.result);
                    setAwhile(true);
                })
                .catch(err => console.log(err));
        }
        getProcessDetail();
    }, [ref_proc_id]);



    return (
        <Box className={classes.root}>
            {
                (processDetail.procDetail && processDetail.procMainWorker && processDetail.procSubWorker)
                &&
                <Grow in={awhile} timeout={awhile ? 800 : 0}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper elevation={4}>
                                <div className={classes.titleBox}>
                                    <span className={`${classes.hiddenText} + ${classes.mainTitle}`}>{processDetail.procDetail[0].name}</span>
                                    <span className={`${classes.hiddenText} + ${classes.subTitle} + ${classes.descColor}`}>{processDetail.procDetail[0].desc}</span>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <DetailTabs value={value} setValue={setValue} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grow>
            }

            {
                value === 0 ?
                    <DetailSummary
                        index={0}
                        value={value}
                        data={processDetail}
                    />
                    :
                    <DetailBoard
                        index={1}
                        value={value}
                        data={processDetail}
                    />
            }

        </Box >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDetail)