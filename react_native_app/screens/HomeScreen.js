import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Entypo,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import FamousRoute from './FamousRoute';
import Landmarks from '../components/Landmarks';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as API from '../utilis/api'

const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const { height, width } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      userId: "u1",
      status: 'Đồng ý cho Pegasus truy cập vị trí hiện tại của bạn nhé!',
      readyState: false
    }
  }

  componentDidMount = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ latitude: latitude, longitude: longitude, status: "" }, () => {
          let userId = this.state.userId
          API.getBasketId(userId, latitude, longitude).then((data) => {
            console.log(data.basketId)
            this.setState({ basketId: data.basketId, city: data.city, sl: data.sl, readyState: true, status: "Success" }, async () => {
              try {
                let userLocation = { "latitude": latitude, "longitude": longitude, "address": "" }
                await AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
              } catch (error) {
                // Error saving data

                console.log("error saving data")
                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
              }
              try {
                await AsyncStorage.setItem('basketId', this.state.basketId);
              } catch (error) {
                // Error saving data
                console.log("error saving basketId")
                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
              }
              try {
                await AsyncStorage.setItem('sl', this.state.sl.toString());
              } catch (error) {
                // Error saving data
                console.log("error saving sl")
                this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
              }
            })
          }).catch((error) => {
            this.setState({ readyState: false, status: 'Xin lỗi Server máy chủ Pegasus hiện đang bảo trì' })
          })


        })
      },
      (error) => this.setState({ readyState: false, status: 'Xin lỗi Pegasus không thể định vị được vị trí hiện tại của bạn' })
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      readyState,
      status
    } = this.state
    if (readyState === false) {
      <View style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>{status}</Text>
        <ActivityIndicator size="large" color="#ED4264" />
      </View>
    }

    return (
      <ScrollView
        style={styles.contentContainer} >
        <View style={{ flex: 1, justifyContent: "center" }}>
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
                onPress={() => navigate('Like')}>
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
              <View style={styles.detailInfor} >
                <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", height: 60, paddingTop: 11 }}>Welcome to {this.state.city}</Text>
              </View>
            </View>
          </View>
          <View style={styles.famousPlace}>
            <View
              style={{ flex: 1, backgroundColor: 'white' }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Tourist Attraction
                </Text>

              <View style={{ width: width, height: 790, marginTop: 10, }}>
                <Landmarks />
              </View>
              <View style={{ marginTop: -10 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', paddingHorizontal: 20, }}>
                  Recommended Route
                  </Text>
                <View style={{ width: width, height: 550, marginTop: 10, }}>
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

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
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
  }
});


