import React, { Component } from 'react';
// import api from './api';
import './EditProfile.css';
import AuthService from '../service/AuthService';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '', email: '' };
		this.service = new AuthService();
	}

	handlerSubmit = (event) => {
		event.preventDefault();

		const username = this.state.username;
		const email = this.state.email;

		this.service
			.editprofile(username, email)
			.then((response) => {
				this.setState({
					username: '',
					email: ''
				});
			})
			.catch((error) => {
				this.setState({
					username: username,
					email: email,
					error: true
				});
			});
	};

	handlerChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
	};

	render() {
		return (
			<div className="container-signup">
				<div className="allform">
					<h2>Edit Profile</h2>
					<form className="signup" onSubmit={this.handlerSubmit}>
						<label>Username</label>
						<input id="username" type="text" name="username" onChange={(e) => this.handlerChange(e)} />

						<label>Email</label>
						<input id="email" type="text" name="email" onChange={(e) => this.handlerChange(e)} />

						<label>Telephone</label>
						<input id="telephone" type="text" name="telephone" onChange={(e) => this.handlerChange(e)} />

						<label>Street</label>
						<input id="street" type="text" name="street" onChange={(e) => this.handlerChange(e)} />

						<label>Street number</label>
						<input id="numStreet" type="text" name="numStreet" onChange={(e) => this.handlerChange(e)} />

						<label>Floor</label>
						<input id="floor" type="text" name="floor" onChange={(e) => this.handlerChange(e)} />

						<label>Door</label>
						<input id="door" type="text" name="door" onChange={(e) => this.handlerChange(e)} />

						<label>Postal Code</label>
						<input id="postalCode" type="text" name="postalCode" onChange={(e) => this.handlerChange(e)} />

						<label>City</label>
						<input id="city" type="text" name="city" onChange={(e) => this.handlerChange(e)} />

						<label>Country</label>
						<input id="country" type="text" name="country" onChange={(e) => this.handlerChange(e)} />

						<input type="submit" value="Update User" />
					</form>
				</div>
			</div>
		);
	}
}

export default EditProfile;
