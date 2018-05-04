import React from 'react';
import { Button, View, Text, StyleSheet, Modal, Image, ToastAndroid} from 'react-native';
import {USER, User} from '../state/User'; 
import * as ITEM from '../def/Item';
import PlayerHeader from './PlayerHeader';

export const SHOP_BUY_MULITPLIER = 3;

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBuyModal: false,
      modalItem: null,
      shopStock: {
        1: {
          amount: 10
        }, 
        7: {
          amount: 10
        }, 
        8: {
          amount: 10
        }, 
        9: {
          amount: 10
        }
      }, //id and amount
    };
  }

  buyItem(item, amount) {
    let cost = item.value * SHOP_BUY_MULITPLIER;
    let maxAmount = Math.min(amount, Math.floor(USER.getCurrentPlayer().getItemAmount(0) / cost)); //how many you want vs can afford.
    let totalCost = item.value * SHOP_BUY_MULITPLIER * maxAmount;
    if (maxAmount <= 0) {
      ToastAndroid.show('Not enough coins!', ToastAndroid.SHORT);
      this.setState({
        showBuyModal: false,
        modalItem: null
      });
      return;
    } 
    USER.getCurrentPlayer().removeItem(0, totalCost);
    USER.getCurrentPlayer().addItem(item.id, maxAmount);
    this.setState({
      showBuyModal: false,
      modalItem: null,
    });
  }

  render() {
    if (Object.keys(this.state.shopStock).length === 0)
      return (<PlayerHeader><Text style={styles.centerText}>No items for sale!</Text></PlayerHeader>);
    return (
      <PlayerHeader>
        <View style={styles.container}>
          {Object.keys(this.state.shopStock).map(id =>
            <View 
              onTouchEnd={() => {
                this.setState({
                  showBuyModal: true, 
                  modalItem: ITEM.getItemById(id)
                })
              }} 
              key={id} 
              style={styles.item}
            >
              <Text style={styles.amount}>{ITEM.getValueById(id) * SHOP_BUY_MULITPLIER + " coins"}</Text>
              <Image resizeMode='contain' style={styles.icon} source={ITEM.getIconById(id)}/>
              <Text style={styles.text}>{ITEM.getNameById(id)}</Text>
            </View>
          )}
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.showBuyModal}
            onRequestClose={() => {this.setState({showBuyModal: false})}}
          >
              <View style={modal.buttons3}>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Buy 1' onPress={() => {this.buyItem(this.state.modalItem, 1)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Buy 5' onPress={() => {this.buyItem(this.state.modalItem, 5)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Buy 10' onPress={() => {this.buyItem(this.state.modalItem, 10)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Buy 50' onPress={() => {this.buyItem(this.state.modalItem, 50)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Buy All' onPress={() => {this.buyItem(this.state.modalItem, 2147483647)}}/>
                  </View>
              </View>
          </Modal>
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