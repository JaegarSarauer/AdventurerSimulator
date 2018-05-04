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
      console.info('uu', bank)
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
            {console.info(' hey', id)}
            <Image source={ITEM.getIconById(id)}/>
            <Text style={styles.text}>{ITEM.getNameById(id) + ": " + this.state.bank[id].amount}</Text>
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
    margin: '1%',
    backgroundColor: '#d68807',
    flexDirection: 'row',
    width: '48%',
    minWidth: '48%',
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