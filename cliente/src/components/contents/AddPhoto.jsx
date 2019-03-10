import React, { Component } from 'react';
// import AlbumService from '../service/AlbumService';
// import { Redirect } from 'react-router-dom';
import './AddPhoto.css';
import api from './api';
import { Redirect } from 'react-router-dom';
import AuthService from '../service/AuthService';

class AddPhoto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: this.props.userInSession,
			file: null,
			photos: [],
			redirect: false
		};
		this.service = new AuthService();
		this.fetchUser();
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

	handleChange(e) {
		this.setState({
			file: e.target.files[0]
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		// Reuse of the method "addPicture" from the file '../api'
		//todo: recuerda sacar el albumid del state o de donde lo tengas
		api.addPicture(this.state.file, this.props.albumid, this.state.loggedInUser._id).then((photoData) => {
			let newPhotos = [ ...this.state.photos ];
			newPhotos.push(photoData);

			this.setState({
				...this.state,
				photos: newPhotos,
				redirect: true
			});
		});
	}
	render() {
		if (this.state.loggedInUser === null) {
			return <h1>LOADING DATA</h1>;
		} else if (this.state.redirect) {
			return <Redirect to="/allphotos/" />;
		} else {
			return (
				<div className="addphoto">
					<form onSubmit={(e) => this.handleSubmit(e)}>
						<div className="upload-btn-wrapper">
							<input className="savephoto" type="file" onChange={(e) => this.handleChange(e)} /> <br />
							<button className="sendfile" type="submit">
								Save Photo
							</button>
						</div>
					</form>

					{this.state.photos.map((photo) => <img key={photo.url} src={photo.url} alt="" />)}
				</div>
			);
		}
	}
}

export default AddPhoto;
