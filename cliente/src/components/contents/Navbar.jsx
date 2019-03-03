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
		console.log('ESTOY EN NAVBAR PREGUNTANDO POR nextProps', nextProps);
		this.setState({
			...this.state,
			loggedInUser: nextProps['userInSession']
		});
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
							<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/editprofile/:_id">
								{this.state.loggedInUser.username}'s Profile
							</Link>
						</li>
						<li>
							<Link to="/albums-list" style={{ textDecoration: 'none' }}>
								MYALBUMS
							</Link>
						</li>

						<li>
							<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/allphotos">
								Home
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

export default Navbar;
