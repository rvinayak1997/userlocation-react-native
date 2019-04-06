import Re act, { Component } from 'react';
import { View, Text, Button,Linking } from 'react-native';
import Geocoder from 'react-native-geocoder';

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  refresh = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  render() {
    Geocoder.geocodePosition(this.state.latitude,this.state.longitude)
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.refresh()}</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>

        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://www.google.com/maps/place/${this.state.latitude},${this.state.longitude')}>UserLocation</Text>

        
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
         <Button
          style={{ marginTop: 30 }}
          onPress={() => { this.refresh(); }}
          title="Refresh"
        />
      </View>
    );
  }
}

export default GeolocationExample;