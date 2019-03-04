import React, { Component } from 'react';
import './AllPrinters.css';
import { Link } from 'react-router-dom';
import PrinterService from '../service/PrinterService';
import { NavLink } from 'react-router-dom';
import AuthService from '../service/AuthService';

class AllPrinters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			printers: []
		};

		this.PrinterService = new PrinterService();
		this.service = new AuthService();
		this.fetchUser();
		this.getOnlyPrinters();
		// this.filterAlbumUser();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, loggedInUser: nextProps['userInSession'] });
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

	getOnlyPrinters = () => {
		this.PrinterService
			.getUsersAndPrinters()
			.then((allusers) => {
				const onlyPrinters = allusers.filter((user) => {
					return user.role === 'printer';
				});
				this.setState({ ...this.state, printers: onlyPrinters });
			})
			.catch((err) => console.log(err));
	};

	filterAlbumUser = () => {
		const newState = { ...this.state };
		newState.albums = this.state.albums.filter((album) => {
			return album.owner === this.state.loggedInUser._id;
		});
		this.setState = newState;
	};

	render() {
		return (
			<div className="albums-list">
				<h3>Choose your Printer</h3>
				{this.state.printers.map((printer) => (
					<div className="each-album">
						<NavLink
							style={{ textDecoration: 'none', color: 'black', margin: 0 }}
							className="item-2"
							to={`/printers/${printer._id}`}
							key={printer._id}
						>
							<div className="eachAlbum">
								<div className="title">{printer.username}</div>
								<div className="description">{printer.email}</div>
								<div />
							</div>
						</NavLink>
					</div>
				))}
			</div>
		);
	}
}

export default AllPrinters;
