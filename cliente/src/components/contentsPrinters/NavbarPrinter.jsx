import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import './NavbarPrinter.css';
import myimage from '../../image/logos/LOGO CON PRINT.png';

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
					<div>
						<img className="logo" src={myimage} alt="papyro" />
					</div>
					<div>
						<div onClick={this.handleLogout}>Close Session</div>
					</div>
					{/* <div>
						<Link className="links" to="/editprofile/:_id">
							{this.state.loggedInUser.username}'s Profile
						</Link>
					</div> */}
					<div>
						<Link className="links" to="/allorders">
							Home
						</Link>
					</div>
				</nav>
			);
		} else {
			return (
				<nav className="navbar">
					<div>
						<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/signup">
							Signup
						</Link>
					</div>
					<div>
						<Link style={{ textDecoration: 'none', color: 'black', margin: 0 }} to="/login">
							Login
						</Link>
					</div>
				</nav>
			);
		}
	}
}

export default NavbarPrinter;
