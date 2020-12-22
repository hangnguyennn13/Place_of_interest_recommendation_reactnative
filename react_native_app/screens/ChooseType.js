import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

export default class ChooseType extends React.Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.chooseHolder} onPress={()=>this.props.navigation.navigate('Map1',{type:0})}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ED4264', paddingHorizontal: 20 }}>Find Place Near You</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.chooseHolder} onPress={()=>this.props.navigation.navigate('Map1',{type:1})}>
                    <LinearGradient
                        colors={['#ED4264', '#FBD786']}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        //  Linear Gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', paddingHorizontal: 20, paddingVertical: 20 }}>Make Your Own Plan</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

}
ChooseType.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        flexDirection:'row'
      },
    chooseHolder:{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }
});