import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Typography, Divider, Grid, Paper, Box, makeStyles } from "@material-ui/core"

import UIMainWorker from "../../common/Worker/UIMainWorker"
import UIPercentageChart from '../../common/Chart/UIPercentageChart'
import UIButton from '../../common/UIButton'

import {
    EditIcon, DeleteIcon, MoreVertIcon, MailIcon
} from '../../common/CustomIcons';
import { UICardHeader } from '../../common/Card/UICardHeader'

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: "border-box",
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
    },
    relative: {
        position: `relative`
    },
    inline: {
        display: 'inline'
    },
    minHeight: {
        height: theme.spacing(24),
    },
    indent: {
        textIndent: theme.spacing(2)
    },
    bdBox: {
        boxSizing: "border-box",
        padding: theme.spacing(2)
    },
    lh_2: {
        lineHeight: "2em"
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    mt2: {
        marginTop: theme.spacing(2)
    },
    mt4: {
        marginTop: theme.spacing(5)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    },
    m2: {
        margin: theme.spacing(2)
    },
    p1: {
        padding: theme.spacing(2)
    },
    plr2: {
        padding: theme.spacing(0, 2, 0, 2)
    },
    pb1: {
        paddingBottm: theme.spacing(1)
    },
    writerBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: theme.spacing(2),
        marginTop: theme.spacing(4),
        borderRadius: theme.spacing(2),
        background: theme.palette.background.default,
    },
    titleBox: {
        position: "relative",
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
        maxWidth: "75%",
        paddingRight: theme.spacing(1),
        fontSize: "1.5em",
    },
    subTitle: {
        display: "inline-block",
        maxWidth: "75%",
        paddingRight: theme.spacing(1),
    },
    descColor: {
        color: theme.palette.text.desc
    },
    fullWidth: {
        width: "100%"
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    marginBox: {
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
    },
}));

export const ProcessCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const _member = useSelector((store) => store.User.member);
    const [writeStatus, setWriteStatus] = React.useState(false);

    const headerActionList = [
        {
            name: "????????????",
            icon: <EditIcon />,
            action: () => { console.log("????????????") }
        },
        {
            name: "????????????",
            icon: <DeleteIcon />,
            action: () => { console.log("????????????") }
        },
        {
            name: "????????? ?????????",
            icon: <MailIcon />,
            action: () => { console.log("????????? ?????????") }
        },
    ]

    const chartData = [
        props.item.cur_task === null ? 0 : props.item.cur_task,
        props.item.total_task === null ? 0 : props.item.total_task
    ];

    const handleClickGoProcessDetail = () => {
        history.push(`/agency/project/process/detail/${props.item.process_id}`);
    }

    React.useEffect(() => {

        if (_member.ref_allow_action.indexOf('WRITE') !== -1 || props.item.writer_seq === _member.seq) {
            setWriteStatus(true);
        }
        console.log(props.item);

    }, [])

    return (
        <Paper className={classes.root} elevation={4}>
            <UICardHeader
                title={props.item.process_name}
                subTitle={props.item.process_desc}
                icon={<MoreVertIcon />}
                action={writeStatus ? headerActionList : null}
            />
            <Divider />
            <Grid container spacing={3} className={classes.bdBox}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" className={`${classes.indent} + ${classes.hiddenText}`}>
                        ?????????
                    </Typography>
                    <UIMainWorker data={props.item}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography className={classes.mb1} variant="h6">
                        ???????????? ?????????
                    </Typography>
                    <Box className={`${classes.relative} + ${classes.marginBox}`}>
                        <UIPercentageChart
                            name={"???????????? ?????????"}
                            min={chartData[0]}
                            max={chartData[1]}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <UIButton
                        class={classes.fullWidth}
                        name="MORE"
                        variant="contained"
                        action={handleClickGoProcessDetail}
                    />
                </Grid>
                {/* <Grid item xs={12} md={12} lg={12}>
                    <Paper className={`${classes.mt2} + ${classes.minHeight}`}>
                        <Typography variant="h6" className={`${classes.indent} + ${classes.hiddenText}`}>
                            ?????? ??????
                        </Typography>
                    </Paper>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={6} lg={6}>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </Paper >
    )
}

const mapStateToProps = (state) => ({
    theme: state.UI.theme
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCard)
