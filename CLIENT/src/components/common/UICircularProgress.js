import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    trans: {
        position: 'absolute;',
        top: '45%;',
        left: '50%;',
        transform: 'translate(-50%,-50%);',
    }
});

export class circular extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.trans}><CircularProgress color='inherit' disableShrink /></div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(circular));
