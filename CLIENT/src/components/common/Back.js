import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, Button, withStyles } from '@material-ui/core'

const styles = theme => ({
    wrapper: {
        position : 'relative',
        display : 'block'
    }
});

export class Back extends Component {

    fallBack = () => {
        this.props.history.goBack();
    }
    
    render() {
        const classes = this.props;

        return (
            <Box className={classes.wrapper}>
                <Button onClick={this.fallBack}>
                    뒤로 가기
                </Button>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Back))
