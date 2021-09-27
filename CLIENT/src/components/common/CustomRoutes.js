import React, { PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles';
import Layout from './Layout'

export class CustomRoutes extends PureComponent {

    componentDidMount() {
        !this.props.user.auth && this.props.history.push('/login');
    }


    render() {
        const { component: Component, layout, ...rest } = this.props;
        return (
            <ThemeProvider theme={this.props.theme}>
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
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    hourlyGreetings: state.UI.hourlyGreetings,
    user: state.User,
    theme: state.UI.theme
})

CustomRoutes.defaultProps = {
    layout: true
}

export default connect(mapStateToProps)(withRouter(CustomRoutes))
