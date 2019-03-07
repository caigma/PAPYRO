import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import AuthService from '../service/AuthService';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = { role: '', username: '', email: '', password: '', redirect: false };
		this.service = new AuthService();
	}

	// redirect = () => {};

	handlerSubmit = (event) => {
		event.preventDefault();

		const role = this.state.role;
		const username = this.state.username;
		const email = this.state.email;
		const password = this.state.password;

		//aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
		this.service
			.signup(role, username, email, password)
			.then((response) => {
				this.setState(
					{
						role: '',
						username: '',
						email: '',
						password: '',
						redirect: true
					}
					// () => {
					// 	this.redirect();
					// }
				);

				//aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
				//por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
				//y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
				this.props.getUser(response.user);
			})
			.catch((error) => {
				this.setState({
					role: role,
					username: username,
					email: email,
					password: password,
					error: true
				});
			});
	};

	handlerChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
	};

	render() {
		if (this.state && this.state.redirect) {
			return <Redirect to="/login" />;
		}

		return (
			<div className="container-signup">
				<form className="form-signup" onSubmit={this.handlerSubmit}>
					<div className="input-radio">
						<div className="inputs">
							<label className="labeltexto">Professional Printer</label>
							<input
								type="radio"
								name="role"
								value="printer"
								required="required"
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
						<div className="inputs">
							<label className="labeltexto">User</label>
							<input
								type="radio"
								name="role"
								value="user"
								required="required"
								onChange={(e) => this.handlerChange(e)}
							/>
						</div>
					</div>
					<div className="inputs">
						<label className="labeltexto">Username</label>
						<input
							id="username"
							type="text"
							name="username"
							required="required"
							onChange={(e) => this.handlerChange(e)}
						/>
					</div>
					<div className="inputs">
						<label className="labeltexto">Email</label>
						<input
							id="email"
							type="email"
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
					<div className="inputs">
						<input type="submit" value="Create the Account" />
					</div>
				</form>

				<div className="signupquestion">
					<p>
						Already have account?
						<div className="container-links">
							<Link className="links" to={'/login'}>
								{' '}
								Login
							</Link>
						</div>
					</p>
				</div>
			</div>
		);
	}
}

export default Signup;
