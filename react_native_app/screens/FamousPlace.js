import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons,Ionicons,Entypo } from '@expo/vector-icons';

const DEVICE_WIDTH = Dimensions.get("window").width;
const { height, width } = Dimensions.get('window');
import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";


export default class FamousPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
    }

    // componentDidMount = () => {
    //     setInterval(() => {
    //         this, this.setState(prev => ({ selectedIndex: prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1 }), () => {
    //             this.scrollRef.current.scrollTo({
    //                 animated: true,
    //                 y: 0,
    //                 x: 300 * this.state.selectedIndex + (15*this.state.selectedIndex)
    //             })
    //         })
    //     }, 3000)
    // }

    setSelectedIndex = event => {
        // width of the viewSize
        const viewSize = 150;
        // get current position of the scrollView
        const contentOffset = event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState({ selectedIndex: selectedIndex })
    }

    render() {
        const { images } = this.props
        const { selectedIndex } = this.state
        return (
            <View style={{ height: '100%', width: width, }}>
                <Place FamousPlaceData={FamousPlaceData} images={images} />
                <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingHorizontal: 20,
                        marginTop: 30
                    }}>Recommend place to go with</Text>
                <View style={{marginTop:15, marginHorizontal:30 }}>
                    
                    <View style={styles.placeToGoWith}>

                        <View style={{ flex: 1, backgroundColor: '#fff' }}>
                            <View style={styles.placeDetail}>
                                <Ionicons name="md-pizza" size={18} />
                                <Text style={{ paddingHorizontal: 15 }}>FamousPlaceData.address</Text>
                            </View>
                            <View style={styles.placeDetail}>
                                <Entypo name="drink" size={18} />
                                <Text style={{ paddingHorizontal: 15 }}>FamousPlaceData.openHours</Text>
                            </View>
                            <View style={styles.placeDetail}>
                                <MaterialIcons name="phone" size={18} />
                                <Text style={{ paddingHorizontal: 15 }}>FamousPlaceData.phone</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const Place = ({ FamousPlaceData, images }) => {
    let today = new Date();
    let year = today.getFullYear();
    let age = year - FamousPlace.foundationYear;
    return (
        <View style={styles.famousPlaceCard}>
            <View style={{ flex: 2 }}>
                <Image source={{ uri: images[0] }}
                    style={styles.image} />
            </View>

            <View style={styles.seperator}></View>

            <View style={{ flex: 2, backgroundColor: '#fff' }}>
                <Text style={styles.placeName}>{FamousPlaceData.name}</Text>
                <Text style={StyleSheet.cityInfor}>{FamousPlaceData.city}</Text>
                <View style={styles.placeDetail}>
                    <MaterialIcons name="place" size={18} />
                    <Text style={{ paddingHorizontal: 15 }}>{FamousPlaceData.address}</Text>
                </View>
                <View style={styles.placeDetail}>
                    <MaterialCommunityIcons name="calendar-clock" size={18} />
                    <Text style={{ paddingHorizontal: 15 }}>FamousPlaceData.openHours</Text>
                </View>
                <View style={styles.placeDetail}>
                    <MaterialIcons name="phone" size={18} />
                    <Text style={{ paddingHorizontal: 15 }}>FamousPlaceData.phone</Text>
                </View>
            </View>

            <View style={{ height: 15, backgroundColor: '#fff' }}></View>

            <View
                style={styles.countCard}>
                <View style={styles.countGroup}>
                    <Text style={styles.txtCount}>age</Text>
                    <Text style={styles.countLabel}>Age</Text>
                </View>
                <View style={styles.countGroup}>
                    <Text style={styles.txtCount}>15k</Text>
                    <Text style={styles.countLabel}>Visistors</Text>
                </View>
                <View style={styles.countGroup}>
                    <Text style={styles.txtCount}>605</Text>
                    <Text style={styles.countLabel}>Following</Text>
                </View>
            </View>

        </View>
    );


}

const styles = StyleSheet.create({

    famousPlaceCard: {
        height: 400, width: width - 60, borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginHorizontal:30
    },
    placeToGoWith:{
        marginTop:10,
        height: 200, width: width - 60, borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    seperator: { height: 15, backgroundColor: '#fff' },

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
    cityInfor: { textAlign: 'center', fontSize: 14 },

    placeDetail: {
        flexDirection: 'row',
        paddingVertical: 5,
        marginTop: 5,
        paddingHorizontal: 15
    },
    countCard: {
        flex: 0.5,
        flexDirection: 'row',
        paddingVertical: 5,
        height: 40,
        backgroundColor: '#7EA3D5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    landmarkName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    countGroup: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    txtCount: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    countLabel: {
        fontSize: 12,
        fontWeight: '400',
    },



    circleDiv: {
        position: "absolute",
        bottom: 15,
        height: 70,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink"
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: "white"
    },
})
