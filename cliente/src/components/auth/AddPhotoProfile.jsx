import React, { Component } from 'react';
// import AlbumService from '../service/AlbumService';
// import { Redirect } from 'react-router-dom';

// import api from './api';
import { Redirect } from 'react-router-dom';
import AuthService from '../service/AuthService';

class AddPhotoProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageProfile: 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg',
			loggedinUser: this.props.userInSession,
			file: null,
			photo: '',
			redirect: false
		};
		this.service = new AuthService();
	}

	componentDidMount() {
		if (this.props.imageProfile !== undefined) {
			this.setState({ ...this.state, imageProfile: this.props.imageProfile });
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, imageProfile: nextProps['imageProfile'] });
	}

	handleFileUpload = (e) => {
		console.log('The file to be uploaded is: ', e.target.files[0]);

		const uploadData = new FormData();
		uploadData.append('imageProfile', e.target.files[0]);
		this.service
			.handleUpload(uploadData)
			.then((response) => {
				this.setState({ imageProfile: response.imageProfile });
				this.service.updatePhotoProfile({ imageProfile: response.imageProfile }).then((response) => {
					console.log('updatePhotoProfile', response.imageProfile);
				});
			})
			.catch((err) => {
				console.log('Error while uploading the file: ', err);
			});
	};

	// handleChange(e) {
	// 	this.setState({
	// 		file: e.target.files[0]
	// 	});
	// }
	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	// Reuse of the method "addPicture" from the file '../api'
	// 	//todo: recuerda sacar el albumid del state o de donde lo tengas
	// 	this.service.addPhotoProfile(this.state.file, this.props.userInSession._id).then((photoData) => {
	// 		let newPhoto = photoData;
	// 		this.setState({
	// 			...this.state,
	// 			photo: newPhoto,
	// 			redirect: true
	// 		});
	// 	});
	// }
	render() {
		return (
			<div className="photoprofile">
				<div className="photo">
					<form>
						<input className="button-file" type="file" onChange={(e) => this.handleFileUpload(e)} />
					</form>
					<div className="container-imageprofile">
						<img className="imageprofile" src={this.state.imageProfile} alt="user profile" />
					</div>
				</div>
			</div>
		);
	}
}

export default AddPhotoProfile;
