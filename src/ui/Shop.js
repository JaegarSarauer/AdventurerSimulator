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

  render() {
    const items = USER.players[USER.viewingPlayer].items.filter(item => {return item.id !== ITEM.Coins.id});
    if (items.length === 0)
      return (<Text style={styles.centerText}>No items to sell!</Text>);
    return (
      <View style={styles.container}>
        {items.map(item =>
          <View 
            onTouchEnd={() => {this.setState({showSellModal: true, modalItem: item})}} 
            key={item.id} 
            style={styles.item}
          >
            <Image source={item.icon}/>
            <Text style={styles.text}>{item.name + ": " + item.amount}</Text>
          </View>
        )}
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showSellModal}
          onRequestClose={() => {this.setState({showSellModal: false})}}
        >
            <View style={modal.buttons3}>
                <View style={modal.buttonContainer}>
                    <Button style={modal.button} title='Sell 1' onPress={() => {this.sellItem(this.state.modalItem, 1)}}/>
                </View>
                <View style={modal.buttonContainer}>
                    <Button style={modal.button} title='Sell 10' onPress={() => {this.sellItem(this.state.modalItem, 10)}}/>
                </View>
                <View style={modal.buttonContainer}>
                    <Button style={modal.button} title='Sell All' onPress={() => {this.sellItem(this.state.modalItem, this.state.modalItem.amount)}}/>
                </View>
            </View>
        </Modal>
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