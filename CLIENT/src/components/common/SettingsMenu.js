import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import { withStyles } from '@material-ui/core'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import ColorLensIcon from '@material-ui/icons/ColorLens';

const styles = theme => ({
    exampleWrapper: {
        position: 'relative',
    },
    speedDial: {
        position: 'absolute',
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
    { icon: <ColorLensIcon />, name: 'theme' },
];

export class SettingsMenu extends Component {
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

    handleClick = (key) => {

        switch (key) {
            case 'theme':
                this.props.handleSetTheme();
                break;

            default:
                break;
        }

    }

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
    theme: state.ui.theme
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetTheme: theme => { dispatch(actions.setTheme(theme)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsMenu))
