import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';

const MapWithAMarker = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: 40.392226, lng: -3.6998982 }}
			//PONER AQUÍ LA DIRECCIÓN DEL USUARIO
		>
			<Marker position={{ lat: 40.392226, lng: -3.6998982 }} />
		</GoogleMap>
	))
);

export default class Maps extends React.PureComponent {
	state = {
		isMarkerShown: false,
		loggedInUser: null
	};

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, loggedInUser: nextProps['userInSession'] });
	}

	componentDidMount() {
		this.delayedShowMarker();
	}

	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({ isMarkerShown: true });
		}, 3000);
	};

	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false });
		this.delayedShowMarker();
	};

	// Geocode.fromLatLng("48.8583701", "2.2922926").then(
	//     response => {
	//       const address = response.results[0].formatted_address;
	//       console.log(address);
	//     },
	//     error => {
	//       console.error(error);
	//     }
	//   );

	render() {
		return (
			<MapWithAMarker
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzW2O8kun6MFHbsvAL0nc7lOdmLw924LQ&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
