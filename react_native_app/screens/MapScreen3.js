import React from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline';

import { Marker } from 'react-native-maps'
import * as API from '../utilis/api'


import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  FontAwesome
} from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: null,
      latitude: this.props.navigation.getParam('latitude', null),
      longitude: this.props.navigation.getParam('longitude', null),
      userLocation: this.props.navigation.getParam('userLocation', null),
      desLocation: this.props.navigation.getParam('desLocation', null),
      basketId: this.props.navigation.getParam('basketId', null),
      data: this.props.navigation.getParam('data', 0),
      location: null,
    }
  }
  async componentDidMount() {
    const userLocation = this.state.userLocation
    const desLocation = this.state.desLocation
    const basketId = this.state.basketId
    const data = this.state.data
    const res = data.map(a => a['index'])
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, () => {
        API.getStart(userLocation, desLocation, basketId, res).then((response) => {
          console.log(response)
          this.setState({ points: response.points, readyState: true, status: "Success" }, async () => {
            const coords = this.state.points.map(point => {
              return {
                latitude: point[0],
                longitude: point[1]
              }
            })
            this.setState({ coords })
          })
        }).catch((error) => {
          this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
          console.log('Error: ', error)
        })
      }),
      (error) => this.setState({ readyState: false, status: 'Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn' })
      )

  }

  renderMarkers = () => {
    const { data } = this.state
    return (
      <View>
        {
          data.map((location, idx) => {
            let lat = location.lat
            let long = location.long
            let coord = {
              "latitude": lat,
              "longitude": long
            }
            return (
              <Marker
                key={idx}
                coordinate={coord}
                title={location['name']}
                description={location['address']}
              />
            )
          })
        }
      </View>
    )
  }

  render() {
    const {
      latitude,
      longitude,
      coords
    } = this.state
    console.log(coords)
    if (latitude !== null && coords !== null) {
      return (
        <View style={styles.container}>
          <MapView
            showsUserLocation
            style={{ flex: 1, width: width, height: height }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {this.renderMarkers()}
            <MapView.Polyline
              strokeWidth={2}
              strokeColor="red"
              coordinates={coords} />
          </MapView>
          
        </View>

      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission!</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});