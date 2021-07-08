import React, { Component } from 'react';
import { connect } from 'react-redux';
import UICircularProgress from '../common/UICircularProgress'

import { Container, Box, Zoom } from '@material-ui/core';

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            awhile: false
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({
                awhile: true
            });
        }, 1500);
    }



    render() {

        return (
            <Container>
                {
                    this.state.awhile === false ?
                        <UICircularProgress />
                        :
                        <Box>
                            <Zoom in={this.state.awhile} timeout={1000}>
                                <Box>
                                    123
                                </Box>
                            </Zoom>
                        </Box>
                }


            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.user.authenticated
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
