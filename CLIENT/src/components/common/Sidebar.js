import React from 'react';
import { connect } from 'react-redux';

import Axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    Tooltip,
    IconButton,
    List, Divider, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function SideBar(props) {
    const { position } = props;

    const classes = useStyles();
    const [positinal, setMenuBar] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    React.useEffect(() => {
        Axios.get("https://lq-time-tracking.firebaseio.com/user.json")
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                
            })
    }, []);

    const toggleDrawer = (position, open) => (event) => {
        console.log(position);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuBar({ ...positinal, [position]: open });
    };

    const list = position => (
        <div
            className={
                classes.list + (position === 'top' || position === 'bottom' ? classes.fullList : '')
            }
            onClick={toggleDrawer(position, false)}
            onKeyDown={toggleDrawer(position, false)}
        >
            {/* ──────────────────────────────────────────────────────────────────────────────────────── */}
            <List>
                {['추후에', 'DB로', '관리할'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['예정', '입니다.'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {/* ──────────────────────────────────────────────────────────────────────────────────────── */}
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