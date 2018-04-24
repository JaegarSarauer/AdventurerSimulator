import React from 'react';
import { Button, View, Text, StyleSheet, FlatList, Modal} from 'react-native';
import {Player, PP} from '../state/Player'; 
import { ITEM } from '../def/Item';

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateList: false,
      showSellModal: false,
      modalItem: null,
    };
  }

  sellItem(item, amount) {
    amount = Math.min(amount, PP.getItemAmount(item));
    if (amount === 0) {
      this.setState({showSellModal: false});
      return;
    }
    PP.removeItem(item, amount);
    PP.addItem(ITEM.Coins, amount * item.value);
    this.setState({
      updateList: !this.state.updateList,
      showSellModal: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={PP.items.filter(item => {return item.id !== ITEM.Coins.id})}
          extraData={this.state.updateList}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => 
          <View onTouchEnd={() => {this.setState({showSellModal: true, modalItem: item})}}>
            <Text 
              style={styles.item}
            >
              {item.name + ": " + item.amount}
            </Text>
          </View>
        }
        />
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showSellModal}
          onRequestClose={() => {this.setState({showSellModal: false})}}
        >
        <View style={styles.buttons3}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title='Sell 1' onPress={() => {this.sellItem(this.state.modalItem, 1)}}/>
        </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title='Sell 10' onPress={() => {this.sellItem(this.state.modalItem, 10)}}/>
        </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title='Sell All' onPress={() => {this.sellItem(this.state.modalItem, this.state.modalItem.amount)}}/>
        </View>
        </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   padding: 8,
   width: '100%',
   backgroundColor: 'green',
  },
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 50,
  },
})