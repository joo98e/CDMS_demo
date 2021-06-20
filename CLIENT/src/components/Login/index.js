import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Box, Button } from '@material-ui/core'

export class Login extends Component {
    render() {
        return (
            <Box display='flex' justifyContent="center" alignItems="space-around" pt={30}>
                <Box>
                    <Button>
                        텍스트필드만들기
                    </Button>
                </Box>
                <Box>
                    <Button>
                        sdf
                    </Button>
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
