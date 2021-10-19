import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { DateRangeIcon } from '../../common/CustomIcons';

export class ProjectDatePicker extends Component {
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={this.props.w100}
                    variant="inline"
                    format="yyyy/MM/dd"
                    value={null}
                    color="primary"
                    onChange={this.handleDateChange}
                    inputVariant="filled"
                    label={this.props.label ? this.props.label : "날짜를 선택해주세요."}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDatePicker)
