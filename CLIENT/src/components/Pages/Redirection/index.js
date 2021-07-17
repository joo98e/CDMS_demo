import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

export class Redirection extends Component {
    doRedirection = () => {
        console.log(this.props.user.auth);
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
    theme: state.ui.theme,
    user: state.user
});

export default connect(mapStateToProps)(Redirection)