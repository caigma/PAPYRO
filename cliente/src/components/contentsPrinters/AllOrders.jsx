import React, { Component } from 'react';
import './AllOrders.css';
import { Link } from 'react-router-dom';

class AllOrders extends Component {
	render() {
		return (
			<div className="container-orders">
				<h2>Pedidos en curso</h2>
				<div>
					<ul>
						<li>Número 2019-5</li>
						<li>Número 2019-7</li>
						<li>Número 2019-12</li>
					</ul>
				</div>
				<h2>Pedidos terminados</h2>
				<div>
					<ul>
						<li>Número 2019-1</li>
						<li>Número 2019-2</li>
						<li>Número 2019-4</li>
					</ul>
				</div>

				<Link to="detail-order">Order Info</Link>
			</div>
		);
	}
}

export default AllOrders;
