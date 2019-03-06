import React, { Component } from 'react';
import './AllPhotosUser.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import myimage from '../../image/IMG_5208.JPG';
import AlbumService from '../service/AlbumService';
import AuthService from '../service/AuthService';
import OrderService from '../service/OrderService';
import { NavLink } from 'react-router-dom';
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
				if (photo.content == null || photo.content == undefined) {
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
		if ((search === '' || search === undefined || search == null) && toPrint === false) {
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

		// let onlyURLandID = [];
		// let imagesToPrint = newState.photos;
		// onlyURLandID = imagesToPrint.map((element) => {
		// 	return { imageUrl: element.imageUrl, _id: element._id };
		// });

		this.setState(newState);

		// this.catchPhotosPrint = () => {
		// 	this.state.photosToPrint = this.state.photos;
		// 	const newState = { ...this.state, redirect: true };
		// 	this.setState(newState);
		// 	return this.props.photoPrint(newState.photosToPrint);
		// };

		// this.catchPhotosPrint();

		// 	newState.photosToPrint = newState.photos.map

		// 	this.OrderService.generateOrder(newState.photosToPrint.imageUrl)

		// }
	};

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
						{/* <Link className="pruebaLink" style={{ textDecoration: 'none' }} to="printers">
							Send to Print
						</Link> */}
						<button onClick={this.catchPhotosPrint}>Send to Print</button>
						{/* {this.state.redirect} ? <Redirect to="/printers" /> */}
						{/* : <Redirect to="/albums-list" /> */}
					</div>

					<SearchBar filterAndCheck={this.filterPhoto} />
				</div>
			</div>
		);
	}
}

export default AllPhotosUser;
