/**
 * @param       textFieldStyle 필수
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
import { DateRangeIcon } from '../../common/CustomIcons';

export class UIDatePicker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedDate: new Date()
        }
    }

    handleDateChange = value => {
        try {
            this.setState({
                selectedDate: value
            });

            this.props.resultAction(value, this.props.name);

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
                <KeyboardDatePicker
                    className={this.props.textFieldStyle}
                    variant="inline"
                    format="yyyy/MM/dd"
                    value={this.state.selectedDate}
                    color="primary"
                    onChange={this.handleDateChange}
                    inputVariant="outlined"
                    invalidDateMessage="잘못된 날짜 형식이에요!"
                    invalidLabel="잘못된 날짜 형식이에요!"
                    keyboardIcon={<DateRangeIcon />}
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
