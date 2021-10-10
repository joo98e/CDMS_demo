import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
                    variant="inline"
                    format="yyyy/MM/dd"
                    value={this.state.selectedDate}
                    color="primary"
                    onChange={this.handleDateChange}
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
