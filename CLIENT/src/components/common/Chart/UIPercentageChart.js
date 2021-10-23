/**
 * @param {min}  : Number / 최소값
 * @param {max}  : Number / 최대값
 * @return {UIPercentageChart}
 */

import React from 'react'
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux'
import { PieChart } from 'react-minimal-pie-chart'
import UICircularProgress from '../UICircularProgress';

export const UIPercentageChart = (props) => {
    const theme = useSelector(state => state.UI.theme);

    const propsData = [
        {
            name: props.name,
            value: (props.min / props.max) * 100,
            color: theme.palette.chart.sub
        }
    ];

    const getLabel = (dataEntry) => {
        return dataEntry.value === 0 ? "대기" :
            dataEntry.value === 100 ? "완료" : dataEntry.value + "%";
    }

    return (
        <React.Fragment>
            {propsData &&
                <PieChart
                    data={propsData}
                    rounded
                    animate
                    reveal={propsData[0].value}
                    lineWidth={24}
                    lengthAngle={360}
                    label={({ dataEntry }) => getLabel(dataEntry)}
                    labelPosition={0}
                    labelStyle={{
                        fontSize: theme.spacing(2),
                        fill: theme.palette.text.desc
                    }}
                    background={theme.palette.chart.background}
                />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

UIPercentageChart.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(UIPercentageChart)

