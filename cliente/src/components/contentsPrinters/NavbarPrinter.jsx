import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import './NavbarPrinter.css';

class NavbarPrinter extends Component {
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
						<li>
							<a onClick={this.handleLogout}>Close Session</a>
						</li>
						<li>
							<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/allorders">
								Home
							</Link>
						</li>
						<li>
							<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/editprofile/:_id">
								{this.state.loggedInUser.username}'s Profile
							</Link>
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
								<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/signup">
									Signup
								</Link>
							</li>
							<li>
								<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/login">
									Login
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			);
		}
	}
}

export default NavbarPrinter;
