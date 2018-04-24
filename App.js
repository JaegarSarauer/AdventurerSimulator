import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import Home from './src/ui/Home';
import Inventory from './src/ui/Inventory';
import Skills from './src/ui/Skills';
import Shop from './src/ui/Shop';
import { StackNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default App = StackNavigator({
    Home: { screen: Home },
    Inventory: { screen: Inventory },
    Skills: { screen: Skills },
    Shop: { screen: Shop },
}, { headerMode: 'screen' });