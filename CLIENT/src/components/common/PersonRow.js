import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/UserInfo';

import {
    Avatar, withStyles, TableRow, TableCell, Switch,
} from '@material-ui/core';

const style = theme => ({
    center: {
        margin: "0 auto"
    }
});

export class PersonRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: false
        }
    }
    componentDidMount() {
        if(Array.isArray(this.props.projectMember) && this.props.projectMember.length !== 0){
            for (let i in this.props.projectMember){
                if(this.props.projectMember[i].id === this.props.data.id){
                    this.setState({checked : true});
                }
            }
        }
    }
    
    /*
        TODO    
        체크 박스 만들기
        아바타 경로 찾아주기
    */

    handleSwitchChecked = (newMember) => {
        this.props.setProjectInOutPutPerson(newMember);

        this.setState({
            checked: !this.state.checked ? true : false
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell>
                    <Avatar className={classes.center} />
                </TableCell>
                <TableCell align="left">
                    {this.props.data.MEM_NAME}
                </TableCell>
                <TableCell align="left">
                    {this.props.data.DEPART_NAME}
                </TableCell>
                <TableCell align="left">
                    {this.props.data.MEM_USERID}
                </TableCell>
                <TableCell align="left">
                    {this.props.data.MEM_EMAIL}
                </TableCell>
                <TableCell align="left">
                    <Switch
                        checked={this.state.checked}
                        onChange={() => { this.handleSwitchChecked(this.props.data) }}
                    />
                </TableCell>
            </TableRow>
        )
    }
}

const mapStateToProps = (state) => ({
    projectMember: state.user.projectMember
})

const mapDispatchToProps = (dispatch) => {
    return {
        setProjectInOutPutPerson: (payload) => { dispatch(actions.setProjectInOutPutPerson(payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PersonRow));
