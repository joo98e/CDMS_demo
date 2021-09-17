import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../../_actions/UserInfo'
import {
    Container, Grid, TextField, IconButton, Typography,
    Box, Button,
    withStyles,
    Divider
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { withSnackbar } from 'notistack'

const styles = theme => ({
    fullWidth: {
        width: "100%"
    },
    center: {
        margin: "0 auto"
    },
    marginBottom3: {
        marginBottom: theme.spacing(4)
    }
});

export class InputJobs extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            departs: "",
            unboot: false
        }
    }
    handleValueChange = (e) => {
        let nextState = { ...this.state.MEM };
        nextState[e.target.name] = e.target.value;

    }

    handleChangeShowPassWord = () => {
        this.setState({
            showPassword: !this.state.showPassword ? true : false
        });
    }

    handleFileChange = (e) => {

    }

    hasConfirmed = () => {

    }

    valueChecking = () => {

    }

    componentDidMount() {
        console.log(this.props.registerMember);
    }


    render() {
        const { classes } = this.props;
        return (
            <Box >
                <Divider />

                <Box mt={8} mb={4}>
                    <Typography variant="h4" align='center'>
                        어떤 업무를 하시나요?
                    </Typography>
                </Box>
                <Container className={classes.marginBottom3}>
                    <Grid container justifyContent='center' spacing={4}>
                        <Grid item xs={12}>
                            <Container>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    name="first_name"
                                    label="성"
                                    onChange={this.handleValueChange}
                                />
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
                <Divider className={classes.marginBottom3} />
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    registerMember: state.user.registerMember
});

const mapDispatchToProps = dispatch => {
    return {
        setRegisterMemberInfo: payload => { dispatch(actions.setRegisterMemberInfo(payload)) }
    }
};

export default
    connect(mapStateToProps, mapDispatchToProps)
        ((withRouter
            (withSnackbar
                (withStyles(styles)
                    (InputJobs)
                )
            )
        ));
