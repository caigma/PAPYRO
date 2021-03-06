import React, { Component } from 'react';
import './AllPhotosUser.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
// import myimage from '../../image/IMG_5208.JPG';
import AlbumService from '../service/AlbumService';
import AuthService from '../service/AuthService';
import OrderService from '../service/OrderService';
// import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class AllPhotosUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: this.props.userInSession,
			photos: [],
			photosToPrint: [],
			redirect: false
		};
		this.AlbumService = new AlbumService();
		this.service = new AuthService();
		this.OrderService = new OrderService();
		this.getPhotosUser();
	}

	getPhotosUser() {
		this.AlbumService.getAllPhotosUser(this.props.userInSession._id).then((allphotos) => {
			allphotos.map((photo) => {
				if (photo.content === null || photo.content === undefined) {
					photo.content = '';
				}
			});
			let newPhotos = allphotos;
			this.setState({
				...this.state,
				photos: newPhotos
			});
		});
	}

	filterPhoto = (search, toPrint) => {
		if ((search === '' || search === undefined || search === null) && toPrint === false) {
			this.getPhotosUser();
		}

		const newState = { ...this.state };

		newState.photos = newState.photos.filter((photo) => {
			if (toPrint === false) {
				return photo.content.indexOf(search) === 0;
			} else {
				return photo.toPrint === true && photo.content.indexOf(search) === 0;
			}
		});

		this.setState(newState);

		this.catchPhotosPrint = () => {
			const newState = { ...this.state, redirect: true };
			this.props.photoPrint(this.state.photos);
			this.setState(newState);
			return;
		};
	};

	render() {
		return (
			<div>
				<div className="container-album">
					{this.state.photos.map((photo, idx) => (
						<div className="container-image">
							<Link to={`/photoDetail/${photo._id}`} key={photo._id}>
								<img src={photo.imageUrl} alt="alt" className="imagesalbum" />
							</Link>
						</div>
					))}
				</div>

				<div className="bottom-album">
					<div className="two-buttons2">
						<div>
							<button className="button-send">
								<Link className="links" to="albums-list">
									My Albums
								</Link>
							</button>
						</div>

						<div className="myalbumslink">
							<button className="button-send" onClick={this.catchPhotosPrint}>
								Send to Print
							</button>
							{this.state.redirect ? <Redirect to="/printers" /> : ''}
						</div>

						{/* <Link className="pruebaLink" style={{ textDecoration: 'none' }} to="printers">
							Send to Print
						</Link> */}
					</div>

					<SearchBar filterAndCheck={this.filterPhoto} />
				</div>
			</div>
		);
	}
}

export default AllPhotosUser;
