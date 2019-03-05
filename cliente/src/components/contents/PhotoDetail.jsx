import React, { Component } from 'react';
import AlbumService from '../service/AlbumService';
// import { Redirect } from 'react-router-dom';
import './PhotoDetail.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
				newpublic: '',
				newtoPrint: '',
				newcontent: ''
			});
		});
	}

	handleOptionChange = (event) => {
		this.state.newcontent = event.target.value;
	};

	handleOptionChangePublic = (event) => {
		this.state.newpublic = event.target.checked;
	};

	handleOptionChangeToPrint = (event) => {
		this.state.newtoPrint = event.target.checked;
	};

	handlerSubmit = (event) => {
		event.preventDefault();
		if (this.state.newpublic === '') this.state.newpublic = this.state.photo.public;
		if (this.state.newtoPrint === '') this.state.newtoPrint = this.state.photo.toPrint;
		if (this.state.newcontent === '') this.state.newcontent = this.state.photo.content;

		this.AlbumService
			.udatePhoto(this.state.newpublic, this.state.newtoPrint, this.state.newcontent, this.state.photo._id)
			.then((response) => {
				console.log('en el front, el objeto cambiado', response);
			});
	};

	render() {
		return (
			<div className="container-ImgAndText">
				<div className="single-image">
					<img src={this.state.photo.imageUrl} alt="retrato" />
				</div>
				<form onSubmit={this.handlerSubmit}>
					<div className="checkedcontainer">
						<div className="blockcheckedcontainer">
							<label class="container">
								Public
								<input
									type="checkbox"
									name="public"
									defaultChecked={this.state.photo.public}
									onChange={(e) => this.handleOptionChangePublic(e)}
								/>
								<span class="checkmark" />
							</label>
							{/* <label class="container">
								Private
								<input
									type="radio"
									checked="checked"
									value="true"
									name="public"
									onChange={(e) => this.handleOptionChange(e)}
								/>
								<span class="checkmark" />
							</label> */}
						</div>
						<div className="blockcheckedcontainer">
							<label class="container">
								To Print
								<input
									type="checkbox"
									defaultChecked={this.state.photo.toPrint}
									name="toPrint"
									onChange={(e) => this.handleOptionChangeToPrint(e)}
								/>
								<span class="checkmark" />
							</label>
							{/* <label class="container">
								Not Print
								<input
									type="radio"
									checked="checked"
									value="false"
									name="toPrint"
									onChange={(e) => this.handleOptionChange(e)}
								/>
								<span class="checkmark" />
							</label> */}
						</div>
					</div>
					<div className="button-textarea">
						<textarea
							type="text"
							name="content"
							placeholde={this.state.photo.content}
							onChange={(e) => this.handleOptionChange(e)}
						/>
						<button type="submit">Save</button>
					</div>
				</form>
			</div>
		);
	}
}

export default PhotoDetail;
