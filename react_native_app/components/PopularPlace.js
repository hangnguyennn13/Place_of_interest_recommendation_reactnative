import React from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Font from 'expo-font';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';

import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";
import { PlaceToGoWith } from "../utilis/HomeScreen/placeToGoWith";

import Place from "../components/Place1"


const images = [
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.foody.vn/res/g13/121579/prof/s280x175/foody-mobile-r1-jpg-807-635749776897846717.jpg'
];

const { height, width } = Dimensions.get('window');
export default class PopularPlace extends React.Component {
    constructor() {
        super()
        this.state = {
            entries: PlaceToGoWith[0],
            status: null,
            readyState: false,
            selectedIndex: 0,
        }
    }
    async componentWillMount() {

        await Font.loadAsync({
            'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        try {
            let places = await AsyncStorage.getItem('places');
            places = JSON.parse(places)
            console.log(places)
            this.setState({ places: places,readyState: true, status: "Success" })
        } catch (error) {
            // Error retrieving data
            this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
            console.log("Error retrieving data",error)
        }

    }
    setIndex = props => {
        console.log(props)
        this.setState({ selectedIndex: props })
    }

    _renderItem({ item, index }) {

        return (
            <Place item={item} index={index} />
        );

    }

    render() {
        const {
            readyState,
            status
        } = this.state
        if (status === null) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#ED4264" />
                </View>
            )
        }
        if (readyState === false) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>{status}</Text>
                </View>
            )

        }
        return (
            <View style={styles.container}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.places}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width - 60}
                    itemHeight={300}
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
        backgroundColor: '#fff',
    },

    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

});
