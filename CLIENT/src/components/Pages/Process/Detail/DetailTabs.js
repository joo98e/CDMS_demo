import React from 'react'
import {
    AppBar, Tab, Tabs, useTheme,
    withStyles
} from '@material-ui/core'
import {
    HomeIcon, SubjectIcon
} from '../../../common/CustomIcons'

const StyledTabs = withStyles(theme => ({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            minWidth: 80,
            backgroundColor: theme.palette.background.whiteButton,
        },
    },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.text.desc,
        fontSize: theme.typography.pxToRem(24),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab {...props} />);

export const DetailTabs = (props) => {
    const theme = useTheme();

    const handleChangeValue = (e, newValue) => {
        console.log(newValue);
        props.setValue(newValue);
    }

    const TabsInfos = [
        {
            name: "개요",
            icon: <HomeIcon />,
            component: "",
        },
        {
            name: "자료",
            icon: <SubjectIcon />,
            component: "",
        },
    ];

    return (
        <AppBar
            position="static"
            color="transparent"
            style={{ flexGrow: 1 }}
        >
            <StyledTabs
                value={props.value}
                onChange={handleChangeValue}
                indicatorColor="secondary"
                textColor="secondary"
            >
                {
                    TabsInfos.map((item, index) => {
                        return (
                            <StyledTab
                                key={index}
                                // label={item.name}
                                icon={item.icon}
                            />
                        )
                    })
                }
            </StyledTabs>
        </AppBar>
    )
}

export default DetailTabs
