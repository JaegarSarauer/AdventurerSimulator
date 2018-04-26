import React from 'react';
import { Button, View, Text, StyleSheet, Image} from 'react-native';
import {USER, User} from '../state/User'; 

export default class Bank extends React.Component {
  render() {
    if (USER.bank.length === 0)
      return (
        <View>
          <Text style={styles.centerText}>You have no items!</Text>
          <Text style={styles.centerText}>Tell some adventurers to go to the bank.</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        {USER.bank.map(item =>
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
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
  }
})