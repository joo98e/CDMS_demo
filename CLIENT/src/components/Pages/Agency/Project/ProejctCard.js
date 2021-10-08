import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Card, CardAction, Grid, Paper, Button
} from '@material-ui/core'
import UICardHeader from "../../../common/Card/UICardHeader"
import {
    MoreVertIcon
} from '../../../common/CustomIcons';

export class ProejctCard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid item xs={4} md={4} lg={4}>
                    <Paper elevation={4} className={classes.root}>
                        <Card>
                            <UICardHeader
                                title={this.props.item.name}
                                icon={MoreVertIcon}
                            />
                        </Card>
                    </Paper>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProejctCard)
