import React, { Component } from 'react';
import './AllPrinters.css';
// import { Link } from 'react-router-dom';
import PrinterService from '../service/PrinterService';
import { NavLink } from 'react-router-dom';
import AuthService from '../service/AuthService';
import Maps from './Maps';

class AllPrinters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			printers: [],
			photosToPrint: this.props.photosfromfilter
		};

		this.PrinterService = new PrinterService();
		this.service = new AuthService();
		// this.fetchUser();
		this.getOnlyPrinters();
		// this.filterAlbumUser();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, loggedInUser: nextProps['userInSession'] });
	}

	// componentWillMount = () => {
	// 	console.log('WILLL');
	// 	if (this.props.location) {
	// 		this.setState({ ...this.state, photosToPrint: this.state.location }, () => {
	// 			console.log(this.props);
	// 		});
	// 	}
	// };
	// componentDidMount() {
	// 	const photos = this.props.location.state;
	// 	console.log(photos);
	// }

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

	// filterAlbumUser = () => {
	// 	const newState = { ...this.state };
	// 	newState.albums = this.state.albums.filter((album) => {
	// 		return album.owner === this.state.loggedInUser._id;
	// 	});
	// 	this.setState = newState;
	// };

	render() {
		console.log('en printers this.state.photosToPrint,', this.state.photosToPrint);
		console.log('en printers this.state.loggedinuser,', this.state.loggedInUser);
		return this.state.printers ? (
			<div className="printer-list">
				<h3>Choose your Printer</h3>
				{this.state.printers.map((printer, idx) => (
					<div className="each-album">
						<NavLink
							style={{ textDecoration: 'none', color: 'black', margin: 0 }}
							className="item-2"
							to={`/oneprinter/${printer._id}`}
							key={printer._id}
						>
							<div className="eachAlbum">
								<div className="title">
									<ul>
										{idx + 1}. Printer Name: {printer.username}
									</ul>
								</div>
								<div className="description">{printer.email}</div>
								<div />
							</div>
						</NavLink>
					</div>
				))}
				<Maps />
			</div>
		) : (
			<p>loading</p>
		);
	}
}

export default AllPrinters;
