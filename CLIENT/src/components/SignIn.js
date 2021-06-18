import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core'

import StepComponent from './StepComponent';

export class SignIn extends Component {

  render() {

    return (
      <div>
        {this.props.auth ?
        // ---------------------------------------- Logged
          'Logged in '
          :
          this.props.sawGuide === 'Y' ?
          // -------------------------------------- step saw.
            '123'
            :
            // ------------------------------------ Stepper
            <Container maxWidth="md">
                <StepComponent />
            </Container>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  sawGuide: state.ui.sawGuide
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
