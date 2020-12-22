import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LikeScreen from '../screens/LikeScreen';
import SearchScreen from '../screens/SearchScreen';
import MapScreen1 from '../screens/MapScreen1';
import MapScreen2 from '../screens/MapScreen2';
import MapScreen3 from '../screens/MapScreen3';
import ChooseType from '../screens/ChooseType';
import MenuScreen from '../screens/MenuScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Like: LikeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Type: ChooseType,
    Map1: MapScreen1,
    Map2: MapScreen2,
    Links: LinksScreen,
    Search:SearchScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Plans',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'} />
  ),
};

LinksStack.path = '';

const LikeStack = createStackNavigator(
  {
    Like: LikeScreen,
    Map3: MapScreen3,
  },
  config
);

LikeStack.navigationOptions = {
  tabBarLabel: 'Like',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
  ),
};

LikeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  LikeStack,
});

tabNavigator.path = '';

export default tabNavigator;
