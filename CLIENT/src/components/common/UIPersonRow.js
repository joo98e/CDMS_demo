/** 
 * @param {this.props.item.avatar_path}                     : 아바타 경로
 * @param {this.props.item.full_name}                       : 풀네임
 * @param {this.props.item.dept_name}                       : 부서 번호
 * @param {this.props.item.id}                              : 멤버 seq
 * @param {this.props.item.rank_name}                       : 직급명
 * @param {this.props.UIPersonRowChangeData(this}           : PersonList에 선택된 것을 반환
 * @returns {this.props.ResultData}                         : 결과값 반환
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
            checked: this.props.data,
            avatarLoad: false
        }
    }

    componentDidMount() {
        const loadImage = new Image();
        loadImage.src = this.props.item.avatar_path;
        loadImage.addEventListener('load', () => {
            this.setState({ avatarLoad: true });
        })
    }


    isChecked = () => {
        let status = false;
        for (let idx in this.props.data) {
            if (this.props.data[idx].seq === this.props.item.seq) {
                status = true;
            }
        }
        return status;
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        {
                            this.state.avatarLoad ?
                                <Avatar
                                    className={classes.center}
                                    alt={this.props.item.full_name}
                                    src={this.props.item.avatar_path}
                                />
                                :
                                <Skeleton
                                    className={classes.center}
                                    variant="circle"
                                    width={40}
                                    height={40}
                                />
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

            </React.Fragment>
        )
    }
}

export default (withStyles(style)(PersonRow));
