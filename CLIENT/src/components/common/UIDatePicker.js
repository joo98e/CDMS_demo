/**
 * @param       class 필수
 * @param       name 필수
 * @param       label 필수
 * @param       resultAction 필수
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'date-fns';
import koLocale from "date-fns/locale/ko"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { 
    DateRangeIcon,
    KeyboardArrowLeftIcon,
    KeyboardArrowRightIcon
 } from './CustomIcons';

export class UIDatePicker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedDate: null
        }
    }
    componentDidMount() {
        console.log(this.props.name);
    }
    

    handleDateChange = value => {
        try {
            this.setState({
                selectedDate: value
            });

            if (this.props.resultAction) {
                this.props.resultAction(value, this.props.name);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
                <KeyboardDatePicker
                    className={this.props.class ? this.props.class : ""}
                    variant="dialog"
                    format="yyyy/MM/dd"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    inputVariant="filled"
                    label={this.props.label ? this.props.label : "날짜를 선택해주세요."}
                    invalidDateMessage="잘못된 날짜 형식이에요!"
                    invalidLabel="잘못된 날짜 형식이에요!"
                    maxDateMessage="너무 먼 훗날인걸요...?"
                    clearable
                    animateYearScrolling
                    keyboardIcon={<DateRangeIcon />}
                    leftArrowIcon={<KeyboardArrowLeftIcon />}
                    rightArrowIcon={<KeyboardArrowRightIcon />}
                />
            </MuiPickersUtilsProvider>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UIDatePicker)
