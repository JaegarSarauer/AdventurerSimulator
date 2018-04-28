import React from 'react';
import { Button, View, Text, StyleSheet, Image} from 'react-native';
import {User, USER} from '../state/User'; 

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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

  render() {
    if (this.state.items.length === 0)
      return (<Text style={styles.centerText}>You have no items!</Text>);
    return (
      <View style={styles.container}>
        {this.state.items.map(item =>
          <View key={item.id} style={styles.item}>
            <Image source={item.icon}/>
            <Text style={styles.text}>{item.name + ": " + item.amount}</Text>
          </View>
        )}
      </View>
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