import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Value extends Component {
    static propTypes = {
        number: PropTypes.number
    }

    constructor(props){
        super(props);
        this.state = {
            number : -1
        }
    }

    componentDidMount() {
        
    }
    

    render() {
        return (
            <div>
                {this.props.number}
            </div>
        )
    }
}

export default Value;
