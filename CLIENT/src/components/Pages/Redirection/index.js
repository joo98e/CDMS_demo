import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

export class Redirection extends Component {
    doRedirection = () => {
        console.log('redirecting...');
        return (
            this.props.user.auth ?
                <Redirect
                    to={{
                        pathname: "/landing",
                        state: {
                            from: this.props.location,
                        },
                    }}
                />
                :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: this.props.location,
                        },
                    }}
                />
        )
    }

    render() {
        return (
            <>
                ${this.doRedirection()}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.UI.theme,
    user: state.User
});

export default connect(mapStateToProps)(Redirection)