import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Paper, Typography, Box, withStyles } from '@material-ui/core'
import UICharts from '../../common/UICharts'

const styles = theme => ({
    root: {
        boxSizing : 'border-box',
        padding : theme.spacing(4),
    },
    chartsArea: {
        position: 'relative',
    },
    mh: {
        minHeight : '300px'
    }
});

export class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                <React.Fragment>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} md={6} lg={6}>
                            <Paper className={classes.mh}>
                                1번
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={classes.mh}>
                                2번
                            </Paper>
                        </Grid> */}
                        <Grid item xs={12} className={classes.chartsArea}>
                            <UICharts />
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Box>
        )

    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing))
