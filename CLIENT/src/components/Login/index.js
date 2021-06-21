import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Paper, Grid, Button, TextField } from '@material-ui/core'

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
            <Container width={1280}>
                <Paper>
                    <Grid container justify='center'>
                        <Grid item xs={12}>
                            <Container>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                >
                                    1
                                </TextField>
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
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
