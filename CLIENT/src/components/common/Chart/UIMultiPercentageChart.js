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
    const [reveal, setReveal] = React.useState(null);

    const propsData = [
        {
            name: props.name,
            value: reveal,
            color: theme.palette.chart.accent
        },
    ]

    const getLabel = (dataEntry) => {
        return dataEntry.value === 0 ? "대기" :
            dataEntry.value === 100 ? "완료" : dataEntry.value + "%";
    }

    React.useEffect(() => {

        const getPercentageByProcess = () => {
            if (props.data.length === 0) {
                setReveal(0)
                return false;
            }

            let arr = [];
            for (let i = 0; i < props.data.length; i++) {
                const _percentageByProcess = props.data[i][0] / props.data[i][1] * 100
                arr.push(_percentageByProcess);
            }

            let result = arr.reduce((sum, currValue) => {
                return sum + currValue;
            }, 0);

            result = Math.round(result / arr.length);
            setReveal(result)
            return result;
        }

        getPercentageByProcess();
    }, [props.data, reveal]);

    return (
        <React.Fragment>
            {
                typeof reveal === 'number' ?
                    <PieChart
                        data={propsData}
                        rounded
                        animate
                        reveal={reveal}
                        lineWidth={8}
                        lengthAngle={360}
                        label={({ dataEntry }) => getLabel(dataEntry)}
                        labelPosition={0}
                        labelStyle={{
                            fontSize: theme.spacing(2),
                            fill: theme.palette.text.primary
                        }}
                        background={theme.palette.chart.background}
                    />
                    :
                    <UICircularProgress />
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

