import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, Image,ActivityIndicator,TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Carousel from 'react-native-snap-carousel';
import * as Font from 'expo-font';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";
import { PlaceToGoWith } from "../utilis/HomeScreen/placeToGoWith";
import PlaceCard from "../components/Place"
import Place from "../components/Place1"
 
const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];



const { height, width } = Dimensions.get('window');

export default class Landmarks extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: FamousPlaceData,
      goWith: PlaceToGoWith[0],
      placeName:FamousPlaceData[0].name,
      loading: true,
      selectedIndex: 0,
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  setIndex = props => {
    console.log(props)
    this.setState({ selectedIndex: props,placeName:FamousPlaceData[props].name,goWith: PlaceToGoWith[props] },()=>{
      console.log(this.state.goWith)
    })
    
  }

  _renderItem({ item, index }) {
    let today = new Date();
    let year = today.getFullYear();
    let age = year - item.foundationYear;
    return (
      <PlaceCard item={item} index={index}></PlaceCard>
    );
  }
  _renderItem2({ item, index }) {
    return (
      <Place item={item} index={index}></Place>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "white",
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#ED4264" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => { this._carousel1 = c; }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width - 60}
          itemHeight={400}
          onMomentumScrollEnd={this.setSelectedIndex}
          onSnapToItem={(index) => this.setIndex(index)}
        />
        <Text style={styles.mainText}>Place to go with</Text>
        <Text style={styles.subText}>
          Recommended to go after visiting {this.state.placeName}
        </Text>
        <View style={{ marginTop: -10 }}>
          <Carousel
            ref={(c) => { this._carousel2 = c; }}
            data={this.state.goWith}
            renderItem={this._renderItem2}
            sliderWidth={width}
            itemWidth={width - 60}
            itemHeight={250}
            onMomentumScrollEnd={this.setSelectedIndex}
            layout={'tinder'}
          />

        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  mainText:{
    fontWeight: '700',
    fontSize: 22,
    paddingHorizontal: 20,
  },
  subText:{ fontWeight: '100', paddingHorizontal: 20, marginTop: 10 },

});
