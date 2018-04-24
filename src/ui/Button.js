import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.props.action()}>
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