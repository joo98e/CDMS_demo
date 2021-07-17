import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    Tooltip,
    IconButton,
    List, Divider, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NoteIcon from '@material-ui/icons/Note';
import VerticalIcon from '@material-ui/icons/VerticalSplit';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const menuList = [
    { 
        MENU_ID : '1',
        MENU_NAME : '홈으로',
        MENU_ICON_NAME: <HomeIcon />, 
        MENU_PUSH_LINK: '/',
        MENU_PERMISSION : 'U'
    },
    { 
        MENU_ID : '2',
        MENU_NAME : '프로젝트로',
        MENU_ICON_NAME: <NoteIcon />, 
        MENU_PUSH_LINK: '/projects',
        MENU_PERMISSION : 'U'
    },
    { 
        MENU_ID : '3',
        MENU_NAME : '대쉬보드로',
        MENU_ICON_NAME: <VerticalIcon />, 
        MENU_PUSH_LINK: '/dashboard',
        MENU_PERMISSION : 'U'
    },
];

function SideBar(props) {
    const { position } = props;

    const classes = useStyles();
    const [positinal, setPositinal] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (position, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setPositinal({ ...positinal, [position]: open });
    };


    const list = position => (
        <div
            className={
                classes.list + (position === 'top' || position === 'bottom' ? classes.fullList : '')
            }
            role="presentation"
            onClick={toggleDrawer(position, false)}
            onKeyDown={toggleDrawer(position, false)}
        >
            {console.log(menuList)}
            {menuList.map((item, index) => {
                return (
                    <List key={item.MENU_ID}> 
                        <Link to={item.MENU_PUSH_LINK}>
                            <ListItem button key={item.MENU_NAME}>
                                <ListItemIcon>
                                    {item.MENU_ICON_NAME}
                                </ListItemIcon>
                                <ListItemText primary={item.MENU_NAME} />
                            </ListItem>
                        </Link>
                    </List>
                )
            })}
            <Divider />
        </div>
    );

    return (
        <div>
            <React.Fragment key={position}>
                <Tooltip title={'메뉴'}>
                    <IconButton onClick={toggleDrawer(position, true)}>
                        <MenuIcon color="inherit" />
                    </IconButton>
                </Tooltip>
                <Drawer position={position} open={positinal[position]} onClose={toggleDrawer(position, false)}>
                    {list(position)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default connect(state => ({
    position: state.ui.menuAppearPosition,
}))(SideBar)