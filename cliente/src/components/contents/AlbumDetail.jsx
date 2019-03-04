import React, { Component } from 'react';
import AlbumService from '../service/AlbumService';
import { Redirect } from 'react-router-dom';
import './AlbumDetail.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddPhoto from './AddPhoto';

class AlbumDetail extends Component {
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

	// ownershipCheck = (album) => {
	// 	if (this.props.loggedInUser && album.owner == this.props.loggedInUser._id) {
	// 		return (
	// 			<div>
	// 				<div>{this.renderEditForm()} </div>
	// 				<button onClick={() => this.deleteProject(this.state._id)}>Delete project</button>
	// 			</div>
	// 		);
	// 	}
	// };

	// this.props.match.params._id
	// const id = this.props.match.params.id

	async componentDidMount() {
		let data;

		data = await axios.get(`http://localhost:5000/album/${this.getAlbumId()}`);
		data = data.data;

		this.setState({ data: data });
	}

	render() {
		return (
			<div className="container-album-detail">
				<div>
					<h1>{this.state.data.title}</h1>
					<p>{this.state.data.description}</p>
				</div>

				<div className="all-photos-user">
					{this.state.photos.map((photo) => (
						<div className="imageAndText">
							<div className="image-album">
								<img src={photo.imageUrl} alt="alt" />
							</div>
							<div className="optionsImg">
								<form className="form-optionsImg" onSubmit={this.handleSubmit}>
									<select value={photo.public} onChange={this.handleChange}>
										<option value="true">Private</option>
										<option value="false">Public</option>
									</select>
									<select value={photo.toPrint} onChange={this.handleChange}>
										<option value="true">To Print</option>
										<option value="false">Not Print</option>
									</select>
									<input classNAme="submitOptionsImg" type="submit" value="Submit" />
								</form>
							</div>
						</div>
					))}
				</div>
				<div className="two-buttons">
					<Link className="pruebaLink" to={'/albums-list'}>
						Yours Albums
					</Link>
					<AddPhoto albumid={this.props.match.params.id} userInSession={this.state.loggedInUser} />
				</div>
			</div>
		);
	}
}

export default AlbumDetail;
