import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

export class SignUp extends Component {
    render() {
        return (
            <div>
            <Button size="medium">
                로그인
            </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
