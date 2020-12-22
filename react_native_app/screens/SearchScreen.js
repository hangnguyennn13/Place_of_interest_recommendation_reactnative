import React from 'react';
import {
    ActivityIndicator, AsyncStorage,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {
    MaterialIcons,
    Entypo,
} from '@expo/vector-icons';

import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';
import SearchItem from '../components/SearchItem';
import { TestData } from "../utilis/HomeScreen/testData";

import * as API from '../utilis/api'
const images = [
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];



const { height, width } = Dimensions.get('window');


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
            search: '',
            choice: this.props.navigation.getParam('choice', null),
            userLocation: this.props.navigation.getParam('userLocation', null),
            desLocation: this.props.navigation.getParam('desLocation', null),
            cat: this.props.navigation.getParam('cat', 'default'),
            subCat: ['Đồ Ăn', 'Đồ Uống', 'Vui Chơi', 'Tham Quan'],
            data: TestData,
            basketId: this.props.navigation.getParam('basketId', null),
            sl: this.props.navigation.getParam('sl', 0),
            status: null,
            readyState: false,
        };

    }
    async componentDidMount() {
        const choice = this.state.choice
        let cat = this.state.cat
        const userLocation = this.state.userLocation
        const desLocation = this.state.desLocation
        const basketId = this.state.basketId
        if (cat == "Đồ Ăn") {
            cat = "food"
        }
        else if (cat == "Đồ Uống") {
            cat = "drink"
        }
        else {
            cat = null
        }
        if ((basketId !== null) && (userLocation !== null)) {
            if (desLocation !== null) {
                API.recommenPlacesOnRoute(userLocation, desLocation, null, cat).then((data) => {
                    this.setState({ placeSearch: JSON.parse(data.other), readyState: true, status: "Success" }, async () => {
                        console.log(this.state.placeSearch)
                        try {
                            let placeSearch = this.state.placeSearch
                            await AsyncStorage.setItem('placeSearch', JSON.stringify(placeSearch));
                        } catch (error) {
                            // Error saving data
                            console.log("error saving data", error)
                            this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
                        }
                    })
                }).catch((error) => {
                    this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
                })
            }
            else {
                API.recommendNearPlaces(userLocation, null, cat).then((data) => {
                    this.setState({ placeSearch: JSON.parse(data.other), readyState: true, status: "Success" }, () => {
                        console.log(this.state.placeSearch)
                    })
                }).catch((error) => {
                    this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
                })
            }
        }
        else {
            this.setState({ readyState: false, status: "Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn" })
        }

    }
    updateSearch = search => {
        this.setState({ search });
    };
    onPress = ({ cat }) => {
        // const choice = desLocation === null ? 0 : 1
        // this.props.navigation.navigate('Category', { cat: cat, userLocation: this.state.userLocation, desLocation: this.state.desLocation, type = type })
    }

    render() {

        const { navigate } = this.props.navigation;
        const { search } = this.state;
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
            <View style={styles.contentContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.header}>
                        <LinearGradient
                            colors={['#ED4264', '#FBD786']}
                            style={styles.banner}
                            //  Linear Gradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 15,
                                        paddingLeft: 10,
                                        flexDirection: 'row',
                                    }}
                                    onPress={() => { this.props.navigation.goBack(null); }}>
                                    <MaterialIcons name='arrow-back' size={26} color="#fff" />
                                </TouchableOpacity>
                                <Text
                                    style={styles.logo}>
                                    Pegasus
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 12,
                                        paddingHorizontal: 15,
                                        flexDirection: 'row',
                                    }}
                                    onPress={() => { this.props.navigation.navigate('LikeScreen') }}>
                                    <Entypo name="heart" size={26} color="#fff" />
                                    <View
                                        style={{
                                            height: 17,
                                            width: 22,
                                            backgroundColor: 'white',
                                            marginLeft: -5,
                                            borderRadius: 7.5,
                                            borderColor: '#FBD786',
                                            borderWidth: 2,
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                marginTop: -3.5,
                                                fontWeight: '700',
                                            }}>
                                            {this.state.sl}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 50,
                                    paddingHorizontal: 15,
                                    justifyContent: 'space-around',
                                }}>
                                <TouchableOpacity style={{ opacity: 0.7 }} onPress={({ cat = this.state.subCat[0] }) => { this.onPress() }}>
                                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{this.state.subCat[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ opacity: 0.7 }} onPress={({ cat = this.state.subCat[1] }) => { this.onPress() }}>
                                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{this.state.subCat[1]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ opacity: 0.7 }} onPress={({ cat = this.state.subCat[2] }) => { this.onPress() }}>
                                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{this.state.subCat[2]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ opacity: 0.7 }} onPress={({ cat = this.state.subCat[3] }) => { this.onPress() }}>
                                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{this.state.subCat[3]}</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                        <View style={styles.userInfor}>
                            <SearchBar
                                containerStyle={styles.detailInfor}
                                lightTheme
                                round
                                inputContainerStyle={{ backgroundColor: 'white' }}
                                placeholder="Type Here..."
                                onChangeText={this.updateSearch}
                                value={search}
                            />
                        </View>
                    </View>
                    <View style={styles.famousPlace}>
                        <SearchItem data={this.state.data} />
                    </View>
                </View>
            </View>
        );
    }
}

const Category = () => {
    return (
        <TouchableOpacity style={{ opacity: 0.7 }} onPress={({ cat = props.name }) => { props.onPress() }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{props.name}</Text>
        </TouchableOpacity>
    )
}

SearchScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        height: 180,
    },
    banner: {
        flex: 1,
    },
    logo: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        flex: 1,
    },
    circle: {
        height: 17,
        width: 22,
        backgroundColor: 'white',
        marginLeft: -5,
        borderRadius: 7.5,
        borderColor: '#FBD786',
        borderWidth: 2,
    },
    likeValue: {
        textAlign: 'center',
        marginTop: -3.5,
        fontWeight: '700',
    },
    userInfor: {
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailInfor: {
        flex: 1,
        marginTop: -30,
        backgroundColor: 'white',
        width: width - 60,
        marginBottom: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },

    famousPlace: {
        flex: 1,
    },
});
