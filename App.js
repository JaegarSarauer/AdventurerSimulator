import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import Home from './src/ui/Home';
import Inventory from './src/ui/Inventory';
import Skills from './src/ui/Skills';
import Shop from './src/ui/Shop';
import Player from './src/ui/Player';
import Bank from './src/ui/Bank';
import Activities from './src/ui/Activities';
import WoodcuttingActivities from './src/ui/activities/WoodcuttingActivities';
import { StackNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default App = StackNavigator({
    Home: { screen: Home },
    Player: { screen: Player },
    Bank: { screen: Bank },
    Inventory: { screen: Inventory },
    Skills: { screen: Skills },
    Shop: { screen: Shop },
    Activities: { screen: Activities },
    WoodcuttingActivities: { screen: WoodcuttingActivities },
}, { headerMode: 'screen' });