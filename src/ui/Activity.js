import React from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {User, USER} from '../state/User'; 
import { ITEM } from '../def/Item';
import { SKILL } from '../def/Skill';
import Float from './Float';

export default class Activity extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.props.onPress()}>
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.subText}>{this.props.subTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightblue'
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '50%',
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '50%',
  }
})