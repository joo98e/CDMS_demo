/** 
 * @param {this.props.item.avatar_path}                     : 
 * @param {this.props.item.full_name}                       : 
 * @param {this.props.item.dept_name}                       : 
 * @param {this.props.item.id}                              : 
 * @param {this.props.item.rank_name}                       : 
 * @param {this.props.UIPersonRowChangeData(this}           :             
 * @returns {PersonRow}
 */

import React, { Component } from 'react';

import {
    Avatar, withStyles, TableRow, TableCell, Switch
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const style = theme => ({
    center: {
        margin: "0 auto"
    }
});

export class PersonRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: this.props.personData,
            avatarLoad: false
        }
    }

    isChecked = () => {
        let status = false;
        for (let idx in this.props.personData) {
            if (this.props.personData[idx].seq === this.props.item.seq) {
                status = true;
            }
        }
        return status;
    }

    render() {
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell>
                    {
                        this.state.avatarLoad ?
                            <Avatar
                                className={classes.center}
                                alt="멤버 아바타"
                                src={this.props.item.avatar_path}
                            />
                            :
                            <Skeleton variant="circle" width={40} height={40}>

                            </Skeleton>
                    }
                </TableCell>
                <TableCell align="left">
                    {this.props.item.full_name}
                </TableCell>
                <TableCell align="left">
                    {this.props.item.dept_name}
                </TableCell>
                <TableCell align="left">
                    {this.props.item.id}
                </TableCell>
                <TableCell align="left">
                    {this.props.item.rank_name}
                </TableCell>
                <TableCell align="left">
                    <Switch
                        checked={this.isChecked()}
                        onChange={() => { this.props.UIPersonRowChangeData(this.props.item) }}
                    />
                </TableCell>
            </TableRow>
        )
    }
}

export default (withStyles(style)(PersonRow));
