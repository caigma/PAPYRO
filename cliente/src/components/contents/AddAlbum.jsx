import React, { Component } from 'react';
import AlbumService from '../service/AlbumService';
import { Redirect } from 'react-router-dom';
import './AddAlbum.css';

class AddAlbum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			photos: [],
			owner: '',
			redirect: false
		};
		this.AlbumService = new AlbumService();
	}

	// addAlbum = (newAlbum) => {
	// 	this.AlbumService.addAlbum().then();
	// 	let newState = {
	// 		...this.state
	// 	};

	// 	this.setState(newAlbum);
	// };

	handlerChange = (e) => {
		let inputName = e.target.name;
		let inputValue = e.target.value;
		this.setState({ ...this.state, [inputName]: inputValue });
	};

	handlerSubmit = (e) => {
		e.preventDefault();
		const title = this.state.title;

		const description = this.state.description;

		this.AlbumService.addAlbum(title, description).then((response) => {
			this.setState({
				...this.state,
				title: '',
				description: '',
				redirect: true
			});
		});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/albums-list" />;
		} else {
			return (
				<div className="container-addAlbum">
					<form className="form-addAlbum" onSubmit={this.handlerSubmit}>
						<input
							type="text"
							placeholder="Album's Title"
							name="title"
							onChange={(e) => this.handlerChange(e)}
						/>
						<input
							type="text"
							placeholder="Description"
							name="description"
							onChange={(e) => this.handlerChange(e)}
						/>

						<input type="submit" value="Add Album" />
						{this.state.redirect ? <Redirect to="/albums-list" /> : ''}
					</form>
				</div>
			);
		}
	}
}

export default AddAlbum;
