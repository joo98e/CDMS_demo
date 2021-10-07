/**
 * not be used
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Favorite } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';

const styles = theme => ({

    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },

    exampleWrapper: {
        position: 'absolute',
        marginTop: theme.spacing(2),
        height: 380,
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

const items = [
    { icon: <Favorite />, name: 'Theme' }
];

class Systems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            hidden: false,
            direction: 'up'
        }
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open ? true : false
        });
    }

    render() {
        const classes = this.props;
        return (
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="System Settings"
                    className={classes.speedDial}
                    icon={<SpeedDialIcon />}
                    onClose={this.handleToggle}
                    onOpen={this.handleToggle}
                    open={this.state.open}
                    direction={this.state.direction}
                >
                    {items.map(items => {
                        return (
                            <SpeedDialAction
                                key={items.name}
                                icon={items.icon}
                                tooltipTitle={items.name}
                                onClick={this.handleClose}
                            />
                        )
                    })}
                </SpeedDial>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.UI.theme
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Systems));
