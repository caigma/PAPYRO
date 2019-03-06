import React, { Component } from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/service/AuthService';
// import Home from './components/contents/Home';
import Navbar from './components/contents/Navbar';
import NavbarPrinter from './components/contentsPrinters/NavbarPrinter';
import AllPhotosUser from './components/contents/AllPhotosUser';
import EditProfile from './components/auth/EditProfile.jsx';
import AlbumsList from './components/contents/AlbumsList';
import AddAlbum from './components/contents/AddAlbum';
import AllOrders from './components/contentsPrinters/AllOrders';
import AlbumDetail from './components/contents/AlbumDetail';
import AllPrinters from './components/contentsPrinters/AllPrinters';
import PhotoDetail from './components/contents/PhotoDetail';

//App es la aplicación base, que se sirve del servicio AuthService para conectar con la bbdd
class App extends Component {
	//en el tiempo de construcción de la aplicación, creamos una instancia del authservice
	constructor(props) {
		super(props);
		//arrancamos el estado con un valor de loggedInUser con nada (luego lo vamos a reemplazar con el valor real)
		this.state = { loggedInUser: null, user: false, photosToPrint: [] };
		this.service = new AuthService();
	}

	// CUANDO ALGUIEN HAGA LOGIN, SE LLAMA A GETUSER Y SE VUELCA LA INFO DEL USUARIO EN App.js
	getUser = (userObj) => {
		this.setState({
			loggedInUser: userObj
		});
	};

	logout = () => {
		this.service.logout().then(() => {
			this.setState({ loggedInUser: null });
		});
	};

	//este método vuelca la información del usuario y lo guarda en el state de app que siempre puedes revisitar
	fetchUser() {
		if (this.state.loggedInUser === null) {
			//utilizamos el método loggedin para cualquier momento que deseemos obtener la información del usuario quede guardada en el state de app
			this.service
				.loggedin()
				.then((response) => {
					this.setState({
						loggedInUser: response
					});
				})
				.catch((err) => {
					this.setState({
						loggedInUser: false
					});
				});
		}
	}

	generateOrder = (photos) => {
		const newState = { ...this.state, photosToPrint: photos };
		this.setState(newState);
	};

	render() {
		this.fetchUser();
		console.log('ESTOY EN APP', this.state.photosToPrint);

		if (this.state.loggedInUser) {
			if (this.state.loggedInUser.role === 'user') {
				return (
					<div className="padre">
						<header className="container-navbar">
							<Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
						</header>

						<Switch>
							{/* <Home userInSession={this.state.loggedInUser} /> */}
							{/* <Route exact path="/allphotos" component={AllPhotosUser} /> */}
							<Route
								exact
								path="/allphotos"
								render={() => (
									<AllPhotosUser
										photoPrint={this.generateOrder}
										userInSession={this.state.loggedInUser}
									/>
								)}
							/>

							{/* <Route exact path="/editprofile/:id" component={EditProfile} /> */}

							<Route
								exact
								path="/editprofile/"
								render={() => <EditProfile userInSession={this.state.loggedInUser} />}
							/>

							{/* <Route exact path="/albums-list" component={AlbumsList} /> */}
							<Route
								exact
								path="/albums-list"
								render={() => <AlbumsList userInSession={this.state.loggedInUser} />}
							/>
							<Route exact path="/albums-list/:id" component={AlbumDetail} />
							<Route exact path="/photoDetail/:id" component={PhotoDetail} />

							<Route exact path="/add-album" component={AddAlbum} />
							<Route
								exact
								path="/printers"
								render={() => <AllPrinters newOrder={this.state.photosToPrint} />}
							/>

							{/* <Route exact path="/printers" component={AllPrinters} /> */}
						</Switch>
					</div>
				);
			} else if (this.state.loggedInUser.role === 'printer') {
				return (
					<div className="padre">
						<header className="header">
							<NavbarPrinter userInSession={this.state.loggedInUser} logout={this.logout} />
						</header>

						<Switch>
							{/* <Home userInSession={this.state.loggedInUser} /> */}
							<Route exact path="/allorders" component={AllOrders} />
						</Switch>
					</div>
				);
			}
		} else {
			//si no estás logeado, mostrar opcionalmente o login o signup
			return (
				<div className="padre">
					<header className="container-navbar">
						<Navbar userInSession={this.state.loggedInUser} logout={this.logout} />

						<Switch>
							<Route exact path="/signup" render={() => <Signup getUser={this.getUser} />} />
							<Route exact path="/login" render={() => <Login getUser={this.getUser} />} />
						</Switch>
					</header>
				</div>
			);
		}
	}
}

export default App;
