import React, { Component } from 'react';
// import api from './api';

import AuthService from '../service/AuthService';
import { Link } from 'react-router-dom';
import AddPhotoProfile from './AddPhotoProfile';
// import { Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.userInSession
		};
		this.service = new AuthService();
		// this.refreshPage();
	}
	refreshPage = () => {
		window.location.reload();
	};

	render() {
		return (
			<div className="container-editprofile">
				<h2>{this.state.loggedInUser.username}'s Profile</h2>
				<div className="container-links">
					<AddPhotoProfile imageProfile={this.props.userInSession.imageProfile} />
					<div className="myprofile">
						<ul>
							Contact Info:
							<li>Username: {this.props.userInSession.username}</li>
							<li>Email: {this.props.userInSession.email}</li>
							<li>NIF: {this.props.userInSession.NIF}</li>
							<li>Telephone: {this.props.userInSession.telephone}</li>
						</ul>
						<ul>
							Address Info:
							<li>Street and Number: {this.props.userInSession.streetAndNumber}</li>
							<li>Floor: {this.props.userInSession.floor}</li>
							<li>Door: {this.props.userInSession.door}</li>
							<li>Postal Code: {this.props.userInSession.postalCode}</li>
							<li>City: {this.props.userInSession.city}</li>
							<li>Country: {this.props.userInSession.country}</li>
						</ul>
						<Link className="links" to={`/editprofile/${this.state.loggedInUser._id}`}>
							Edit Profile
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default MyProfile;
