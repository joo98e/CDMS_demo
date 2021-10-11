import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import {
    Tooltip,
    IconButton,
    SwipeableDrawer,
    List, Divider, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'

import { 
    NoteIcon,
    MenuIcon,
    HomeIcon,
 } from "./CustomIcons"

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
        MENU_ID: '1',
        MENU_NAME: '홈',
        MENU_ICON_NAME: <HomeIcon />,
        MENU_PUSH_LINK: '/',
        MENU_PERMISSION: 'U'
    },
    {
        MENU_ID: '2',
        MENU_NAME: '기관 보기',
        MENU_ICON_NAME: <NoteIcon />,
        MENU_PUSH_LINK: '/agency',
        MENU_PERMISSION: 'U'
    },
    // {
    //     MENU_ID: '3',
    //     MENU_NAME: '대시보드',
    //     MENU_ICON_NAME: <VerticalIcon />,
    //     MENU_PUSH_LINK: '/dashboard',
    //     MENU_PERMISSION: 'U'
    // },
];

function SideBar(props) {
    const { position } = props;

    const classes = useStyles();
    const [positinal, setPositinal] = React.useState(false);
    const [menuInfo, setMenuInfo] = React.useState(null);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setPositinal(open);
    };

    const getMenuInfo = () => {
        const URL = "/api/util/menu/info";
        const condition = {
            delete_yn: 'N'
        }

        axios.get(URL, {
            params: condition
        })
            .then(res => {
                return res.data.result;
            });
    }

    React.useEffect(() => {

        setMenuInfo(getMenuInfo());
        // 아이콘때문에 비동기 처리가 어려움

        return () => {

        }
    }, [menuInfo])

    const list = position => (
        <div
            className={
                classes.list + (position === 'top' || position === 'bottom' ? classes.fullList : '')
            }
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
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
            <React.Fragment>
                <Tooltip title={'메뉴'}>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
                <SwipeableDrawer
                    anchor={position}
                    open={positinal}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list(position)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default connect(state => ({
    position: state.UI.menuAppearPosition,
}))(SideBar)