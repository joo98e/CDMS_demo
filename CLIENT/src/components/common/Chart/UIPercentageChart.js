/**
 * @param {min}  : Number / 최소값
 * @param {max}  : Number / 최대값
 * @return {UIPercentageChart}
 */

import React from 'react'
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux'
import { PieChart } from 'react-minimal-pie-chart'

export const UIPercentageChart = (props) => {
    const theme = useSelector(state => state.UI.theme);

    const propsData = [
        {
            name: props.name,
            value: (typeof props.min !== 'number' || typeof props.max !== 'number') ?
                "0"
                :
                Math.round((props.min / props.max) * 100),
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
                    lineWidth={8}
                    lengthAngle={360}
                    label={({ dataEntry }) => getLabel(dataEntry)}
                    labelPosition={0}
                    labelStyle={{
                        fontSize: theme.spacing(2),
                        fill: theme.palette.text.primary
                    }}
                    background={theme.palette.chart.background}
                    style={{ maxHeight: props.mh ? props.mh + "px" : "260px" }}
                />
            }
        </React.Fragment>
    )
}

UIPercentageChart.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    mh: PropTypes.number
}

export default UIPercentageChart

