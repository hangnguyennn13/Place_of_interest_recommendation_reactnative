import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';

import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import MenuItem from '../components/MenuItem';


const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.foody.vn/res/g11/100424/prof/s280x175/foody-upload-api-foody-mobile-foody-mobile-hx7sjib-190620160950.jpg'
];

const { height, width } = Dimensions.get('window');
const subHeight = height / 9;

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      menu: null,
      res: null,
      status: null,
      readyState: false,
    };
  }
  componentWillMount = async () => {
    try {
      let menu = await AsyncStorage.getItem('menu');
      menu = JSON.parse(menu)
      let res = await AsyncStorage.getItem('resTouch');
      res = JSON.parse(res)
      console.log("menuscreen", res)
      this.setState({ menu: menu, res: res, readyState: true, status: "Success" })
    } catch (error) {
      // Error retrieving data
      this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
      console.log("Error retrieving data", error)
    }
  }
  render() {
    let { menu, res } = this.state
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
        <LinearGradient
          colors={['#FF5F6D', '#FFC371']}
          style={styles.banner}
          //  Linear Gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <TouchableOpacity style={{ height: 150, marginHorizontal: 10, width: 20 }} onPress={this.props.closeModal}>
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ height: 100, marginTop: 20, flex: 1, marginLeft: -30 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {res.resName.split("-")[0]}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.resCard}>
          <View style={styles.imageHolder}>
            <Image source={{ uri: res.resUrl }} style={styles.image} />
          </View>
          <View style={styles.resInfo}>
            <View style={styles.placeDetail}>
              <MaterialIcons name="place" size={18} />
              <Text style={{ paddingHorizontal: 15 }} ellipsizeMode={'tail'}
                numberOfLines={1}>{res.resAddress}</Text>
            </View>
            <View style={styles.placeDetail}>
              <MaterialCommunityIcons name="calendar-clock" size={18} />
              <Text style={{ paddingHorizontal: 15 }}>{res.openHours}</Text>
            </View>
            <View style={styles.placeDetail}>
              <MaterialIcons name="attach-money" size={18} />
              <Text style={{ paddingHorizontal: 15 }}>{res['Price-range']}</Text>
            </View>
          </View>
          <Text style={styles.menuText}>Menu</Text>
          <View style={styles.menuCard}>
            <MenuItem menu={menu} />
          </View>
          <LinearGradient
            colors={['#ED4264', '#FBD786']}
            style={styles.actionCard}
            //  Linear Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <TouchableOpacity style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Order Food
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 2,
                backgroundColor: 'white',
                height: 30,
                opacity: 0.5,
              }}
            />
            <TouchableOpacity style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Book Place
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  resCard: {
    flex: 1,
    width: width - 50,
    backgroundColor: 'white',
    marginHorizontal: 25,
    marginTop: -90,
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  banner: {
    height: 170,
    alignItems: 'center',
    flexDirection: "row"
  },
  imageHolder: {
    flex: 1.2,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  resInfo: {
    height: 120,
  },
  placeDetail: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  menuCard: {
    flex: 2,
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: -10,
  },
  itemCard: {
    height: 150,
    width: width - 80,
    backgroundColor: 'white',
    marginLeft: 15,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
  },
  actionCard: {
    marginTop: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
