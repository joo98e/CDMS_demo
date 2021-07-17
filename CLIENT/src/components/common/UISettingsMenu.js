import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import * as actions from '../../actions'

import { withStyles } from '@material-ui/core'
import ColorLensIcon from '@material-ui/icons/ColorLens';
import CachedIcon from '@material-ui/icons/Cached';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';

const styles = theme => ({
    exampleWrapper: {
        position: 'relative',
    },
    speedDial: {
        position: 'fixed',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
});

const List = [
    { icon: <ColorLensIcon />, name: '테마 변경' },
    { icon: <CachedIcon />, name: '메뉴 위치 변경' },
];

export class UISettingsMenu extends Component {
    handleClick = (key) => {

        switch (key) {
            case '테마 변경':
                this.props.handleSetTheme();
                this.props.enqueueSnackbar('테마가 변경되었습니다.', { variant: 'success' });
                break;

            case '메뉴 위치 변경':
                this.props.handleSetMenuAppearPosition();
                this.props.enqueueSnackbar('메뉴 위치 변경 기능은 개발중입니다.', { variant: 'success' });
                break;

            default:
                break;
        }

    }

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            hidden: false
        }
    }
    
    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={this.state.hidden}
                    icon={<SpeedDialIcon />}
                    open={this.state.open}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                >
                    {List.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            value={this.props.theme}
                            onClick={() => { this.handleClick(action.name) }}
                        />
                    ))}
                </SpeedDial>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.ui.theme,
    menuAppearPosition : state.ui.menuAppearPosition
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetTheme: theme => { dispatch(actions.setTheme(theme)) },
        handleSetMenuAppearPosition: position => { dispatch(actions.setMenuAppearPosition(position)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(UISettingsMenu)))
