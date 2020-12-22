import React from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    FlatList,
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
import { FamousPlaceData } from "../utilis/HomeScreen/famousPlace";


const images = [
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const { height, width } = Dimensions.get('window');

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
        };
    }
    componentWillMount = async () => {
        try {
          let menu = await AsyncStorage.getItem('menu');
          menu = JSON.parse(menu)
          this.setState({menu:menu})
          console.log("menuscreen",menu)
        } catch (error) {
          // Error retrieving data
          this.setState({ readyState: false, status: 'Xin lỗi dữ liệu của Pegasus đang gặp lỗi' })
          console.log("Error retrieving data",error)
        }
    
      }

    renderItem = ({ item }) => {
        let rating = 4.5;
        return (
            <View style={styles.itemCard} key={item}>
                <View style={styles.imageHolder}>
                    <Image source={{ uri: item.itemUrl }} style={styles.image} />
                    <TouchableOpacity style={{
                    marginRight: -10,
                    position: 'absolute',
                    padding: 5,
                    height: 20,
                  }}>
                        <MaterialIcons name="add-circle" size={18} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.itemName}</Text>
                    <View style={styles.itemStatus}>
                        <View style={styles.statusView}>
                            <Text style={styles.statusTxt}>Còn</Text>
                        </View>
                        <View style={styles.statusView}>
                            <Text style={styles.statusTxt}>Rẻ</Text>
                        </View>
                    </View>
                    <View style={styles.priceCard}>
                        <MaterialIcons name="attach-money" size={18} />
                        <Text style={styles.priceTxt}>{item.price}</Text>
                    </View>
                </View>

            </View>

        )
    }

    render() {
        let {menu} = this.state
    console.log("menuscreen",menu)
        return(
            <FlatList
                    data={menu}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index) => item.itemUrl+index.toString()}
                />
        );
    }
}

const styles = StyleSheet.create({
    itemCard: {
        backgroundColor: 'white',
        height: 110,
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
    },
    imageHolder: {
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
    addButton:{
        marginRight: -10,
        position: 'absolute',
        padding: 5,
        height: 20,
    },
    itemInfo:{ marginVertical: 10, marginLeft: 15, flex: 0.8 },
    itemName:{
        fontWeight: '700',
        fontSize: 14,
        flex: 1,
    },
    itemStatus:{
        height: 15,
        marginVertical: 5,
        flexDirection: 'row',
    },
    statusView:{
        width: 40,
        borderRadius: 5,
        borderColor: '#ED4264',
        borderWidth: 1,
        marginRight: 5,
    },
    statusTxt:{
        color: '#ED4264',
        fontSize: 10,
        textAlign: 'center',
    },
    priceCard:{ flexDirection: 'row' },
    priceTxt:{ fontSize: 14, paddingHorizontal: 2 },
});
