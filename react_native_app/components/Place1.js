
import React from 'react';
import { AsyncStorage, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MenuScreen from '../screens/MenuScreen';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-elements';
import * as API from '../utilis/api'
const images = [
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const { height, width } = Dimensions.get('window');
export default class Place extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.state = {
            screenHeight: 0,
            modalVisible: false,
            menu: null
        };
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

    addBasket = () => {

    }

    render() {
        const { item, index } = this.props
        const { menu } = this.state
        return (
            <View
                key={item}>
                <Modal isVisible={this.state.modalVisible} key={item} style={{ width: width, height: height, margin: 0, padding: 0 }}>
                    <View style={{ flex: 1, backgroundColor: 'white', width: width, height: height, margin: 0, padding: 0 }}>
                        <MenuScreen menu={menu} closeModal={this.closeModal} onRef={ref => (this.child = ref)}></MenuScreen>
                    </View>

                </Modal>
                <View style={{
                    width: width - 60,
                    height: 300, alignItems: 'center'
                }} >
                    <View
                        style={{
                            width: width - 60,
                            height: 200,
                            display: 'flex',
                            marginTop: 30,
                            borderRadius: 10,
                            overflow: 'hidden',
                            flexDirection: 'row',
                        }}>
                        <Image source={{ uri: item.resUrl }} style={styles.image} />
                        <TouchableOpacity style={{ marginLeft: -35, padding: 5, height: 30 }} onPress={() => { console.log("press") }}>
                            <Entypo name="heart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: width - 80,
                            height: 80,
                            display: 'flex',
                            marginTop: -50,
                            borderRadius: 10,
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,

                            flexDirection: 'row',
                        }}>
                        <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 20 }}>
                            <Text ellipsizeMode={'tail'}
                                numberOfLines={1} style={{ fontWeight: '700', fontSize: 16 }}>{item.resName}</Text>
                            <Text ellipsizeMode={'tail'}
                                numberOfLines={1} style={{ color: 'gray', fontSize: 12 }}>{item.resAddress}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 8,
                                    alignItems: 'center',
                                }}>
                                <Rating
                                    imageSize={12}
                                    readonly
                                    startingValue={item.resRating}
                                    ratingCount={5}
                                />
                                <Text style={{ paddingLeft: 10, fontSize: 12, paddingTop: -5 }}>{item.rating}</Text>
                                <Text style={{ paddingLeft: 5, fontSize: 12, paddingTop: -5 }}>{item.comment}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginVertical: 12, marginRight: 10 }} onPress={() => this.openModal(item)}>
                            <MaterialIcons name="info-outline" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
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
