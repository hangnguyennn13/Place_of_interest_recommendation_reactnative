import React from 'react';
import {
  ActivityIndicator, AsyncStorage,
  View, TouchableOpacity, Text, Dimensions, StyleSheet, Image, ScrollView
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import Constants from 'expo-constants';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";
import { LinearGradient } from 'expo-linear-gradient';

import * as API from '../utilis/api'
const { height, width } = Dimensions.get('window');
const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];


export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: FamousPlaceData,
      userId: "u1",
      status: null,
      readyState: false,
      userLocation: null,
      desLocation: null,
      basketId: null,
      sl: 0,
    }
  }
  componentDidMount = async () => {
    try {
      let userLocation = await AsyncStorage.getItem('userLocation');
      userLocation = JSON.parse(userLocation)
      let desLocation = await AsyncStorage.getItem('desLocation');
      desLocation = JSON.parse(desLocation)
      let basketId = await AsyncStorage.getItem('basketId');
      let sl = await AsyncStorage.getItem('sl');
      if (sl === null) {
        sl = 0
      }
      this.setState({ userLocation: userLocation, desLocation: desLocation, basketId: basketId, sl: sl }, async () => {
        console.log(userLocation, desLocation, basketId)
        if ((basketId !== null) && (userLocation !== null)) {
          API.recommendRoute(userLocation, desLocation, basketId).then((data) => {
            this.setState({ points: data.points, waypoint_order: data.waypoint_order, data: JSON.parse(data.result), readyState: true, status: "Success" }, () => {
              console.log(this.state.data)
            })
          }).catch((error) => {
            this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
          })
        }
        else {
          this.setState({ readyState: false, status: "Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn" })
        }
      })
    } catch (error) {
      // Error retrieving data
      this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
      console.log("Error retrieving data")
    }

  }

  getStart = () =>{
    let userLocation = this.state.userLocation
    let latitude = userLocation.latitude
    let longitude = userLocation.longitude
    console.log("likeScreen: ",userLocation)
    this.props.navigation.navigate('Map3', { userLocation: this.state.userLocation, desLocation: this.state.desLocation,basketId: this.state.basketId,data:this.state.data,latitude:latitude,longitude:longitude })
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        key={item}
        style={{
          height: 220,
          backgroundColor: isActive ? 'blue' : 'white',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
        onPress={move}
      >
        <View style={{}}>
          <PlaceCard item={item} index={index} />
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const { navigate } = this.props.navigation;
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
      return (
        <View style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text>{status}</Text>
        </View>
      )

    }
    console.log(this.state.data)
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  alignItems: 'flex-start',
                  flex: 1,
                }}>
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
            </LinearGradient>
            <View style={styles.userInfor}>
              <TouchableOpacity style={styles.detailInfor} onPress={this.getStart}>
                <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", height: 60, paddingTop: 11 }}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, }}>
            Recommended Order
          </Text>
          <Text style={{ fontWeight: '100', paddingHorizontal: 20, marginTop: 5, marginBottom: 10 }}>You can reorder places based on your references
        </Text>
          <View style={styles.famousPlace}>
            <DraggableFlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item.url}
              scrollPercent={5}
              onMoveEnd={({ data }) => this.setState({ data })}
            />
          </View>
        </View>
      </View>
    )
  }
}

const PlaceCard = props => {
  let item = props.item;
  let index = props.index;
  item.order = 1;
  let key = item.resName + item.resAddress
  return (
    <View
      key={key}
      style={{
        width: width - 60,
        height: 200,
        display: 'flex',
        margin: 30,
        borderRadius: 10,
        overflow: 'hidden', backgroundColor: "#F9F9F9"
      }}>
      <View style={{ flex: 12, flexDirection: "row" }}>
        <Image source={{ uri: item.resUrl }} style={styles.image} />
        <TouchableOpacity style={{ marginLeft: -30 }}>
          <Entypo name="cross" size={24} color="white" />
        </TouchableOpacity>

      </View>
      <View
        style={{
          flex: 1,
          marginTop: -10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: "#F9F9F9"
        }}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: '700',
          paddingHorizontal: 10,
          backgroundColor: "#F9F9F9"
        }}>
        {item.resName}
      </Text>
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          paddingBottom: 15
        }}>
        <MaterialIcons name="place" size={18} color="black" />
        <Text style={{ paddingHorizontal: 15, color: 'black' }}>{item.resAddress}</Text>
      </View>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  header: {
    height: 150,
    backgroundColor: 'white',
  },
  banner: {
    flex: 1.5,
    backgroundColor: '#eaa0a2',
    flexDirection: "row",
  },
  userInfor: {
    flex: 1,
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
  },
  famousPlace: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  famousPlaceCard: {
    height: 200,
    width: width - 60,
    borderRadius: 10,

  },
  placeToGoWith: {
    height: 200,
    width: width - 60,
    borderRadius: 10,
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
    marginTop: 5,
    paddingHorizontal: 15
  },
  countCard: {
    flex: 0.5,
    flexDirection: 'row',
    paddingVertical: 5,
    height: 40,
    backgroundColor: '#eaa0a2',
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
})