import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Container,
    
    withStyles,
} from '@material-ui/core';

import Card from '../../common/Card'

const styles = theme => ({
    root : {
        paddingTop : theme.spacing(8)
    }
});

export class index extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.root}>
                <Card></Card>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
