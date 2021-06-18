import React, { Component } from 'react'

export default class template extends Component {
    constructor(props) {
        super();
        this.state = {
            value: 0
        }
    }

    handleClick = () => {
        // bind 됨(애러우 펑션을 통해서) 그렇지 않으면 생성자로부터 바인드해주어야한다.
        // 혹은 태그에서, handler.bind(this);
        // 혹은 생성자(constructor)에서, this.handleClick = this.handleClick.bind(this);
        const { value } = this.state;

        this.setState({
            value: value + 1
        });
    }

    render() {
        return (
            <div>
                <p>this.state.value = {this.state.value}</p>
                <button onClick={this.handleClick}>plus</button>
            </div>
        )
    }
}