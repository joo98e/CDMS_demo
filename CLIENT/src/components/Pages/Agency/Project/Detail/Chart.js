import React, { PureComponent } from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import axios from 'axios';
import { Paper, withStyles } from '@material-ui/core'
import UICircularProgress from '../../../../common/UICircularProgress'

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

const data = [
    {
        name: getGoneDate(20), uv: 10040, pv: 2400, amt: 7000,
    },
    {
        name: getGoneDate(15), uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: getGoneDate(7), uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: getGoneDate(5), uv: 2780, pv: 12000, amt: 2000,
    },
    {
        name: getGoneDate(3), uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: getGoneDate(2), uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: getGoneDate(1), uv: 3490, pv: 4300, amt: 2100,
    },
];

class Chart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                ...this.state,
                data: data
            })
        }, 1000);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper>
                {this.state.data ?
                    <ResponsiveContainer width="99%" aspect={3}>
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 50, right: 30, left: 20, bottom: 30,
                            }}
                        >
                            <CartesianGrid strokeDasharray="4 4" />
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                    :
                    <Paper style={{ minHeight: '406px' }}>
                        <UICircularProgress />
                    </Paper>
                }
            </Paper>
        );

    }
}

export default withStyles(styles)(Chart)