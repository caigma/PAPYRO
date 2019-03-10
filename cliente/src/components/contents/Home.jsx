import React, { Component } from 'react';
import './Home.css';
import imagelogo from '../../image/papiroImagen.png';
import { NavLink } from 'react-router-dom';

//clase componente que renderiza los contenidos genéricos
//usando rendering condicional y el componente Switch que ya conocéis podéis mostrar los contenidos oportunos que queráis
class Home extends Component {
	render() {
		return (
			<div className="home-user">
				<div className="bodyphoto">
					<NavLink className="linkshome" to={'/login'}>
						<img src={imagelogo} alt="papyro" />
						<div className="logotexto">
							<h1>PAPYRO</h1>
							<p>Print your life</p>
						</div>
					</NavLink>
				</div>
			</div>
		);
	}
}

export default Home;
