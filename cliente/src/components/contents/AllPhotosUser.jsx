import React, { Component } from 'react';
import './AllPhotosUser.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import myimage from '../../image/IMG_5208.JPG';
import AlbumService from '../service/AlbumService';
import AuthService from '../service/AuthService';
import { NavLink } from 'react-router-dom';

class AllPhotosUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: this.props.userInSession,
			title: '',
			description: '',
			photos: [],
			data: '',
			owner: ''
		};
		this.AlbumService = new AlbumService();
		this.service = new AuthService();
		this.getPhotosUser();
	}

	// fetchUser() {
	// 	if (this.state.loggedInUser === null) {
	// 		//utilizamos el método loggedin para cualquier momento que deseemos obtener la información del usuario quede guardada en el state de app
	// 		this.service
	// 			.loggedin()
	// 			.then((response) => {
	// 				this.setState({
	// 					...this.state,
	// 					loggedInUser: response
	// 				});
	// 			})
	// 			.catch((err) => {
	// 				this.setState({
	// 					loggedInUser: false
	// 				});
	// 			});
	// 	}
	// }

	getPhotosUser() {
		this.AlbumService.getAllPhotosUser(this.props.userInSession._id).then((allphotos) => {
			console.log('recibiendo las fotos del usuario', allphotos);
			let newPhotos = allphotos;
			this.setState({
				...this.state,
				photos: newPhotos
			});
		});
	}

	render() {
		return (
			<div>
				<div className="all-photos-user">
					{this.state.photos.map((photo, idx) => (
						<div className="image-album">
							<NavLink
								style={{ textDecoration: 'none', color: 'black', margin: 0 }}
								className="photo-detail"
								to={`/photoDetail/${photo._id}`}
								key={photo._id}
							>
								<div className="imageAndText">
									<img src={photo.imageUrl} alt="alt" />
								</div>
							</NavLink>
						</div>
					))}
				</div>
				<div className="fixed-search">
					<div className="two-buttons">
						<Link className="pruebaLink" style={{ textDecoration: 'none' }} to="albums-list">
							My Albums
						</Link>
						<Link className="pruebaLink" style={{ textDecoration: 'none' }} to="printers">
							Send to Print
						</Link>
					</div>

					<SearchBar />
				</div>
			</div>
		);
	}
}

export default AllPhotosUser;
