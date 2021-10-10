import React, { PureComponent } from 'react';

import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar

} from 'recharts';

import axios from 'axios';
import { withStyles } from '@material-ui/core'
import UICircularProgress from '../../../common/UICircularProgress'

const styles = theme => ({
    root: {
        marginTop: theme.spacing(4)
    }
});

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

class Chart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            data: data
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.data ?
                    <ResponsiveContainer width="95%" aspect={3}>
                        <BarChart
                            width={200}
                            height={100}
                            data={data}
                            margin={{
                                top: 50,
                                right: 50,
                                left: 50,
                                bottom: 50
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />


                            <XAxis dataKey="name"
                                onClick={() => console.log(1)}
                                tick={{ stroke: '#FFF' }}
                                style={{
                                    cursor: "pointer"
                                }}
                            />
                            <YAxis
                                tick={{ stroke: '#FFF' }}
                            />
                            <Tooltip cursor={false} />
                            <Legend />
                            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    :
                    <UICircularProgress />
                }
            </React.Fragment>
        );

    }
}

export default withStyles(styles)(Chart)