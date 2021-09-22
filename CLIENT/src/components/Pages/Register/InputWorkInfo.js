import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../../../_actions/UserInfo'
import {
    Container, Grid, TextField, IconButton, Typography, MenuItem,
    Box, Button, Select, FormControl, InputLabel, withStyles, Divider
} from '@material-ui/core'

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
            orgStructure: {
                departs : null,
                rank : null
            },
            unboot: false
        }
    }
    
    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({ orgStructure: res })
            })
            .catch(err => console.log(err));
            
    }

    callApi = async () => {
        let resDepart = await fetch('/api/org/depart');
        let resRank = await fetch('/api/org/rank');

        let _temp = {
            departs : await resDepart.json(),
            rank : await resRank.json()
        }
        return _temp;
    }

    handleValueChange = (e) => {
        let nextState = { ...this.props.registerMember };
        nextState[e.target.name] = e.target.value;

        this.props.setRegisterMemberInfo(nextState);
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
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="dept_no" name="dept_no">부서 *</InputLabel>
                                    {this.state.orgStructure.departs ?
                                        <Select
                                            labelId="dept_no"
                                            id="dept_no"
                                            name="dept_no"
                                            value={this.props.registerMember.dept_no}
                                            onChange={this.handleValueChange}
                                        >
                                            {this.state.orgStructure.departs.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        :
                                        ''
                                    }
                                </FormControl>
                            </Container>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="MEM_DEPART_NO">직급 *</InputLabel>
                                    {this.state.orgStructure.rank ?
                                        <Select
                                            labelId="rank_no"
                                            id="rank_no"
                                            name="rank_no"
                                            value={this.props.registerMember.rank}
                                            onChange={this.handleValueChange}
                                        >
                                            {this.state.orgStructure.rank.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        :
                                        ''
                                    }
                                </FormControl>
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
