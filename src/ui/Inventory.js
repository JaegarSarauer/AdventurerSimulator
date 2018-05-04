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
              <Image source={ITEM.getIconById(id)}/>
              <Text style={styles.text}>{ITEM.getNameById(id) + ": " + this.state.items[id].amount}</Text>
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