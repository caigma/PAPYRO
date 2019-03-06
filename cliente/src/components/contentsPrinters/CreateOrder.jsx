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
			code: new Date().getFullYear().toString() + '1'
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
					code: '',
					userId: '',
					printerId: '',
					photosToPrint: []
					// startDate: ''
				});
			});
	};

	render() {
		console.log('usuario', this.props.user.username);
		console.log('code', this.state.code);
		// console.log('startDate', this.state.startDate);
		console.log('printerId', this.props.match.params.id);
		console.log('photosToPrint', this.props.photosToPrint);

		return (
			<div>
				<div className="each-album">
					<div className="eachAlbum">
						<h2> Solicitud de Pedido </h2>
						<div className="description">Order Number: {this.state.code}</div>
						<div className="title">User: {this.props.user.username}</div>
						<div className="all-photos-user">
							{this.state.photosToPrint.map((photo, idx) => (
								<div className="image-album">
									<div className="imageAndText">
										<img src={photo.imageUrl} alt="alt" />
									</div>
								</div>
							))}
						</div>
						<button onClick={this.newOrder}>Send Order</button>
					</div>
				</div>
			</div>
		);
	}
}

export default createOrder;
