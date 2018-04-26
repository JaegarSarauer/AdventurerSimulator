import React from 'react';
import { Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {User, USER} from '../state/User'; 

export default class Skills extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={USER.players[USER.viewingPlayer].skills}
          keyExtractor={(item, index) => item.name}
          renderItem={({item}) => 
          <Text 
            style={styles.item}
          >
            {item.name + ": " + item.level + ' (' + item.xp + 'xp)'}
          </Text>
        }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})