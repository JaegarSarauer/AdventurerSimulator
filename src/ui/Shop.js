import React from 'react';
import { Button, View, Text, StyleSheet, Modal, Image} from 'react-native';
import {USER, User} from '../state/User'; 
import { ITEM } from '../def/Item';
import PlayerHeader from './PlayerHeader';

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSellModal: false,
      modalItem: null,
    };
  }

  showBuyItems() {
    this.props.navigation.navigate('ShopBuy', { title: 'Buy Items' })
  }

  showSellItems() {
    this.props.navigation.navigate('ShopSell', { title: 'Sell Items' })
  }

  render() {
    return (
      <PlayerHeader>
        <View style={styles.container}>
          <View style={modal.buttonContainer}>
              <Button style={modal.button} title='Buy Items' onPress={() => {this.showBuyItems()}}/>
          </View>
          <View style={modal.buttonContainer}>
              <Button style={modal.button} title='Sell Items' onPress={() => {this.showSellItems()}}/>
          </View>
        </View>
      </PlayerHeader>
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
    centerText: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
    }
})

const modal = StyleSheet.create({
    buttons3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
    },
    button: {
        padding: 16,
        width: '100%',
    },
})