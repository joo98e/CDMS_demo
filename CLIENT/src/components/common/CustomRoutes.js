import React, { PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import UISnackBar from './UISnackBar';
import Layout from './Layout'

export class CustomRoutes extends PureComponent {

    componentDidMount() {
        if (!this.props.user.auth || !this.props.user.member) {
            this.props.history.push('/login');
        }
    }


    render() {
        const { component: Component, layout, ...rest } = this.props;
        return (
            <ThemeProvider theme={this.props.theme}>
                <CssBaseline />
                <SnackbarProvider maxSnack={2} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} action={(key) => (<UISnackBar goods={key} />)} >
                    <Route
                        {...rest}
                        render={props => {
                            return (
                                layout ?
                                    <Layout component={Component} />
                                    :
                                    <Component {...props} />
                            )
                        }}
                    />
                </SnackbarProvider>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User,
    theme: state.UI.theme
})

CustomRoutes.defaultProps = {
    layout: true
}

export default connect(mapStateToProps)(withRouter(CustomRoutes))
