import React, { Component } from 'react';
import AlbumService from '../service/AlbumService';
import { Redirect } from 'react-router-dom';
import './AlbumDetail.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AlbumDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			photos: [],
			owner: ''
		};
		this.AlbumService = new AlbumService();
		// this.getOneAlbum();
	}

	getAlbumId() {
		return this.props.match.params.id;
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

		this.setState(data);
	}

	// getOneAlbum = () => {
	// 	this.AlbumService
	// 		.getSingleAlbum()
	// 		.then((albums) => {
	// 			console.log('HEEEEEEEEEY', albums);
	// 			this.setState({ ...this.state, albums: albums });
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	render() {
		return (
			<div className="container-album-detail">
				<h2>HOLA ESTOY EN DETAIL ALBUM</h2>
				<h1>{this.state.title}</h1>
				<p>{this.state.description}</p>
				{/* <div>{this.ownershipCheck(this.state)}</div> */}
				<Link to={'/albums-list'}>Yours Albums</Link>
			</div>
		);
	}
}

export default AlbumDetail;
