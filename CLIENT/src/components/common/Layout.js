import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Box, withStyles } from '@material-ui/core';

import MyNav from './MyNav';
import UISettingsMenu from './UISettingsMenu';

const styles = theme => ({
    root : {
        
    },
});

export class Layout extends Component {

    myNav = () => {
        return (
            this.props.user.auth && (
                <>
                    {this.props.user.auth &&
                        <MyNav />
                    }
                </>
            )

        )
    }

    render() {
        const { component: Component } = this.props;
        return (
            <>
                {this.myNav()}
                <Box
                    pt={this.props.user.auth ? 10 : 0}
                    style={{
                        position: "relative",
                        height: "100%",
                        minHeight : "100vh",
                        color: this.props.theme.palette.text.primary,
                        background: this.props.theme.palette.background.default
                    }}
                >
                    <Component />
                </Box>
                <UISettingsMenu />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    hourlyGreetings: state.ui.hourlyGreetings,
    user: state.user,
    theme: state.ui.theme
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));
