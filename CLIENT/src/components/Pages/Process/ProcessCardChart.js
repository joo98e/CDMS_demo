import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, Label
} from 'recharts';

import axios from 'axios';
import { withStyles } from '@material-ui/core'
import UICircularProgress from '../../common/UICircularProgress'

const styles = theme => ({
    root: {
        marginTop: theme.spacing(4)
    }
});

const getGoneDate = days => {
    let tmp = new Date();

    let years = tmp.getFullYear();
    let month = tmp.getMonth();
    let day = tmp.getDate() - days;

    const result = `${String(years)}-${String(month)}-${String(day)}`;

    return result;
}

class Chart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: ""
        }
    }
    
    render() {
        const { classes } = this.props;

        const data = [
            {
                name: this.props.columnName,
                MIN: this.props.MIN.value,
                MAX: this.props.MAX.value,
            }
        ];

        return (
            <React.Fragment>
                {data ?
                    <ResponsiveContainer width="95%" aspect={4}>
                        <BarChart
                            data={data}
                            width={200}
                            height={200}
                            layout="vertical"
                            margin={{ top: 30, bottom: 30 }}
                        >
                            <CartesianGrid strokeDasharray="4 4" />

                            <XAxis
                                type="number"
                                tick={{ stroke: this.props.theme.palette.text.primary }}
                            />
                            <YAxis
                                type="category" dataKey="process_name"
                                tick={{ stroke: this.props.theme.palette.text.primary }}
                            />

                            <Bar barSize={20} dataKey="MIN" stackId="a" fill={this.props.theme.palette.background.default} />
                            <Bar barSize={20} dataKey="MAX" stackId="a" fill={"rgba(255,255,255,0.2)"} />
                        </BarChart>
                    </ResponsiveContainer>
                    :
                    <UICircularProgress />
                }
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.UI.theme
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Chart))