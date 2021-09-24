/** 
 * @param {}             :
 * @param {}             :
 * @param {}             :
 * @returns {}
 */

import React, { Component } from 'react';

import {
    Avatar, withStyles, TableRow, TableCell, Switch,
} from '@material-ui/core';

const style = theme => ({
    center: {
        margin: "0 auto"
    }
});

export class PersonRow extends Component {

    render() {
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell>
                    <Avatar className={classes.center} />
                </TableCell>
                <TableCell align="left">
                    {this.props.item.full_name}
                </TableCell>
                <TableCell align="left">
                    sdf
                </TableCell>
                <TableCell align="left">
                    sdf
                </TableCell>
                <TableCell align="left">
                    sdf
                </TableCell>
                <TableCell align="left">
                    <Switch
                        onChange={() => { this.props.handleChangePersonData(this.props.item) }}
                    />
                </TableCell>
            </TableRow>
        )
    }
}

export default (withStyles(style)(PersonRow));
