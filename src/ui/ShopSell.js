import React from 'react';
import { Button, View, Text, StyleSheet, Modal, Image} from 'react-native';
import {USER, User} from '../state/User'; 
import * as ITEM from '../def/Item';
import PlayerHeader from './PlayerHeader';

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSellModal: false,
      modalItem: null,
      items: {},
    };
    this.itemsToken = null;
  }

  componentWillMount() {
    this.itemsToken = USER.getCurrentPlayer().items.watch(items => {
      this.setState({items});
    })
  }

  componentWillUnmount() {
    this.itemsToken.stop();
  }

  sellItem(item, amount) {
    amount = Math.min(amount, USER.getCurrentPlayer().getItemAmount(item.id));
    if (amount === 0) {
      this.setState({
        showSellModal: false,
        modalItem: null
      });
      return;
    }
    USER.getCurrentPlayer().removeItem(item.id, amount);
    USER.getCurrentPlayer().addItem(0, amount * item.value);
    this.setState({
      showSellModal: false,
      modalItem: null,
    });
  }

  render() {
    const items = Object.keys(this.state.items).filter(id => {
      return id != 0;
    });
    if (items.length === 0)
      return (<PlayerHeader><Text style={styles.centerText}>No items to sell!</Text></PlayerHeader>);
    return (
      <PlayerHeader>
        <View style={styles.container}>
          {(items).map(id =>
            <View 
              onTouchEnd={() => {this.setState({showSellModal: true, modalItem: ITEM.getItemById(id)})}} 
              key={id} 
              style={styles.item}
            >
              <Image source={ITEM.getIconById(id)}/>
              <Text style={styles.text}>{ITEM.getNameById(id) + ": " + this.state.items[id].amount}</Text>
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
                      <Button style={modal.button} title='Sell 5' onPress={() => {this.sellItem(this.state.modalItem, 5)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Sell 10' onPress={() => {this.sellItem(this.state.modalItem, 10)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Sell 50' onPress={() => {this.sellItem(this.state.modalItem, 50)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Sell All Except 1' onPress={() => {this.sellItem(this.state.modalItem, this.state.items[this.state.modalItem.id].amount - 1)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Sell All' onPress={() => {this.sellItem(this.state.modalItem, this.state.items[this.state.modalItem.id].amount)}}/>
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