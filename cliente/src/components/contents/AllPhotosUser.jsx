import React, { Component } from 'react';
import './AllPhotosUser.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import myimage from '../../image/IMG_5208.JPG';

class AllPhotosUser extends Component {
	render() {
		return (
			<div>
				<div className="all-photos-user">
					<div className="image-album">
						<img src={myimage} alt="logo" />
					</div>

					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
					<div className="image-album" />
				</div>
				<div className="fixed-search">
					<div className="two-buttons">
						<Link className="pruebaLink" style={{ textDecoration: 'none' }} to="albums-list">
							My Albums
						</Link>
						<Link className="pruebaLink" style={{ textDecoration: 'none' }} to="printers">
							Send to Print
						</Link>
					</div>

					<SearchBar />
				</div>
			</div>
		);
	}
}

export default AllPhotosUser;
