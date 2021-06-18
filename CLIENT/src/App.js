import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core'

export class App extends Component {
  render() {
    console.log(this.props.sawGuide);
    return (
      <div>
        {this.props.auth ?
        // ----------------------------------------Logged
          'Logged in '
          :
          this.props.sawGuide === 'Y' ?
          // -------------------------------------- first View
            '123'
            :
            <Container></Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
