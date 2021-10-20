import React, { useSelector, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Box, Grow,
    Avatar, Popover, Chip, Typography, Tooltip,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    mainAvatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
        margin: "0 auto"
    },
    mainBox: {
        minWidth: theme.spacing(32),
        minHeight: theme.spacing(32),
        padding: theme.spacing(2),
        boxSizing: "border-box"
    },
    m1: {
        margin: theme.spacing(.3)
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    }
}));

export const UIChipSet = (props) => {
    const data = props.data;
    const defaultPath = "/static/avatars/items/default/34.png"
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [awhile, setAwhile] = useState(false);

    const classes = useStyles();

    const handlePopoverOpen = (e) => {
        setOpen(true);
        setAwhile(true);
        setAnchorEl(e.currentTarget);
    }

    const handlePopoverClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <React.Fragment>
            {
                data.avatar_path &&
                <Tooltip title="자세히">
                    <Chip
                        className={classes.m1}
                        clickable
                        color="primary"
                        avatar={<Avatar src={data.avatar_path ? data.avatar_path : defaultPath} />}
                        label={data.full_name}
                        onClick={handlePopoverOpen}
                    />
                </Tooltip>
            }
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Grow in={awhile} style={{ transformOrigin: '0 0 0' }} timeout={awhile ? 800 : 0} >
                    <Box className={classes.mainBox}>
                        <Avatar className={classes.mainAvatar} src={data.avatar_path} />
                        <Typography className={classes.mt1} variant="h5" align="center">
                            {data.full_name}
                        </Typography>
                        <Typography className={classes.mt1} variant="body2" align="center">
                            {data.id}
                        </Typography>
                        <Typography className={classes.mb1} variant="body2" align="center">
                            {data.phone}
                        </Typography>
                        <Typography className={classes.mt1} variant="body2" align="center">
                            {data.dept_name} {data.rank_name}
                        </Typography>
                    </Box>
                </Grow>
            </Popover>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

UIChipSet.defaultProps = {
    data: null
}

export default connect(mapStateToProps, mapDispatchToProps)(UIChipSet)
