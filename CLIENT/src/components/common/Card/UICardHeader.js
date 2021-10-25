/** 
 * @param {title}             : string
 * @param {icon}              : JSX Element
 * @returns {}
 */

import React from 'react'
import { connect } from 'react-redux'

import {
    Box, Typography, IconButton,
    Menu, MenuItem, ListItemIcon, ListItemText,
    makeStyles,
} from "@material-ui/core"
import {
    CancelIcon, 
} from '../CustomIcons';

const useStyles = makeStyles(theme => ({
    cardHeader: {
        display: 'flex',
        justifyContent: "space-between",
        boxSizing: 'border-box',
        padding: theme.spacing(2, 1, 2, 1),
    },
    headerTitle: {
        maxWidth: "85%",
    },
    headerAction: {
        marginTop: -theme.spacing(1),
    },
    hiddenText: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: 'hidden',
        display: 'block',
    },
    desc : {
        color : theme.palette.text.desc
    }
}));

export const UICardHeader = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(false)

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Box className={classes.cardHeader}>
                <Box className={props.action ? classes.headerTitle : classes.hiddenText}>
                    <Typography variant={props.titleVariant ? props.titleVariant : "h6"} className={classes.hiddenText}>
                        {props.title}
                    </Typography>
                    {
                        props.subTitle &&
                        <Typography variant={props.subTitleVariant ? props.subTitleVariant : "body2"} className={`${classes.desc} + ${classes.hiddenText}`}>
                            {props.subTitle}
                        </Typography>
                    }
                </Box>
                <Box className={classes.headerAction}>
                    <IconButton
                        onClick={handleOpen}
                    >
                        {props.icon}
                    </IconButton>
                    <Menu
                        open={open}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                    >
                        {
                            (props.action && props.action.length !== 0) &&
                            props.action.map((item, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        onClick={item.action}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            {item.name}
                                        </ListItemText>
                                    </MenuItem>
                                )
                            })
                        }
                        <MenuItem
                            onClick={handleClose}
                        >
                            <ListItemIcon>
                                <CancelIcon />
                            </ListItemIcon>
                            <ListItemText>
                                닫기
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UICardHeader)
