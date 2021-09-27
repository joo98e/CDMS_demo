import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import * as actions from '../../redux/action/UIAction'
import { withStyles } from '@material-ui/core'
import ColorLensIcon from '@material-ui/icons/ColorLens';
import CachedIcon from '@material-ui/icons/Cached';
import TouchAppTwoToneIcon from '@material-ui/icons/TouchAppTwoTone';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';

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
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            hidden: false
        }
    }

    handleClick = (key) => {
        switch (key) {
            case '테마 변경':
                this.props.handleSetTheme();
                this.props.enqueueSnackbar('테마가 변경되었습니다.', { variant: 'success' });
                break;

            case '메뉴 위치 변경':
                this.props.handleSetMenuAppearPosition();
                this.props.enqueueSnackbar(`메뉴 위치가 변경되었습니다. (${this.props.menuAppearPosition})`, { variant: 'success' });

                break;

            default:
                break;
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
                    icon={<TouchAppTwoToneIcon style={{ color: this.props.theme.palette.background.button }} />}
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
    theme: state.UI.theme,
    menuAppearPosition: state.UI.menuAppearPosition
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetTheme: theme => { dispatch(actions.setTheme(theme)) },
        handleSetMenuAppearPosition: position => { dispatch(actions.setMenuAppearPosition(position)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(UISettingsMenu)))
