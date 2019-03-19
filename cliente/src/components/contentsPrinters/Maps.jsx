import React from 'react';
// import { Link } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

const MapWithAMarker = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			defaultZoom={12}
			defaultCenter={{
				lat: props.posicion.loggedInUser.coordinates.coords.lat,
				lng: props.posicion.loggedInUser.coordinates.coords.lng
			}}
		>
			<MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
				{props.filter.map((marker) => (
					<Marker
						key={marker.username}
						position={{
							lat: marker.coordinates.coords.lat,
							lng: marker.coordinates.coords.lng
						}}
						onClick={() => {
							props.handleMarkerClick({ company: marker.username });
						}}
					>
						{props.openInfoWindows[marker.username] && (
							<InfoWindow onCloseClick={() => props.handleCloseInfoWindow({ company: marker.username })}>
								<div>
									<div>{marker.username}</div>
									<div>{marker.streetAndNumber}</div>
								</div>
							</InfoWindow>
						)}
					</Marker>
				))}
			</MarkerClusterer>
			<Marker
				position={{
					lat: props.posicion.loggedInUser.coordinates.coords.lat,
					lng: props.posicion.loggedInUser.coordinates.coords.lng
				}}
				onClick={() => props.handleMarkerClick({ a: true })}
			>
				<InfoWindow onCloseClick={props.onToggleOpen}>
					<div>
						<h5>Tu estás aquí</h5>
					</div>
				</InfoWindow>
			</Marker>
		</GoogleMap>
	))
);

export default class Maps extends React.Component {
	state = {
		isMarkerShown: false,
		loggedInUser: false,
		allPrintersMap: null,
		openInfoWindows: undefined
	};

	componentWillReceiveProps(nextProps) {
		// const API_KEY = process.env.GOOGLEMAP_API_KEY; const script = document.createElement('script');
		// script.src = https://maps.googleapis.com/maps/api/js?key=${API_KEY};
		// document.head.append(script);

		let openInfoWindowsObj = {};

		for (var key in nextProps['allPrinters']) {
			openInfoWindowsObj[nextProps['allPrinters'][key].empresa] = false;
		}

		this.setState({
			...this.state,
			loggedInUser: nextProps['userInSession'],
			allPrintersMap: nextProps['allPrinters'],
			openInfoWindows: openInfoWindowsObj
		});
	}

	handleMarkerClick = (e) => {
		var openInfoWindowsCloned = { ...this.state.openInfoWindows };

		openInfoWindowsCloned[e.company] = true;

		this.setState({
			...this.state,
			isMarkerShown: false,
			openInfoWindows: openInfoWindowsCloned
		});
	};

	handleCloseInfoWindow = (e) => {
		var openInfoWindowsCloned = { ...this.state.openInfoWindows };

		openInfoWindowsCloned[e.company] = false;

		this.setState({
			...this.state,
			isMarkerShown: false,
			openInfoWindows: openInfoWindowsCloned
		});
	};

	render() {
		return this.state.loggedInUser ? (
			<div>
				<MapWithAMarker
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzW2O8kun6MFHbsvAL0nc7lOdmLw924LQ&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `400px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					openInfoWindows={this.state.openInfoWindows}
					handleCloseInfoWindow={this.handleCloseInfoWindow}
					posicion={this.state}
					filter={this.state.allPrintersMap}
					handleMarkerClick={this.handleMarkerClick}
				/>
			</div>
		) : (
			<p>No estás logueado</p>
		);
	}
}
