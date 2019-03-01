import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
	state = {
		search: '',
		checkToPrint: false
	};

	filter = (e) => {
		const newState = { ...this.state };
		newState.search = e.target.value;
		this.setState(newState);
		this.props.filterAndCheck(newState.search, newState.checkToPrint);
	};

	clickHandler = () => {
		const newState = { ...this.state };
		newState.checkToPrint = !newState.checkToPrint;
		this.setState(newState);
		this.props.filterAndCheck(newState.search, newState.checkToPrint);
	};

	render() {
		return (
			<div className="search-bar">
				<input
					placeholder="Search hashtag"
					className="input-search"
					type="text"
					onChange={(e) => this.filter(e)}
				/>
				<div className="check">
					<input id="check" type="checkbox" onClick={this.clickHandler} />
					<label for="check">Photos to Print</label>
				</div>
			</div>
		);
	}
}

export default SearchBar;
