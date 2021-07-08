import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Box, Zoom, withStyles } from '@material-ui/core';

const styles = theme => ({
    trans: {
        position: 'absolute;',
        top: '45%;',
        left: '50%;',
        transform: 'translate(-50 %,-50%);',
    }
});

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
        const { classes } = this.props;

        return (
            <Container>
                {
                    this.state.awhile === false ?
                        <div className={classes.trans}><CircularProgress disableShrink /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing));
