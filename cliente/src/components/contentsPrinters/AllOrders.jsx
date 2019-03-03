import React, { Component } from 'react';
import './AllOrders.css';
import { Link } from 'react-router-dom';

class AllOrders extends Component {
	render() {
		return (
			<div className="container-orders">
				<h2>Componente .AllOrders</h2>
				<h2>Aqui listamos con un MAP todos los pedidos de la imprenta loggeada</h2>
				<h2>y sacamos botón para ver detail-order</h2>

				<Link to="detail-order">Order Info</Link>
			</div>
		);
	}
}

export default AllOrders;
