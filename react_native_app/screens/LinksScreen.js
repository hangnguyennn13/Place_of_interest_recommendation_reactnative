import React from 'react';
import {
  AsyncStorage, Alert, ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import Constants from 'expo-constants';
import FamousRoute from './FamousRoute';
import PopularPlace from '../components/PopularPlace'
import { LinearGradient } from 'expo-linear-gradient';

import * as API from '../utilis/api'
const { height, width } = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      ht: false,
      userLocation: this.props.navigation.getParam('userLocation', null),
      desLocation: this.props.navigation.getParam('desLocation', null),
      choice: this.props.navigation.getParam('choice', null),
      subCat: ['Đồ Ăn', 'Đồ Uống', 'Vui Chơi', 'Tham Quan'],
      status: null,
      readyState: false,
    };
  }
  componentDidMount = async () => {
    try {
      let userLocation = this.state.userLocation
      let desLocation = this.state.desLocation
      let basketId = await AsyncStorage.getItem('basketId');
      let sl = await AsyncStorage.getItem('sl');
      if (sl === null) {
        sl = 0
      }
      this.setState({ userLocation: userLocation, desLocation: desLocation, basketId: basketId, sl: sl }, async () => {
        console.log(userLocation, desLocation, basketId)
        if ((basketId !== null) && (userLocation !== null)) {
          if (desLocation !== null) {
            API.recommenPlacesOnRoute(userLocation, desLocation, null, null).then((data) => {
              this.setState({ places: JSON.parse(data.other), readyState: true, status: "Success" }, async () => {
                console.log(this.state.places)
                try {
                  let places = this.state.places
                  await AsyncStorage.setItem('places', JSON.stringify(places));
                } catch (error) {
                  // Error saving data
                  console.log("error saving data",error)
                  this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
                }
              })
            }).catch((error) => {
              this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
            })
          }
          else {
            API.recommendNearPlaces(userLocation, null, null).then((data) => {
              this.setState({ places: JSON.parse(data.other), readyState: true, status: "Success" }, () => {
                console.log(this.state.places)
              })
            }).catch((error) => {
              this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
            })
          }
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
  onPress = ({ cat }) => {
    const choice = this.state.desLocation === null ? 0 : 1
    this.props.navigation.navigate('Search', { cat: cat, userLocation: this.state.userLocation, desLocation: this.state.desLocation, choice: this.state.choice,basketId: this.state.basketId, sl: this.state.sl })
  }
  render() {
    const curr = this.state.userLocation !== null ? this.state.userLocation.address : 'Vị trí hiện tại'
    let des = this.state.desLocation !== null ? this.state.desLocation.address : 'Tôi muốn đến'
    des = this.state.choice === 0 ? 'HCM city' : des
    const {
      readyState,
      status
    } = this.state
    if (status === null) {
      return (
        <View style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text>{status}</Text>
        </View>
      )

    }
    return (
      <ScrollView style={styles.contentContainer}>
        <View style={{ flex: 1 }}>
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
                  marginBottom: 70,
                  paddingHorizontal: 15,
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity style={{ opacity: 0.7 }} onPress={({ cat = this.state.subCat[0] }) => { this.onPress(this.state.subCat[0]) }}>
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
              <View style={styles.detailInfor}>
                <View style={{ flex: 1, marginTop: 10, marginHorizontal: 15, flexDirection: 'row' }}>
                  <MaterialIcons name='my-location' size={24} />
                  <Text style={{ paddingHorizontal: 15, flex: 1, fontSize: 16 }} ellipsizeMode={'tail'} numberOfLines={1}>{curr}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'black', marginHorizontal: 15 }}></View>
                <View style={{ flex: 1, marginTop: 10, marginHorizontal: 15, flexDirection: 'row' }}>
                  <Entypo name='location' size={24} />
                  <Text style={{ paddingHorizontal: 15, flex: 1, fontSize: 16 }} ellipsizeMode={'tail'} numberOfLines={1}>{des}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.famousPlace}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, }}>
                  Popular Place
                  </Text>
                <View style={{ width: width, height: 300 }}>
                  <PopularPlace data={this.state.places} />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, }}>
                  Recommended Route
                  </Text>
                <View style={{ width: width, height: 550, marginTop: 20 }}>
                  <FamousRoute />
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }
}
const Category = () => {
  return (
    <View></View>
  )
}
LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  header: {
    height: 200,
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
    marginTop: -60,
    backgroundColor: 'white',
    width: width - 60,
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
    alignItems: 'center',
    height: 100,
  },

  famousPlace: {
    flex: 7
  },
  category: {
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  categoryCard: {
    backgroundColor: 'white',
    width: 70,
    marginTop: -10,
  },
});
