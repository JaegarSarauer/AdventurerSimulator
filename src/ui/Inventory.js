import React from 'react';
import { Button, View, Text, StyleSheet, Image} from 'react-native';
import {Player, PP} from '../state/Player'; 

export default class Inventory extends React.Component {
  render() {
    if (PP.items.length === 0)
      return (<Text style={styles.centerText}>You have no items!</Text>);
    return (
      <View style={styles.container}>
        {PP.items.map(item =>
          <View key={item.id} style={styles.item}>
            <Image source={item.icon}/>
            <Text style={styles.text}>{item.name + ": " + item.amount}</Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  item: {
    flex: 1,
    height: 40,
    padding: 4,
    margin: 4,
    backgroundColor: '#d68807',
    flexDirection: 'row',
    width: '50%',
    maxWidth: '50%',
    alignItems: 'center',
  },
  text: {
      paddingLeft: 10,
    fontSize: 18,
  },
  centerText: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
  }
})