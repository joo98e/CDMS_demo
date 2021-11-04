import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import {
    Grid, Grow, Paper, Typography, Box,
    makeStyles,
    Card, CardActions,
} from '@material-ui/core/';

import UICardHeader from '../../common/Card/UICardHeader';
import UIButton from '../../common/UIButton'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: '200px',
        backgroundColor: theme.palette.background.paper,
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
    const [GrowIn, setGrowIn] = React.useState(false);

    React.useEffect(() => {
        setGrowIn(true);

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
                        />

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