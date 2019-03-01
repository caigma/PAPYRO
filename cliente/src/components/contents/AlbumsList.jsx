import React, { Component } from 'react';
import './AlbumsList.css';
import { Link } from 'react-router-dom';

class AlbumsList extends Component {
	render() {
		return (
			<div className="albums-list">
				<h2>Componente .AlbumList</h2>
				<h2>Aqui listamos con un MAP todos los albumes del usuario</h2>
				<h2>y sacamos botón para ADD ALBUM</h2>

				<Link to="add-album">Add Album</Link>
			</div>
		);
	}
}

export default AlbumsList;
