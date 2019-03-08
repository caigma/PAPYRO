import React, { Component } from 'react';
import './Home.css';
import myimage from '../../image/dsc_0048.jpg';

//clase componente que renderiza los contenidos genéricos
//usando rendering condicional y el componente Switch que ya conocéis podéis mostrar los contenidos oportunos que queráis
class Home extends Component {
	render() {
		return (
			<div className="home-user">
				<h3>Subir fotos</h3>
				{/* <div className="imagehome">
					<img src={myimage} alt="papyro" />
				</div> */}
				<h3>Invitar a usuarios</h3>
			</div>
		);
	}
}

export default Home;
