import React, { Component } from 'react';
import './CreateOrder.css';
// import { Link } from 'react-router-dom';
import OrderService from '../service/OrderService';
// import { NavLink } from 'react-router-dom';
// import AuthService from '../service/AuthService';
// import Maps from './Maps';

class createOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photosToPrint: this.props.photosToPrint,
			userId: this.props.user,
			printerId: this.props.match.params.id,
			code: new Date().getFullYear().toString() + '1',
			redirect: false,
			mensaje: 'Orden enviada'
		};
		this.OrderService = new OrderService();
		// this.newOrder();
	}

	newOrder = () => {
		let code = new Date().getFullYear().toString() + '1';

		// const userId = this.state.userId;
		// const printerId = this.state.printerId;
		// const photosToPrint = this.state.photosToPrint;
		// let startDate = new Date();

		let newState = { ...this.state, code: code };
		this.setState(newState);
		this.OrderService
			.newOrder(
				this.state.code,
				this.props.user.username,
				this.props.match.params.id,
				this.props.photosToPrint
				// this.state.startDate
			)
			.then((response) => {
				this.setState({
					...this.state,
					userId: '',
					printerId: '',
					photosToPrint: [],
					redirect: true
					// startDate: ''
				});
			});
	};

	render() {
		if (this.state.redirect == true) {
			return (
				<div className="pedidorealizo">
					<h2>Pedido Realizado</h2>
					<h3>Order Number: {this.state.code}</h3>
					<h3>User: {this.props.user.username}</h3>
					<h3>Printer: {this.props.match.params.id}</h3>
					<div className="container-album">
						{this.props.photosToPrint.map((photo, idx) => (
							<div className="container-image">
								<img src={photo.imageUrl} alt="alt" className="image" />
							</div>
						))}
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="each-album">
						<div className="eachAlbum">
							<div className="ordercursada">
								<h2> Solicitud de Pedido </h2>
							</div>
							<div className="numberorder">
								<h3> Order Number: {this.state.code} </h3>
							</div>
							<div className="userorder">
								<h3> User: {this.props.user.username} </h3>
							</div>

							<div className="container-album">
								{this.state.photosToPrint.map((photo, idx) => (
									<div className="container-image">
										<img src={photo.imageUrl} alt="alt" className="image" />
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="blockfixed">
						<button className="sendpedido" onClick={this.newOrder}>
							Send Order
						</button>
					</div>
				</div>
			);
		}
	}
}

export default createOrder;
