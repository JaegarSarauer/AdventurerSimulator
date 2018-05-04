import React from 'react';
import { Button, View, Text, StyleSheet, Image} from 'react-native';
import {USER, User} from '../state/User'; 
import * as ITEM from '../def/Item';

export default class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: {},
    };
    this.bankToken = null;
  }

  componentWillMount() {
    this.bankToken = USER.bank.watch((bank) => {
      this.setState({bank});
    })
  }

  componentWillUnmount() {
    this.bankToken.stop();
  }

  render() {
    if (this.state.bank.length === 0)
      return (
        <View>
          <Text style={styles.centerText}>You have no items!</Text>
          <Text style={styles.centerText}>Tell some adventurers to go to the bank.</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        {Object.keys(this.state.bank).map(id =>
          <View key={id} style={styles.item}>
            <Text style={styles.amount}>{this.state.bank[id].amount}</Text>
            <Image resizeMode='contain' style={styles.icon} source={ITEM.getIconById(id)}/>
            <Text style={styles.text}>{ITEM.getNameById(id)}</Text>
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
    backgroundColor: 'brown',
  },
  item: {
    flex: 1,
    margin: 8,
    flexDirection: 'column',
    minWidth: 100,
    width: 100,
    maxWidth: 100,
    minHeight: 100,
    height: 100,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: '10%',
    flex: 1,
    width: '100%',
    height: 'auto',
    opacity: 1,
  },
  amount: {
    flex: 2,
    fontSize: 18,
    position: 'absolute',
    zIndex: 100,
    right: 2,
    top: 2,
    opacity: 1,
    color: 'yellow',
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