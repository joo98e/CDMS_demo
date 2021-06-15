import React, { Component } from 'react'
import Value from './Value';
import Control from './Control';
import { connect } from 'react-redux';


import * as actions from '../actions'

export class Counter extends Component {
    

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Value number={this.props.number} />
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                />
            </div>
        )
    }
}

// state는 파라미터 이름 자체만 state, this.state와는 다르다.
const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    }
}

const mapDispatchToProps = (dispatch) => {

    // 참조해보기
    // import { bindActionCreators } from 'redux';
    // return bindActionCreators(actions, dispatch);

    return {
        handleIncrement: () => { dispatch(actions.numIncrement()) },
        handleDecrement: () => { dispatch(actions.numDecrement()) },
        handleSetColor: (color) => { dispatch(actions.setColor(color)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);