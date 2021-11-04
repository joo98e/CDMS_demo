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

import { TableRow, TableCell, Switch } from '@material-ui/core';
import UISkeletonAvatar from './UISkeletonAvatar';

export class UIPersonRowOnlyOne extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: this.isChecked(),
            avatarLoad: false
        }
    }

    componentDidMount() {

    }

    isChecked = () => {
        let status = false;
        if (this.props.data.seq === this.props.item.seq) {
            status = true;
        }
        return status;
    }

    render() {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <UISkeletonAvatar
                            src={this.props.item.avatar_path}
                            alt={this.props.item.last_name}
                        />
                    </TableCell>
                    <TableCell align="left">
                        {this.props.item.full_name}
                    </TableCell>
                    <TableCell className="mobile-person-row" align="left">
                        {this.props.item.dept_name}
                    </TableCell>
                    <TableCell className="mobile-person-row" align="left">
                        {this.props.item.id}
                    </TableCell>
                    <TableCell className="mobile-person-row" align="left">
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

export default UIPersonRowOnlyOne;
