import React, { Component } from 'react';
// import api from './api';
import './EditProfile.css';
import AuthService from '../service/AuthService';
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.userInSession,
			username: this.props.userInSession.username,
			email: this.props.userInSession.email,
			NIF: this.props.userInSession.NIF,
			telephone: this.props.userInSession.telephone,
			street: this.props.userInSession.street,
			numStreet: this.props.userInSession.numStreet,
			floor: this.props.userInSession.floor,
			door: this.props.userInSession.door,
			postalCode: this.props.userInSession.postalCode,
			city: this.props.userInSession.city,
			country: this.props.userInSession.country,
			redirect: false
		};
		this.service = new AuthService();
	}

	handlerSubmit = (event) => {
		event.preventDefault();

		this.service
			.editprofile(
				this.state.username,
				this.state.email,
				this.state.NIF,
				this.state.telephone,
				this.state.street,
				this.state.numStreet,
				this.state.floor,
				this.state.door,
				this.state.postalCode,
				this.state.city,
				this.state.country,
				this.props.userInSession._id
			)
			.then((response) => {
				this.setState({
					redirect: true
				});
			})
			.catch((error) => {
				this.setState({
					username: this.state.loggedInUser.username,
					email: this.state.loggedInUser.email,
					error: true
				});
			});
	};

	handlerChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
		console.log('handlerchange', this.state);
	};

	refreshPage = () => {
		window.location.reload();
	};

	render() {
		if (this.state.redirect) {
			this.refreshPage();
			return <Redirect to={`/myprofile/${this.props.userInSession._id}`} />;
			// return <Redirect to="/allphotos" />;
		} else {
			return (
				<div className="container-editprofile">
					<h2>Edit Profile</h2>
					<form className="form-signup" onSubmit={this.handlerSubmit}>
						<div className="inputs">
							<label className="labeltexto">Username</label>
							<input
								defaultValue={this.props.userInSession.username}
								id="username"
								type="text"
								name="username"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">Email</label>
							<input
								defaultValue={this.props.userInSession.email}
								id="email"
								type="text"
								name="email"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">NIF/DNI</label>
							<input
								defaultValue={this.props.userInSession.NIF}
								id="NIF"
								type="text"
								name="NIF"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">Telephone</label>
							<input
								defaultValue={this.props.userInSession.telephone}
								id="telephone"
								type="text"
								name="telephone"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">Street</label>
							<input
								defaultValue={this.props.userInSession.street}
								id="street"
								type="text"
								name="street"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">St. Number</label>
							<input
								defaultValue={this.props.userInSession.numStreet}
								id="numStreet"
								type="text"
								name="numStreet"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">Floor</label>
							<input
								defaultValue={this.props.userInSession.floor}
								id="floor"
								type="text"
								name="floor"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>

						<div className="inputs">
							<label className="labeltexto">Door</label>
							<input
								defaultValue={this.props.userInSession.door}
								id="door"
								type="text"
								name="door"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">Postal Code</label>
							<input
								defaultValue={this.props.userInSession.postalCode}
								id="postalCode"
								type="text"
								name="postalCode"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">City</label>
							<input
								defaultValue={this.props.userInSession.city}
								id="city"
								type="text"
								name="city"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">Country</label>
							<input
								defaultValue={this.props.userInSession.country}
								id="country"
								type="text"
								name="country"
								required
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>

						<div className="inputs">
							<input type="submit" value="Update User" />
						</div>
					</form>
				</div>
			);
		}
	}
}

export default EditProfile;
