import React from 'react';
import { Button, View, Text, StyleSheet, Image, Modal} from 'react-native';
import {User, USER} from '../state/User'; 
import * as ITEM from '../def/Item';
import PlayerHeader from './PlayerHeader';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeopsitModal: false,
      modalItem: null,
      items: {},
    };
    this.itemsToken = null;
  }

  componentWillMount() {
    this.itemsToken = USER.getCurrentPlayer().items.watch((items) => {
      this.setState({items});
    })
  }

  componentWillUnmount() {
    this.itemsToken.stop();
  }

  depositItem(item, amount) {
    USER.getCurrentPlayer().depositItem(item.id, amount);
    this.setState({
      showDeopsitModal: false,
      modalItem: null,
    });
  }

  render() {
    if (this.state.items.length === 0)
      return (<PlayerHeader><Text style={styles.centerText}>You have no items!</Text></PlayerHeader>);
    return (
      <PlayerHeader>
        <View style={styles.container}>
          {Object.keys(this.state.items).map(id =>
            <View 
              key={id} 
              style={styles.item}
              onTouchEnd={() => {this.setState({
                showDeopsitModal: true, 
                modalItem: ITEM.getItemById(id),
              })}} 
            >
              <Text style={styles.amount}>{this.state.items[id].amount}</Text>
              <Image resizeMode='contain' style={styles.icon} source={ITEM.getIconById(id)}/>
              <Text style={styles.text}>{ITEM.getNameById(id)}</Text>
            </View>
          )}
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.showDeopsitModal}
            onRequestClose={() => {this.setState({showDeopsitModal: false})}}
          >
              <View style={modal.buttons3}>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Deposit 1' onPress={() => {this.depositItem(this.state.modalItem, 1)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Deposit 5' onPress={() => {this.depositItem(this.state.modalItem, 5)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Deposit 10' onPress={() => {this.depositItem(this.state.modalItem, 10)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Deposit 50' onPress={() => {this.depositItem(this.state.modalItem, 50)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Deposit All Except 1' onPress={() => {this.depositItem(this.state.modalItem, this.state.items[this.state.modalItem.id].amount - 1)}}/>
                  </View>
                  <View style={modal.buttonContainer}>
                      <Button style={modal.button} title='Deposit All' onPress={() => {this.depositItem(this.state.modalItem, this.state.items[this.state.modalItem.id].amount)}}/>
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
  text: {
    flex: 2,
    fontSize: 8,
    position: 'absolute',
    textAlign: 'center',
    bottom: 2,
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