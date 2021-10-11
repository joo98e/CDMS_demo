import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    XAxis, YAxis, CartesianGrid, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import UICircularProgress from '../../common/UICircularProgress'

class Chart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: ""
        }
    }
    render() {

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

export default connect(mapStateToProps)(Chart);