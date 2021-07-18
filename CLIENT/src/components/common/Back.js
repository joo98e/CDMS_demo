import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, withStyles, IconButton } from '@material-ui/core'
import { KeyboardBackspace } from '@material-ui/icons'

const styles = theme => ({
    wrapper: {
        position: 'relative',
        display: 'block'
    }
});

export class Back extends Component {

    fallBack = () => {
        try {
            this.props.history.goBack();
        } catch (error) {
            
        }
        
    }

    render() {
        const classes = this.props;

        return (
            <Box className={classes.wrapper}>
                <IconButton onClick={this.fallBack}>
                    <KeyboardBackspace />
                </IconButton>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Back))
