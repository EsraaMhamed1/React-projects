import React, { Component } from 'react';

export default class Counter extends Component {
	constructor(props) {
		super(props);

		this.state = { count: 5 };
		this.handelDecrement = this.handelDecrement.bind(this);
		this.handelIncrement = this.handelIncrement.bind(this);
	}

	handelDecrement() {
		this.setState((currState) => {
			return { count: currState.count - 1 };
		});
	}

	handelIncrement() {
		this.setState((currState) => {
			return { count: currState.count + 1 };
		});
	}
	render() {
		const date = new Date('june 2 1 2027');
		date.setDate(date.getDate() + this.state.count);
		return (
			<div>
				<button onClick={this.handelDecrement}>-</button>
				<span>
					{date.toString()} {this.state.count}
				</span>
				<button onClick={this.handelIncrement}>+</button>
			</div>
		);
	}
}
