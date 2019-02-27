import React, { Component } from 'react';
import './Home.css';

//clase componente que renderiza los contenidos genéricos
//usando rendering condicional y el componente Switch que ya conocéis podéis mostrar los contenidos oportunos que queráis
class Home extends Component {
	render() {
		return (
			<div class="home-user">
				<h3>Subir fotos</h3>
				<h3>Invitar a usuarios</h3>
				<div class="fotoprofile">Aquí va la foto de perfil</div>
			</div>
		);
	}
}

export default Home;
