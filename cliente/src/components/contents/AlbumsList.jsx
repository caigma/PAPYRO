import React, { Component } from 'react';
import './AlbumsList.css';
import { Link } from 'react-router-dom';
import AlbumService from '../service/AlbumService';
import { NavLink } from 'react-router-dom';
import AuthService from '../service/AuthService';
import axios from 'axios';

class AlbumsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: null,
			albums: []
		};

		this.AlbumService = new AlbumService();
		this.service = new AuthService();
		this.fetchUser();
		this.getUserAlbums();
		// this.filterAlbumUser();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, loggedInUser: nextProps['userInSession'] });
	}

	fetchUser() {
		this.service
			.loggedin()
			.then((response) => {
				this.setState({
					...this.state,
					loggedInUser: response
				});
			})
			.catch((err) => {
				this.setState({
					loggedInUser: false
				});
			});
	}
	// componentWillUnmount() {
	// 	this.fetchUser();
	// }
	// getUser = (userObj) => {
	// 	this.setState({
	// 		loggedInUser: userObj
	// 	});
	// };

	getUserAlbums = () => {
		this.AlbumService
			.getAlbums()
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
							<div className="eachAlbum">
								<div className="title">{album.title}</div>
								<div className="description">{album.description}</div>
								<div>
									<p>Created at: {album.created_at}</p>
								</div>
							</div>
						</NavLink>
					</div>
				))}

				<Link to="add-album">Add Album</Link>
			</div>
		);
	}
}

export default AlbumsList;
