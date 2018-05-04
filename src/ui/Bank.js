import React from 'react';
import { Button, View, Text, StyleSheet, Image, Modal} from 'react-native';
import {USER, User} from '../state/User'; 
import * as ITEM from '../def/Item';
import PlayerHeader from './PlayerHeader';

export default class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWithdrawModal: false,
      modalItem: null,
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

  withdrawItem(item, amount) {
    USER.getCurrentPlayer().withdrawItem(item.id, amount);
    this.setState({
      showWithdrawModal: false,
      modalItem: null,
    });
  }

  render() {
    let body = null;
    if (this.state.bank.length === 0) {
      body = (
        <View>
          <Text style={styles.centerText}>You have no items!</Text>
          <Text style={styles.centerText}>Tell some adventurers to go to the bank.</Text>
        </View>
      );
    } else {
      body = (
        <View style={styles.container}>
          {Object.keys(this.state.bank).map(id =>
            <View 
              key={id} 
              style={styles.item}
              onTouchEnd={() => {
                if (USER.getCurrentPlayer() != null) {
                  this.setState({
                    showWithdrawModal: true, 
                    modalItem: ITEM.getItemById(id),
                  })
                }
            }} 
            >
              <Text style={styles.amount}>{this.state.bank[id].amount}</Text>
              <Image resizeMode='contain' style={styles.icon} source={ITEM.getIconById(id)}/>
              <Text style={styles.text}>{ITEM.getNameById(id)}</Text>
            </View>
          )}
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.showWithdrawModal}
            onRequestClose={() => {this.setState({showWithdrawModal: false})}}
          >
            <View style={modal.buttons3}>
               <View style={modal.buttonContainer}>
                   <Button style={modal.button} title='Withdraw 1' onPress={() => {this.withdrawItem(this.state.modalItem, 1)}}/>
               </View>
               <View style={modal.buttonContainer}>
                   <Button style={modal.button} title='Withdraw 5' onPress={() => {this.withdrawItem(this.state.modalItem, 5)}}/>
               </View>
               <View style={modal.buttonContainer}>
                   <Button style={modal.button} title='Withdraw 10' onPress={() => {this.withdrawItem(this.state.modalItem, 10)}}/>
               </View>
               <View style={modal.buttonContainer}>
                   <Button style={modal.button} title='Withdraw 50' onPress={() => {this.withdrawItem(this.state.modalItem, 50)}}/>
               </View>
               <View style={modal.buttonContainer}>
                   <Button style={modal.button} title='Withdraw All Except 1' onPress={() => {this.withdrawItem(this.state.modalItem, this.state.bank[this.state.modalItem.id].amount - 1)}}/>
               </View>
               <View style={modal.buttonContainer}>
                   <Button style={modal.button} title='Withdraw All' onPress={() => {this.withdrawItem(this.state.modalItem, this.state.bank[this.state.modalItem.id].amount)}}/>
               </View>
            </View>
          </Modal>
        </View>
      );
    }
    if (USER.getCurrentPlayer() != null) {
      return (
        <PlayerHeader>
          {body}
        </PlayerHeader>
      );
    } else {
      return body;
    }
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