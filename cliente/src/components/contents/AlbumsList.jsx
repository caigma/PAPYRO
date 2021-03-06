import React, { Component } from 'react';
import './AlbumsList.css';
import { Link } from 'react-router-dom';
import AlbumService from '../service/AlbumService';
import { NavLink } from 'react-router-dom';
import AuthService from '../service/AuthService';
// import axios from 'axios';

class AlbumsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: this.props.userInSession,
			albums: []
		};

		this.AlbumService = new AlbumService();
		this.service = new AuthService();
		this.getUserAlbums();
	}

	getUserAlbums = () => {
		this.AlbumService
			.getAlbums(this.state.loggedinUser._id)
			.then((albums) => {
				this.setState({ ...this.state, albums: albums });
			})
			.catch((err) => console.log(err));
	};

	filterAlbumUser = () => {
		const newState = { ...this.state };
		newState.albums = this.state.albums.filter((album) => {
			return album.owner === this.state.loggedInUser._id;
		});
		this.setState = newState;
	};

	render() {
		return (
			<div className="albums-list">
				{this.state.albums.map((album) => (
					<div className="each-album">
						<NavLink
							style={{ textDecoration: 'none', color: 'black', margin: 0 }}
							className="item-2"
							to={`/albums-list/${album._id}`}
							key={album._id}
						>
							<div className="title">
								<h2>Title: {album.title}</h2>
							</div>
							<div className="description">
								<h3>Tags: {album.description}</h3>
							</div>
							<div>
								<p>Created at: {album.created_at}</p>
							</div>
						</NavLink>
					</div>
				))}
				<div className="addAlbum">
					<Link to="add-album">Add Album</Link>
				</div>
			</div>
		);
	}
}

export default AlbumsList;
