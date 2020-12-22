import React from 'react';
import { ActivityIndicator,AsyncStorage,Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import { Marker } from 'react-native-maps'


import {
    MaterialIcons,
    Entypo,
} from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');
import Geocoder from 'react-native-geocoding';

// Initialize the module (needs to be done only once)
Geocoder.init("Your_API_KEY");



export default class MapScreen1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            readyState: false,
            address: 'Vị trí hiện tại',
            status: 'Đồng ý cho Pegasus truy cập vị trí hiện tại của bạn nhé!',
            choice: this.props.navigation.getParam('choice', 1),
        }
    }

    async componentDidMount() {
        try {
            let userLocation = await AsyncStorage.getItem('userLocation');
            userLocation = JSON.parse(userLocation)
            let latitude = userLocation['latitude']
            let longitude = userLocation['longitude']
            this.setState({ latitude: latitude, longitude: longitude, readyState: true }, () => { this.getLocationDescription() })
        } catch (error) {
            // Error retrieving data
            console.log("Error retrieving userLocation: ",error)
        }
    }

    getLocationDescription = async () => {
        let latitude = this.state.latitude
        let longitude = this.state.longitude
        console.log(latitude, longitude)
        Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[1].formatted_address;
                this.setState({ address: addressComponent }, async () => {
                    try {
                        let userLocation = { "latitude": latitude, "longitude": longitude, "address": addressComponent}
                        await AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
                    } catch (error) {
                        // Error saving data
                        this.setState({readyState: false, status: 'Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn'})
                        console.log("error saving data")
                    }
                })
            })
            .catch(error => this.setState({ readyState: false, status: 'Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn' }));
    }

    render() {
        const { navigate } = this.props.navigation;
        const {
            latitude,
            longitude,
            readyState,
            address
        } = this.state
        if (readyState) {
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
                        <Marker draggable
                            pinColor={'blue'}
                            coordinate={{
                                "latitude": latitude,
                                "longitude": longitude
                            }}
                            onDragEnd={async (e) => {
                                let coords = e.nativeEvent.coordinate
                                let myLat = coords.latitude
                                let myLon = coords.longitude
                                this.setState({ latitude: myLat, longitude: myLon }, () => this.getLocationDescription())
                            }}
                        />
                    </MapView>
                    <TouchableOpacity
                        style={{
                            marginVertical: 25,
                            marginLeft: 10,
                            flexDirection: 'row',
                            position: 'absolute'
                        }}
                        onPress={() => { this.props.navigation.goBack(null); }}>
                        <MaterialIcons name='arrow-back' size={26} color="#ED4264" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.locationInfoCard}
                        onPress={() => navigate('Map2', { choice: this.state.choice })}
                    >
                        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 15, flexDirection: 'row' }}>
                            <MaterialIcons name='my-location' size={24} />
                            <Text style={{ paddingHorizontal: 15, flex: 1, fontSize: 16 }} ellipsizeMode={'tail'} numberOfLines={1}>{address}</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'black', marginHorizontal: 15 }}></View>
                        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 15, flexDirection: 'row' }}>
                            <Entypo name='location' size={24} />
                            <Text style={{ paddingHorizontal: 15, flex: 1, fontSize: 16 }}>{this.state.choice === 1 ? 'Tôi muốn đến' : address}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            );
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.status}</Text>
            </View>
        )
    }

}
MapScreen1.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    locationInfoCard: {
        marginTop: height - 200,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: width - 40,
        marginHorizontal: 20,
        height: 100,
        justifyContent: 'center',
        position: 'absolute'
    },
});