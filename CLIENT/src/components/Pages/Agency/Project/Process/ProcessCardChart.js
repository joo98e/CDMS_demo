import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, Label
} from 'recharts';

import axios from 'axios';
import { withStyles } from '@material-ui/core'
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

class Chart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        console.log(this.props.curValue);
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
                    <ResponsiveContainer width="100%" aspect={5}>
                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                bottom: 10,
                                left: 20,
                                right: 20
                            }}
                        >
                            <CartesianGrid strokeDasharray="4 4" />

                            <XAxis
                                dataKey="name"
                                tick={{ stroke: this.props.theme.palette.text.primary }}
                            />
                            <YAxis
                                tick={{ stroke: this.props.theme.palette.text.primary }}
                            />

                            <Bar barSize={100} dataKey="MIN" stackId="a" fill={this.props.theme.palette.background.default} />
                            <Bar barSize={100} dataKey="MAX" stackId="a" fill="rgba(0,0,0,0.2)" />
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