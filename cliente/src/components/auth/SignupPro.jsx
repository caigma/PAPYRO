import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignupPro.css';
import AuthService from '../service/AuthService';
import { Redirect } from 'react-router-dom';

class SignupPro extends Component {
	constructor(props) {
		super(props);
		this.state = { printerName: '', email: '', password: '', redirectLogin: false };
		this.service = new AuthService();
	}

	handlerSubmit = (event) => {
		event.preventDefault();
		const printer = {
			printerName: this.state.printerName,
			email: this.state.email,
			password: this.state.password
		};

		//aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
		this.service
			.signupPro(printer)
			.then((response) => {
				this.setState({
					printerName: '',
					email: '',
					password: '',
					redirectLogin: true
				});

				//aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
				//por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
				//y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
				this.props.getUser(response.user);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handlerChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
	};

	render() {
		if (this.state && this.state.redirectLogin) {
			return <Redirect to="/login" />;
		}

		return (
			<div className="container-signupPro">
				<div className="allform">
					<h2>Sign Up</h2>
					<form className="signup" onSubmit={this.handlerSubmit}>
						<label>Printer Name</label>
						<input
							id="printerName"
							type="text"
							name="printerName"
							onChange={(e) => this.handlerChange(e)}
						/>
						<label>Email</label>
						<input id="email" type="email" name="email" onChange={(e) => this.handlerChange(e)} />

						<label>Password</label>
						<input type="password" id="password" name="password" onChange={(e) => this.handlerChange(e)} />

						<input type="submit" value="Create the Account" />
					</form>
				</div>
				<p>
					Already have account?
					<Link to={'/login'}> Login</Link>
				</p>
			</div>
		);
	}
}

export default SignupPro;
