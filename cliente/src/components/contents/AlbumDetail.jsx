import React, { Component } from 'react';
import AlbumService from '../service/AlbumService';
// import { Redirect } from 'react-router-dom';
import './AlbumDetail.css';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import AddPhoto from './AddPhoto';
import { NavLink } from 'react-router-dom';

class AlbumDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: this.props.userInSession,
			title: '',
			description: '',
			photos: [],
			data: '',
			owner: '',
			public: 'false',
			toPrint: 'false'
		};
		this.AlbumService = new AlbumService();
		this.getPhotos();
		// this.getOneAlbum();
	}

	getAlbumId() {
		return this.props.match.params.id;
	}

	getPhotos() {
		this.AlbumService.getPhotosAlbumId(this.props.match.params.id).then((photosalbum) => {
			let newPhotos = photosalbum;

			this.setState({
				...this.state,
				photos: newPhotos
			});
		});
	}

	async componentDidMount() {
		let data;

		data = await axios.get(`http://localhost:5000/album/${this.props.match.params.id}`);
		data = data.data;

		this.setState({ data: data });
	}

	render() {
		return (
			<div className="container-album-detail">
				<div className="albumtitleanddescription">
					<div className="titlealbum">
						<h2>Album's Title: {this.state.data.title}</h2>
					</div>
					<div className="descriptionalbum">
						<p>Tags: {this.state.data.description}</p>
					</div>
				</div>

				<div className="container-album">
					{this.state.photos.map((photo, idx) => (
						<NavLink
							style={{ textDecoration: 'none', color: 'black', margin: 0 }}
							className="photo-detail"
							to={`/photoDetail/${photo._id}`}
							key={photo._id}
						>
							<div className="container-image">
								<img src={photo.imageUrl} alt="alt" className="imagesalbum" />
							</div>
						</NavLink>
					))}
				</div>

				<div className="two-buttons">
					{/* <div className="divlinkmyalbums">
						<Link style={{ textDecoration: 'none' }} className="linkmyalbums" to={'/albums-list'}>
							Yours Albums
						</Link>
					</div> */}

					<AddPhoto albumid={this.props.match.params.id} userInSession={this.state.loggedInUser} />
				</div>
			</div>
		);
	}
}

export default AlbumDetail;
