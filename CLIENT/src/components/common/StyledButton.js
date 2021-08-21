import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, withStyles } from '@material-ui/core'

const styles = theme => ({
    sssss: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
    }
});

export class StyledButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        // const { classes } = this.props;
        console.log(this.props);
        return (
            <Button
                // className={classes.sssss}
                variant={this.props.variant ? this.props.variant : 'outlined'}
                size={this.props.size ? this.props.size : 'small'}
            >
                {this.props.contents ? this.props.contents : '내용 없음'}
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.ui.theme
})

export default connect(mapStateToProps)(withStyles(styles)(StyledButton))
