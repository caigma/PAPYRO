import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import AuthService from '../service/AuthService';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', role: '', redirect: false };
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
					role: response.role,
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
		if (this.state.redirect && this.state.role === 'user') {
			return <Redirect to="/allphotos" />;
		} else if (this.state.redirect && this.state.role === 'printer') {
			return <Redirect to="/allorders" />;
		}
		return (
			<div className="container-signup">
				<form className="form-signup" onSubmit={this.handlerSubmit}>
					<div>
						<div className="inputs">
							<label className="labeltexto">Email</label>
							<input
								id="email"
								type="text"
								name="email"
								required="required"
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>

						<div className="inputs">
							<label className="labeltexto">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								required="required"
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
					</div>
					<div className="inputs">
						<input type="submit" value="Log in" />
					</div>
				</form>
				<div className="signupquestion">
					<h1>{this.state.error ? 'Error' : ''}</h1>
					<p>
						Don't have account?
						<div className="container-links">
							<Link className="links" to={'/signup'}>
								{' '}
								Signup
							</Link>
						</div>
					</p>
				</div>
			</div>
		);
	}
}

export default Login;
