import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import './Navbar.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { loggedInUser: null };
		this.service = new AuthService();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, loggedInUser: nextProps['userInSession'] });
	}

	handleLogout = (e) => {
		this.props.logout();
	};

	render() {
		if (this.state.loggedInUser) {
			return (
				<nav className="navbar">
					<ul>
						<li>{this.state.loggedInUser.username}</li>
						<li>
							<a onClick={this.handleLogout}>Logout</a>
						</li>
						<li>
							<Link to="/profile/:_id">Edit Profile</Link>
						</li>
					</ul>
				</nav>
			);
		} else {
			return (
				<div>
					<nav className="navbar">
						<ul>
							<li>
								<Link to="/signup/up">Signup</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					</nav>
				</div>
			);
		}
	}
}

export default Navbar;
