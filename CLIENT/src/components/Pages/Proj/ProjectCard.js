import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {
    Grid, Grow, Paper, Typography, Box,
    makeStyles,
    Card, CardActions, CardMedia
} from '@material-ui/core/';

import UICardHeader from '../../common/Card/UICardHeader';
import UIButton from '../../common/UIButton'
import {
    EditIcon, DeleteIcon, MoreVertIcon, MailIcon
} from '../../common/CustomIcons';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: '200px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0, 1, 1, 1)
    },
    pr: {
        position: 'relative'
    },
    boxTop: {
        display: "-webkit-box",
        height: theme.spacing(19.5),
        boxSizing: 'border-box',
        maxHeight: theme.spacing(20),
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        lineClamp: "6",
        boxOrient: "vertical",
        overflow: 'hidden',
        textOverflow: "ellipsis"
    },
    boxBottom: {
        width: '100%',
        height: '30px',
        marginBottom: theme.spacing(1)
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    media: {
        height: "200px"
    },
}));

function ProjectCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const _member = useSelector((store) => store.User.member);
    const [writeStatus, setWriteStatus] = React.useState(false);
    const [GrowIn, setGrowIn] = React.useState(false);

    const headerActionList = [
        {
            name: "수정하기",
            icon: <EditIcon />,
            action: () => { console.log("수정하기") }
        },
        {
            name: "삭제하기",
            icon: <DeleteIcon />,
            action: () => { console.log("삭제하기") }
        },
        {
            name: "메일로 알리기",
            icon: <MailIcon />,
            action: () => { console.log("메일로 알리기") }
        },
    ]

    React.useEffect(() => {

        setGrowIn(true);

        if (_member.ref_allow_action.indexOf('WRITE') !== -1 || props.item.writer_seq === _member.seq) {
            setWriteStatus(true);
        }

    }, []);

    return (
        <Grid item xs={12} md={3} lg={3} className={classes.pr}>
            <Grow
                in={GrowIn}
                style={{ transformOrigin: '0 0 0' }}
                {...(GrowIn ? { timeout: 400 } : {})}
            >
                <Paper elevation={4}>
                    <Card className={classes.root}>

                        <UICardHeader
                            title={props.item.name}
                            icon={<MoreVertIcon />}
                            action={writeStatus ? headerActionList : null}
                        />

                        {/* <CardMedia
                            className={classes.media}
                            component="img"
                            alt={props.item.name}
                            area-name={props.item.thumbnail_file_name}
                            image={props.item.thumbnail_file_path}
                        /> */}

                        <Box className={classes.boxTop}>
                            <Typography variant="body1" color="textSecondary">
                                {props.item.desc}
                            </Typography>
                        </Box>

                        <CardActions>
                            <UIButton
                                class={classes.boxBottom}
                                name="MORE"
                                variant="contained"
                                color="primary"
                                action={() => {
                                    history.push(`/agency/project/detail/${props.item.id}`)
                                }}
                            />

                        </CardActions>
                    </Card>
                </Paper>
            </Grow>
        </Grid>
    );
}

export default connect(state => ({
    theme: state.UI.theme
}))(ProjectCard)