import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, Image,TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const { height, width } = Dimensions.get('window');

export default PlaceCard = (props) => {
  let item = props.item;
  let index = props.index;
  return (
    <View style={styles.famousPlaceCard} key={index} >
      <View style={{ flex: 2,overflow: 'hidden',
                    flexDirection: 'row', }}>
        <Image source={{ uri: item.url }}
          style={styles.image} />
        <TouchableOpacity style={{ marginLeft: -35, padding: 5, height: 30 }} onPress={() => { console.log("press") }}>
          <Entypo name="heart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.seperator}></View>

      <View style={{ flex: 2, backgroundColor: '#F9F9F9' }}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.cityInfor}>{item.city}</Text>
        <View style={styles.placeDetail}>
          <MaterialIcons name="place" size={18} />
          <Text style={{ paddingHorizontal: 15 }}>{item.address}</Text>
        </View>
        <View style={styles.placeDetail}>
          <MaterialCommunityIcons name="calendar-clock" size={18} />
          <Text style={{ paddingHorizontal: 15 }}>{item.openHours}</Text>
        </View>
        <View style={styles.placeDetail}>
          <MaterialIcons name="phone" size={18} />
          <Text style={{ paddingHorizontal: 15 }}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.seperator}></View>

      <LinearGradient
        colors={['#ED4264', '#FBD786']}
        style={styles.countCard}
        //  Linear Gradient 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.countGroup}>
          <Text style={styles.txtCount}>{item.comments}</Text>
          <Text style={styles.countLabel}>Comments</Text>
        </View>
        <View style={styles.countGroup}>
          <Text style={styles.txtCount}>{item.visitors}</Text>
          <Text style={styles.countLabel}>Checkins</Text>
        </View>
        <View style={styles.countGroup}>
          <Text style={styles.txtCount}>{item.rating}</Text>
          <Text style={styles.countLabel}>Rating</Text>
        </View>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  famousPlaceCard: {
    height: 400,
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
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

});