import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Paper, Box, Grid, Button, TextField} from '@material-ui/core'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id: '',
            user_password: ''
        }
    }

    render() {
        return (
            <Container fixed>
                <Box component="div" style={{ height: '100vh' }}>
                    <Paper variant="outlined" square>
                        <Grid container justify='center' alignContent='center' alignItems='center'>
                            <Grid item xs={12}>
                                <Container width={400}>
                                    <TextField
                                        variant="filled"
                                    />
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Container>
                                    <Button
                                        fullWidth
                                    >
                                        1
                                    </Button>
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Container>
                                    <Button
                                        fullWidth
                                    >
                                        2
                                    </Button>
                                </Container>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
