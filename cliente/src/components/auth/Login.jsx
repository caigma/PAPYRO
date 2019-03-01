import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import AuthService from '../service/AuthService';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', redirect: false };
		this.service = new AuthService();
	}

	handlerSubmit = (event) => {
		event.preventDefault();
		const email = this.state.email;
		const password = this.state.password;

		this.service
			.login(email, password)
			.then((response) => {
				this.setState({
					email: email,
					password: password,
					redirect: true,
					error: false
				});

				this.props.getUser(response);
			})
			.catch((error) => {
				this.setState({
					email: email,
					password: password,
					redirect: false,
					error: true
				});
			});
	};

	handlerChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/allphotos" />;
		}
		return (
			<div className="container-login">
				<h2>Login</h2>
				<form className="signup" onSubmit={this.handlerSubmit}>
					<label>Email</label>
					<input id="email" type="text" name="email" onChange={(e) => this.handlerChange(e)} />

					<label>Password</label>
					<input type="text" id="password" name="password" onChange={(e) => this.handlerChange(e)} />

					<input type="submit" value="Log in" />
				</form>
				<h1>{this.state.error ? 'Error' : ''}</h1>
				<p>
					Don't have account?
					<Link to={'/signup'}> Signup</Link>
				</p>
			</div>
		);
	}
}

export default Login;
