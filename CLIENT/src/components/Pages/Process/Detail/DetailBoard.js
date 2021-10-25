import React from 'react'
import { connect } from 'react-redux'
import {
    Zoom, Grid, Paper
} from '@material-ui/core'
export const DetailBoard = (props) => {
    return (
        <Zoom in={props.value === props.index} timeout={800}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12}>
                    <Paper>
                        보드 페이지
                    </Paper>
                </Grid>
            </Grid>
        </Zoom>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBoard)
