import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

const copyRight = () => {
    const date = new Date();
    return (
        <Typography variant="h6" component="h6" align="center">
            2020 - {date.getFullYear()}, TB Co. all rights reserved.
        </Typography>
    );
}

export class CopyRights extends Component {
    render() {
        return (
            <div>
                {copyRight()}
            </div>
        )
    }
}

export default CopyRights
