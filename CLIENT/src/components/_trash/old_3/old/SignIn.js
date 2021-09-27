import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

export class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id : this.props.id,
             password : this.props.password,
        }
    }

    render() {
        return (
            <div>
                <Button size="medium" onClick={this.cls}>
                    회원가입
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
