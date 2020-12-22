import React from 'react';
import { AsyncStorage, Alert, ActivityIndicator, Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { LinearGradient } from 'expo-linear-gradient';



const { height, width } = Dimensions.get('window');
Geocoder.init("Your API KEY");

export default class MapScreen2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLocation: null,
            desLocation: null,
            choice: this.props.navigation.getParam('choice', null),
            data: null,
            queryText: '',
            status: null,
            readyState: false
        }
    }
    componentWillMount = async () => {
        try {
            let userLocation = await AsyncStorage.getItem('userLocation');
            userLocation = JSON.parse(userLocation)
            if (userLocation !== null) {
                this.setState({ userLocation: userLocation, readyState: true, status: "Success" })
            }
            else {
                this.setState({ readyState: false, status: "Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn" })
            }
        } catch (error) {
            // Error retrieving data
            this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
            console.log("Error retrieving data")
        }
    }
    componentDidMount() {
        console.log(this.state.userLocation)
    }
    getAutoCompleteText = async () => {
        const queryText = this.state.queryText
        const uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${queryText}&language=vi&location=10.823099,106.629662&radius=5000&hasNextPage=true&nextPage()=true0&key=Your_API_KEY`;

        try {
            const encoded = encodeURI(uri);
            const response = await fetch(encoded);
            const myJson = await response.json();
            this.setState({ data: myJson.predictions })
        }
        catch (error) {
            console.log('Error: ', error)
        }

    }
    check = () => {
        const { navigate } = this.props.navigation;
        const userLocation = this.state.userLocation
        const desLocation = this.state.desLocation
        const choice = this.state.choice
        if (choice === 1 && userLocation !== null && desLocation !== null) {
            // navigate('Links', { choice: this.state.choice })
            Alert.alert(
                'Wanna go',
                `From: ${userLocation['address']}` + "\n" + `To: ${desLocation['address']}`,
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            try {
                                await AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
                            } catch (error) {
                                console.log("error saving userLocation: ",error)
                                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
                            }
                            try {
                                await AsyncStorage.setItem('desLocation', JSON.stringify(desLocation));
                            } catch (error) {
                                console.log("error saving desLocation: ",error)
                                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
                            }
                            navigate('Links', { choice: this.state.choice, userLocation: userLocation, desLocation: desLocation })
                        },
                    },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                    },
                ],
            );
        }
        else if (choice === 0 && userLocation !== null) {
            // navigate('Links', { choice: this.state.choice })
            Alert.alert(
                'Pegasus',
                'Current Location',
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            try {
                                await AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
                            } catch (error) {
                                console.log("error saving userLocation: ",error)
                                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
                            }
                            try {
                                await AsyncStorage.setItem('desLocation', JSON.stringify(desLocation));
                            } catch (error) {
                                console.log("error saving desLocation: ",error)
                                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
                            }
                            navigate('Links', { choice: this.state.choice, userLocation: userLocation, desLocation: desLocation })
                        },
                    },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                    },
                ],
            );
        }
    }
    renderItem = ({ item, index }) => {
        const margin = index === 0 ? 20 : 0;
        if (this.state.queryText !== '') {
            return (
                <View style={{ backgroundColor: 'white', height: 80, marginTop: margin }}>
                    <TouchableOpacity
                        style={{ height: 50, backgroundColor: 'white' }}
                        onPress={async () => {
                            const uri = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=Your_API_Key`
                            try {
                                const encoded = encodeURI(uri);
                                const response = await fetch(encoded);
                                const respJson = await response.json();
                                const location = respJson.result.geometry.location
                                console.log(location.lat);
                                if (this.state.type === 0)
                                    this.setState({ userLocation: { latitude: location.lat, longitude: location.lng, address: item.description } }, () => this.check())
                                else
                                    this.setState({ desLocation: { latitude: location.lat, longitude: location.lng, address: item.description } }, () => this.check())
                            }
                            catch (error) {
                                console.log('Error: ', error)
                            }

                        }}>
                        <Text
                            lineHeight={2}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, height: 60 }}>
                            {item.description}
                        </Text>
                        <View
                            style={{
                                backgroundColor: 'black',
                                height: 1,
                                marginTop: 10,
                                marginHorizontal: 20,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={{ backgroundColor: 'white', height: 80, marginTop: margin }} />
        )
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
                    paddingTop: Constants.statusBarHeight,
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#ED4264" />
                </View>
            )
        }
        if (readyState === false) {
            <View style={{
                flex: 1,
                paddingTop: Constants.statusBarHeight,
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>{status}</Text>
            </View>
        }
        const curr = this.state.userLocation !== null ? this.state.userLocation.address : 'Vị trí hiện tại'
        let des = this.state.desLocation !== null ? this.state.desLocation.address : 'Tôi muốn đến'
        des = this.state.choice === 0 ? 'HCM city' : des
        const edt = this.state.choice === 0 ? false : true
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#ED4264', '#FBD786']}
                    style={styles.header}
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
                        <Text style={styles.logo}>Pegasus</Text>
                    </View>
                </LinearGradient>
                <View style={styles.locationInfoCard}>
                    <View
                        style={{
                            flex: 1,
                            marginTop: 10,
                            marginHorizontal: 15,
                            flexDirection: 'row',
                        }}>
                        <MaterialIcons name="my-location" size={24} />
                        <TextInput
                            selectionColor='pink'
                            style={{ paddingHorizontal: 15, flex: 1, fontSize: 16, marginBottom: 15 }}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            placeholder={curr}
                            onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
                                console.log(text)
                                this.setState({ queryText: text, type: 0 }, () => this.getAutoCompleteText())
                            }}
                            placeholderTextColor={'black'}
                        />
                    </View>
                    <View
                        style={{
                            height: 1,
                            backgroundColor: 'black',
                            marginHorizontal: 15,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            marginTop: 10,
                            marginHorizontal: 15,
                            flexDirection: 'row',
                        }}>
                        <Entypo name="location" size={24} />
                        <TextInput
                            selectionColor='pink'
                            style={{ paddingHorizontal: 15, flex: 1, fontSize: 16, marginBottom: 15 }}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            placeholder={des}
                            editable={edt}
                            onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
                                console.log(text)
                                this.setState({ queryText: text, type: 1 }, () => this.getAutoCompleteText())
                            }}
                            placeholderTextColor={'black'}
                        />
                    </View>
                </View>
                <FlatList
                    style={{
                        flex: 1, marginTop: 20, backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

        );
    }
}

MapScreen2.navigationOptions = {
    header: null
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: Constants.statusBarHeight,
    },
    root: {
        height: 40,
        borderBottomWidth: 5,
        justifyContent: 'center'
    },
    header: {
        height: 60,
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
    locationInfoCard: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: width,
        height: 100,
        justifyContent: 'center',
    },
});