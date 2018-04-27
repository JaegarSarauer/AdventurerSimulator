import React from 'react';
import { Button, View, Text, StyleSheet, Modal, Image} from 'react-native';
import {USER, User} from '../state/User'; 
import { ITEM } from '../def/Item';

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSellModal: false,
      modalItem: null,
    };
  }

  sellItem(item, amount) {
    amount = Math.min(amount, USER.players[USER.viewingPlayer].getItemAmount(item));
    if (amount === 0) {
      this.setState({showSellModal: false});
      return;
    }
    USER.players[USER.viewingPlayer].removeItem(item, amount);
    USER.players[USER.viewingPlayer].addItem(ITEM.Coins, amount * item.value);
    this.setState({
      showSellModal: false,
    });
  }

  showBuyItems() {
    this.props.navigation.navigate('ShopBuy', { title: 'Buy Items' })
  }

  showSellItems() {
    this.props.navigation.navigate('ShopSell', { title: 'Sell Items' })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={modal.buttonContainer}>
            <Button style={modal.button} title='Buy Items' onPress={() => {this.showBuyItems()}}/>
        </View>
        <View style={modal.buttonContainer}>
            <Button style={modal.button} title='Sell Items' onPress={() => {this.showSellItems()}}/>
        </View>
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