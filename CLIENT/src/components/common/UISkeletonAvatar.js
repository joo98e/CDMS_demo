/** 
 * @param {src}             : 이미지 경로
 * @param {alt}             : 대체 텍스트
 * @returns {Avatar}
 */

import React, { PureComponent } from 'react'

import { Avatar, withStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const style = theme => ({
    center: {
        margin: "0 auto"
    }
});

export class UISkeletonAvatar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            avatarLoad: false
        }
    }

    componentDidMount() {
        const loadImage = new Image();
        loadImage.src = this.props.src;
        loadImage.addEventListener('load', () => {
            this.setState({ avatarLoad: true });
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {
                    this.state.avatarLoad ?
                        <Avatar
                            className={this.props.class ? `${classes.center} + ${this.props.class}` : classes.center}
                            src={this.props.src}
                            alt={this.props.alt}
                        />
                        :
                        <Skeleton
                            className={classes.center}
                            variant="circle"
                            width={40}
                            height={40}
                        />
                }
            </React.Fragment>
        )
    }
}

export default withStyles(style)(UISkeletonAvatar);
