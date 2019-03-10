import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import './Navbar.css';
import logonavbar from '../../image/papiroImagen.png';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { loggedInUser: null };
		this.service = new AuthService();
	}

	componentWillReceiveProps(nextProps) {
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
					<div>
						<div onClick={this.handleLogout}>Close Session</div>
					</div>

					<div>
						<Link className="links" to="/editprofile/:_id">
							{this.state.loggedInUser.username}'s Profile
						</Link>
					</div>

					<div>
						<Link className="links" to="/albums-list">
							My Albums
						</Link>
					</div>
					<div>
						<Link className="links" to="/allphotos">
							Home
						</Link>
					</div>
				</nav>
			);
		} else {
			return (
				<nav className="navbar">
					<img className="logonavbar" src={logonavbar} alt="papyro" />

					<div>
						<Link className="links" to="/login">
							Login
						</Link>
					</div>
					<div>
						<Link className="links" to="/signup">
							Signup
						</Link>
					</div>
				</nav>
			);
		}
	}
}

export default Navbar;
