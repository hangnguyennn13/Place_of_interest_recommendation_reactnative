import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, Image, ActivityIndicator } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Carousel from 'react-native-snap-carousel';
import * as Font from 'expo-font';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";



const images = [
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const { height, width } = Dimensions.get('window');
let lat = 10.823099;
let log = 106.629662;

export default class Landmarks extends React.Component {
    constructor() {
        super()
        this.state = {
            entries: FamousPlaceData,
            loading: true,
            selectedIndex: 0,
            latitude: null,
            longitude: null,
            coords: null
        }
    }
    async componentWillMount() {


        await Font.loadAsync({
            'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })

        const { status } = await Permissions.getAsync(Permissions.LOCATION)

        if (status !== 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION)
        }
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, () => {
                lat = this.state.latitude
                log = this.state.longitude
                this.state.entries.map(entry => {
                    entry.latitude = this.state.latitude
                    entry.longitude = this.state.longitude
                })
            }),
            (error) => console.log('Error:', error)
        )

        this.setState({ loading: false })
    }
    setIndex = props => {
        console.log(props)
        this.setState({ selectedIndex: props })
    }

    _renderItem({ item, index }) {
        let today = new Date();
        let year = today.getFullYear();
        let age = year - item.foundationYear;

        return (
            <View style={styles.famousPlaceCard} key={index}>
                <View style={{ flex: 1.2 }}>
                    <Image source={{ uri: images[4] }} style={styles.image} />
                </View>

                <View style={styles.seperator}></View>

                <View style={{ flex: 2, backgroundColor: '#F9F9F9' }}>
                    <View style={styles.placeDetail}>
                        <MaterialIcons name="place" size={18} />
                        <View>
                            <Text style={{ paddingHorizontal: 15 }}>{item.name}</Text>
                            <Text style={{ paddingHorizontal: 15 }}>{item.address}</Text>
                        </View>

                    </View>
                    <View style={styles.placeDetail}>
                        <MaterialIcons name="place" size={18} />
                        <View>
                            <Text style={{ paddingHorizontal: 15 }}>{item.name}</Text>
                            <Text style={{ paddingHorizontal: 15 }}>{item.address}</Text>
                        </View>

                    </View>
                    <View style={styles.placeDetail}>
                        <MaterialIcons name="place" size={18} />
                        <View>
                            <Text style={{ paddingHorizontal: 15 }}>{item.name}</Text>
                            <Text style={{ paddingHorizontal: 15 }}>{item.address}</Text>
                        </View>

                    </View>
                    <View style={styles.placeDetail}>
                        <MaterialIcons name="place" size={18} />
                        <View>
                            <Text style={{ paddingHorizontal: 15 }}>{item.name}</Text>
                            <Text style={{ paddingHorizontal: 15 }}>{item.address}</Text>
                        </View>

                    </View>
                </View>

                <LinearGradient
                    colors={['#ED4264', '#FBD786']}
                    style={styles.countCard}
                    //  Linear Gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 14 }}>Get Start</Text>
                </LinearGradient>
            </View>
        );

    }

    render() {
        const {
            latitude,
            longitude,
        } = this.state
        if (this.state.loading && latitude === null) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" style={{ textAlign: "center" }} />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width - 60}
                    itemHeight={400}
                    onMomentumScrollEnd={this.setSelectedIndex}
                    onSnapToItem={(index) => this.setIndex(index)}
                />

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    famousPlaceCard: {
        height: 500, width: width - 60, borderRadius: 10,
    },
    placeToGoWith: {
        height: 200, width: width - 60, borderRadius: 10,
    },
    seperator: { height: 15, backgroundColor: '#F9F9F9' },

    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    placeName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cityInfor: {
        textAlign: 'center',
        fontSize: 14
    },

    placeDetail: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    countCard: {
        flex: 0.3,
        height: 80,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },


});
