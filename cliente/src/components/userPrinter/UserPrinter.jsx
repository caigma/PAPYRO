import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserPrinter.css';
import AuthService from '../service/AuthService';
// import { Redirect } from 'react-router-dom';

class UserPrinter extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '', email: '', password: '', redirectLogin: false };
		this.service = new AuthService();
	}

	render() {
		return (
			<div className="printerUser">
				<Link to={'/signup/pr'}> Are you a Professional Printer?</Link>
				<p>o</p>
				<Link to={'/signup/us'}> User?</Link>
			</div>
		);
	}
}

export default UserPrinter;
