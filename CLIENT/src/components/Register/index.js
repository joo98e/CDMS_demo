import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography, Button} from '@material-ui/core'

export class index extends Component {
    render() {
        return (
            <Box display='flex' justifyContent="center" alignItems="space-around" pt={30}>
                <Box>
                    <Button>
                        sdf
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

export default connect(mapStateToProps, mapDispatchToProps)(index)
