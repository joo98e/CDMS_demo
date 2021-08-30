import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Avatar, withStyles, TableRow, TableCell
} from '@material-ui/core';

const style = theme => ({

});

export class PersonRow extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    /*
        TODO    
        체크 박스 만들기
        아바타 경로 찾아주기
    */
    render() {
        
        return (
            <TableRow>
                <TableCell>
                    <Avatar></Avatar>
                </TableCell>
                <TableCell align="left">
                    {this.props.data.DEPART_NAME}
                </TableCell>
                <TableCell align="left">
                    {this.props.data.MEM_USERID}
                </TableCell>
                <TableCell align="left">
                    {this.props.data.MEM_NAME}
                </TableCell>
                <TableCell align="left">
                    {this.props.data.MEM_EMAIL}
                </TableCell>
            </TableRow>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PersonRow));
