import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import Home from './src/ui/Home';
import { StackNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default App = StackNavigator({
    Home: { screen: Home },
}, { headerMode: 'screen' });