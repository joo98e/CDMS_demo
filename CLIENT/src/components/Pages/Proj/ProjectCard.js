import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import {
    Grid, Grow, Paper, Typography, Box,
    makeStyles, Divider, Avatar,
    Card, CardActions,
} from '@material-ui/core/';
import { AvatarGroup } from '@material-ui/lab'

import UICardHeader from '../../common/Card/UICardHeader';
import UIButton from '../../common/UIButton'
import API from '../../common/API';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: '325px',
        maxHeight: '325px',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0, 1, 1, 1)
    },
    columnFlexBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    mb1: {
        margin: theme.spacing(1)
    },
    pr: {
        position: 'relative'
    },
    boxTop: {
        display: "-webkit-box",
        height: theme.spacing(20),
        boxSizing: 'border-box',
        maxHeight: theme.spacing(20),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        lineClamp: "8",
        boxOrient: "vertical",
        overflow: 'hidden',
        textOverflow: "ellipsis",
        color: theme.palette.text.desc
    },
}));

function ProjectCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [GrowIn, setGrowIn] = useState(false);
    const [projColgList, setProjColgList] = useState(null);

    const returnHTML = HTML => {
        return {
            __html: HTML
        }
    }

    React.useEffect(() => {
        setGrowIn(true);
        API.get("/api/project/getColleague", { proj_id: props.item.id, delete_yn: 'N' })
            .then(res => {
                setProjColgList(res.data.result);
            });

    }, [props.item.id]);

    return (
        <Grid item xs={12} md={6} lg={4} className={classes.pr}>
            <Grow
                in={GrowIn}
                style={{ transformOrigin: '0 0 0' }}
                {...(GrowIn ? { timeout: 400 } : {})}
            >
                <Paper elevation={4}>
                    <Card className={classes.root}>
                        <UICardHeader
                            title={props.item.name}
                            titleVariant="h4"
                        />
                        <Divider />

                        <Box className={classes.boxTop} dangerouslySetInnerHTML={returnHTML(props.item.desc)} />

                        {
                            (Array.isArray(projColgList) && projColgList.length !== 0) &&
                            <CardActions className={classes.columnFlexBox}>
                                <AvatarGroup max={4}>
                                    {
                                        projColgList.map((item, index) => {
                                            return (
                                                <Avatar
                                                    key={index}
                                                    src={item.avatar_path}
                                                    alt={item.name}
                                                />
                                            )
                                        })
                                    }
                                </AvatarGroup>
                                <UIButton
                                    name="자세히"
                                    variant="contained"
                                    action={() => { history.push(`/project/detail/${props.item.id}`) }}
                                />
                            </CardActions>
                        }
                    </Card>
                </Paper>
            </Grow>
        </Grid>
    );
}

export default connect(state => ({
    theme: state.UI.theme
}))(ProjectCard)