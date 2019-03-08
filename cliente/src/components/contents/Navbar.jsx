import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthService from '../service/AuthService';
import './Navbar.css';
import myimage from '../../image/logos/LOGO CON PRINT.png';

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
						<img className="logo" src={myimage} alt="papyro" />
					</div>
					{/* <div>
						<Link className="links" to="/editprofile/:_id">
							{this.state.loggedInUser.username}'s Profile
						</Link>
					</div> */}

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

					<div>
						<Link className="links" to="/allphotos">
							<div onClick={this.handleLogout}>Close Session</div>
						</Link>
					</div>
				</nav>
			);
		} else {
			return (
				<nav className="navbar">
					<div>
						<img className="logo" src={myimage} alt="papyro" />
					</div>
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
