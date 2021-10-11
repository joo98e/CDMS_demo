import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import UICircularProgress from '../../../common/UICircularProgress'

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
            data: this.props.data
        })
    }

    render() {
        const { data } = this.props;

        return (
            <React.Fragment>
                {this.state.data ?
                    <ResponsiveContainer width="95%" aspect={4}>
                        <BarChart
                            width={600}
                            height={300}
                            data={data}
                            layout="vertical"
                            margin={{ top: 30, bottom: 30 }}
                        >
                            <XAxis
                                type="number"
                                tick={{ stroke: '#FFF' }}
                            />
                            <YAxis
                                type="category" dataKey="process_name"
                                tick={{ stroke: '#FFF' }}
                            />

                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip cursor={false} />
                            <Legend />
                            <Bar barSize={20} dataKey="cur_task" stackId="a" fill={this.props.theme.palette.background.default} />
                            <Bar barSize={20} dataKey="total_task" stackId="a" fill={"rgba(255,255,255,0.2)"} />
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
export default connect(mapStateToProps)(Chart)