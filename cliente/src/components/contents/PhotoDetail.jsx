import React, { Component } from 'react';
import AlbumService from '../service/AlbumService';
// import { Redirect } from 'react-router-dom';
import './PhotoDetail.css';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class PhotoDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedinUser: null,
			photo: {},
			redirect: false,
			public: '',
			toPrint: '',
			content: ''
		};

		this.AlbumService = new AlbumService();
		this.getThisPhoto();
		// this.getOneAlbum();
	}

	getThisPhoto() {
		this.AlbumService.getPhotoId(this.props.match.params.id).then((photo) => {
			this.setState({
				...this.state,
				photo: photo,
				public: '',
				toPrint: '',
				content: '',
				photoSave: ''
			});
		});
	}

	handleOptionChange = (event) => {
		this.state.content = event.target.value;
		this.setState({ ...this.state, content: this.state.content });
	};

	handleOptionChangePublic = (event) => {
		this.state.public = event.target.checked;

		this.setState({ ...this.state, public: this.state.public });
	};

	handleOptionChangeToPrint = (event) => {
		this.state.toPrint = event.target.checked;
		this.setState({ ...this.state, toPrint: this.state.toPrint });
	};

	handlerSubmit = (event) => {
		event.preventDefault();
		if (this.state.public === '') {
			this.state.public = this.state.photo.public;
		}
		if (this.state.toPrint === '') {
			this.state.toPrint = this.state.photo.toPrint;
		}
		if (this.state.content === '') {
			this.state.content = this.state.photo.content;
		}

		this.AlbumService
			.udatePhoto(this.state.public, this.state.toPrint, this.state.content, this.state.photo._id)
			.then((response) => {
				this.setState({
					...this.state,
					public: '',
					toPrint: '',
					content: '',
					redirect: true
				});
			});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/allphotos" />;
		}
		return (
			<div className="container-ImgAndText">
				<div className="single-image">
					<img src={this.state.photo.imageUrl} alt="retrato" />
				</div>
				<form className="formchangephoto" onSubmit={this.handlerSubmit}>
					<div className="checkedcontainer">
						<div className="blockcheckedcontainer">
							<label class="containercheckbox">
								Public
								<input
									type="checkbox"
									name="public"
									defaultChecked={this.state.photo.public}
									onChange={(e) => this.handleOptionChangePublic(e)}
								/>
								<span class="checkmark" />
							</label>
						</div>
						<div className="blockcheckedcontainer">
							<label class="containercheckbox">
								To Print
								<input
									type="checkbox"
									defaultChecked={this.state.photo.toPrint}
									name="toPrint"
									onChange={(e) => this.handleOptionChangeToPrint(e)}
								/>
								<span class="checkmark" />
							</label>
						</div>
					</div>
					<div className="button-textarea">
						<textarea
							type="text"
							name="content"
							placeholder={this.state.photo.content}
							onChange={(e) => this.handleOptionChange(e)}
						/>
						<button className="savephoto" type="submit">
							Save
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default PhotoDetail;
