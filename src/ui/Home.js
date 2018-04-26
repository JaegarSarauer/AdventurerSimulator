import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Modal} from 'react-native';
import {GAMESTATE, GameState} from '../game/GameState';
import {USER, User} from '../state/User';
import {Bank} from './Bank';
import {Player} from './Player';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBuyPlayer: false,
      newPlayerName: 'Adventurer ' + USER.totalPlayers + 1,
    }
  }

  // static navigationOptions = ({ navigation }) => ({
  //  // title: '${navigation.state.params.title}',
  //       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
  //       headerStyle:{
  //           backgroundColor:'white',
  //       },
  // });

  componentDidMount() {
    USER.viewingPlayer = -1;
  }

  showBuyPlayer() {
    this.setState({showBuyPlayer: true});
  }
  
  buyPlayer() {
    if (GAMESTATE.buyPlayer(this.state.newPlayerName))
      this.setState({showBuyPlayer: false})
  }

  showBank() {
    this.props.navigation.navigate('Bank', { title: 'Bank' })
  }

  showPlayer(playerID) {
    USER.viewingPlayer = playerID;
    this.props.navigation.navigate('Player', { title: 'Adv. ' + USER.players[playerID].name })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title={'Buy An Adventurer'} onPress={() => this.showBuyPlayer()}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title='Bank' onPress={() => this.showBank()}/>
        </View>
        {USER.players.map((player, i) => 
          <View key={i} style={styles.buttonContainer}>
            <Button style={styles.button} title={'View ' + player.name} onPress={() => this.showPlayer(i)}/>
          </View>
        )}

        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showBuyPlayer}
          onRequestClose={() => {this.setState({showBuyPlayer: false})}}
        >
            <View style={modal.modalContent}>
                <Text>Enter a name:</Text>
                <TextInput 
                  autoCorrect={false} 
                  maxLength={20} 
                  editable  
                  onChangeText={(newPlayerName) => this.setState({newPlayerName})}
                  value={this.state.newPlayerName}
                  />
                <Text>{'Cost: ' + (GAMESTATE.getPlayerCost() === 0 ? 'FREE' : GAMESTATE.getPlayerCost() + ' coins')}</Text>
                <Button style={modal.button} title='Buy New Adventurer' onPress={() => {this.buyPlayer()}}/>
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
  },
  button: {
    width: '100%',
    height: 60,
  }
});


const modal = StyleSheet.create({
  modalContent: {
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