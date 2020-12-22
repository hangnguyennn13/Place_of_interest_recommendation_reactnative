import React from 'react';
import {
    ActivityIndicator, AsyncStorage,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {
    Entypo,
} from '@expo/vector-icons';
import MenuScreen from '../screens/MenuScreen';
import { Rating } from 'react-native-elements';
import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";

const images = [
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.foody.vn/res/g13/121579/prof/s280x175/foody-mobile-r1-jpg-807-635749776897846717.jpg'
];

const { height, width } = Dimensions.get('window');
const subHeight = height / 9;

export default class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
            modalVisible: false,
            status: null,
            readyState: false,
            menu: null
        };
    }

    async componentWillMount() {
    
        try {
            let placeSearch = await AsyncStorage.getItem('placeSearch');
            placeSearch = JSON.parse(placeSearch)
            console.log(placeSearch)
            this.setState({ placeSearch: placeSearch, readyState: true, status: "Success" })
        } catch (error) {
            // Error retrieving data
            this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
            console.log("Error retrieving data", error)
        }

    }
    openModal = async (props) => {
        console.log(props)
        try {
            await AsyncStorage.setItem('resTouch', JSON.stringify(props));
        } catch (error) {
            // Error saving data
            console.log("error saving data")
            this.setState({ modalVisible: false });
        }
        API.getMenu(props.index).then(async (data) => {
            let menu = JSON.parse(data.food)
            try {
                await AsyncStorage.setItem('menu', JSON.stringify(menu));
                this.setState({ modalVisible: true });
            } catch (error) {
                // Error saving data
                console.log("error saving data")
                this.setState({ modalVisible: false });
            }
            this.setState({ menu: menu })
        }).catch((error) => {
            this.setState({ modalVisible: false });
        })

    }

    closeModal() {
        this.setState({ modalVisible: false });
        // this.child.method()
    }

    renderItem = ({ item }) => {
        let url = item.resUrl
        let open = item.open ? 'Open' : 'Close'
        let price = 'Cheap'
        const { menu } = this.state
        return (
            <View
                key={item.resName}>
                <Modal isVisible={this.state.modalVisible} key={item} style={{ width: width, height: height, margin: 0, padding: 0 }}>
                    <View style={{ flex: 1, backgroundColor: 'white', width: width, height: height, margin: 0, padding: 0 }}>
                        <MenuScreen menu={menu} closeModal={this.closeModal} onRef={ref => (this.child = ref)}></MenuScreen>
                    </View>

                </Modal>
                <TouchableOpacity
                    style={styles.resCard}
                    onPress={() => this.openModal()}>
                    <View style={styles.imgCard}>
                        <Image source={{ uri: url }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.likePlace}
                            onPress={() => { console.log('heart') }}>
                            <Entypo name="heart" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.resInfo}>
                        <Text style={styles.resName} ellipsizeMode={'tail'}
                            numberOfLines={1}>
                            {item.resName}
                        </Text>
                        <Text style={styles.resAddress} ellipsizeMode={'tail'}
                            numberOfLines={1}>
                            {item.resAddress}
                        </Text>
                        <View
                            style={styles.tagCard}>
                            <View
                                style={styles.tagHolder}>
                                <Text style={styles.tagName}>{open}
                                </Text>
                            </View>
                            <View
                                style={styles.tagHolder}>
                                <Text style={styles.tagName}>{price}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.resPoints}>{item.rating}
                        </Text>
                        <View style={styles.ratingHolder}>
                            <Rating
                                imageSize={12}
                                readonly
                                startingValue={item.rating}
                                ratingCount={5}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

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
            <FlatList
                data={this.state.placeSearch}
                renderItem={this.renderItem}
                style={{ marginTop: 5 }}
                keyExtractor={item => item.resUrl}
            />
        );
    }
}


const styles = StyleSheet.create({
    resCard: {
        backgroundColor: 'white',
        height: 130,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginVertical: 5,
    },
    imgCard: {
        flex: 1,
        marginVertical: 10,
        marginLeft: 10,
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
    likePlace: {
        marginRight: -10,
        position: 'absolute',
        padding: 5,
        height: 20,
    },
    resInfo: { marginVertical: 10, marginLeft: 15, flex: 0.8, marginRight: 5 },
    resName: {
        fontWeight: '700',
        fontSize: 16,
        paddingBottom: 2,
    },
    resAddress: { color: 'gray', fontSize: 12, paddingBottom: 5 },
    tagCard: {
        height: 15,
        marginVertical: 5,
        flexDirection: 'row',
    },
    tagHolder: {
        width: 40,
        borderRadius: 5,
        borderColor: '#ED4264',
        borderWidth: 1,
        marginRight: 5,
    },
    tagName: {
        color: '#ED4264',
        fontSize: 10,
        textAlign: 'center',
    },
    resPoints: { color: 'gray', fontSize: 12, marginTop: 5 },
    ratingHolder: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    modalContainer: {
        width: width,
        height: height,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
});
