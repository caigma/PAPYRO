import React, { Component } from 'react';
import './AllPhotosUser.css';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';

class AllPhotosUser extends Component {
	render() {
		return (
			<div className="all-photos-user">
				<h2>Componente .AllPhotosUser</h2>
				<h2>Aqui se ponen todas las fotos del usuario</h2>
				<h2>Irán de fondo, ocupando toda la pantalla</h2>

				<SearchBar />
				<Link to="albums-list">My Albums</Link>
			</div>
		);
	}
}

export default AllPhotosUser;
