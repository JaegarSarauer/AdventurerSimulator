import React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import {USER, User} from '../state/User';

export default class PlayerHeader extends React.Component {

  showInventory() {
    this.props.navigation.navigate('Inventory', { title: 'Inventory' })
  }

  showSkills() {
    this.props.navigation.navigate('Skills', { title: 'Skills' })
  }

  showShop() {
    this.props.navigation.navigate('Shop', { title: 'Shop' })
  }

  showActivities() {
    this.props.navigation.navigate('Activities', { title: 'Activities' })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{USER.players[USER.viewingPlayer].name + ' (Level 3)'}</Text>
        <Text>{'Current Action: ' + USER.players[USER.viewingPlayer].activity.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
    height: 80,
    maxHeight: 80,
    width: '100%',
  },
});
