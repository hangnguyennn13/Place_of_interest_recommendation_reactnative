Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.banner}>
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
                    }}>
                    <Entypo name="heart" size={26} color="white" />
                    <View
                        style={{
                            height: 17,
                            width: 22,
                            backgroundColor: 'white',
                            marginLeft: -5,
                            borderRadius: 7.5,
                            borderColor: '#e7625b',
                            borderWidth: 2,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: -3.5,
                                fontWeight: '700',
                            }}>
                            5
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.userInfor}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <View style={styles.detailInfor}>
                        <View style={{ textAlign: 'center', marginTop: 15 }}>
                            <Image
                                source={require('assets/food_final.PNG')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    flex: 1,
                                    resizeMode: 'cover',
                                    overflow: 'hidden',
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.detailInfor}>
                        <View style={{ textAlign: 'center', marginTop: 15 }}>
                            <Image
                                source={require('assets/cup_final.PNG')}
                                style={{
                                    width: 40,
                                    height: 40,
                                    flex: 1,
                                    resizeMode: 'cover',
                                    overflow: 'hidden',
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.detailInfor}>
                        <View
                            style={{
                                textAlign: 'center',
                                marginTop: 15,
                                display: 'flex',
                            }}>
                            <Image
                                source={require('assets/ent_final.PNG')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    flex: 1,
                                    resizeMode: 'cover',
                                    overflow: 'hidden',
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.category}>
                <View style={styles.categoryCard}>
                    <Text style={{ fontWeight: '700', textAlign: 'center' }}>Food</Text>
                </View>
                <View style={styles.categoryCard}>
                    <Text style={{ fontWeight: '700', textAlign: 'center' }}>Drink</Text>
                </View>
                <View style={styles.categoryCard}>
                    <Text style={{ fontWeight: '700', textAlign: 'center' }}>
                        Entertain
                </Text>
                </View>
            </View>
        </View>
    );
};