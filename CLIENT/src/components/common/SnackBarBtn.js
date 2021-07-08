import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import { Button } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';

export class SnackBarBtn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    handleCloseSnackBar = () => {
        console.log(this.props.goods);
        this.props.closeSnackbar(this.props.goods);
    }

    render() {
        return (
            <Button
                onClick={this.handleCloseSnackBar}
            >
                <CancelIcon />
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackBarBtn))
