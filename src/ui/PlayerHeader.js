import React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import {USER, User} from '../state/User';

export default class PlayerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      activity: null,
    };
    this.nameToken = null;
    this.activityToken = null;
  }

  componentWillMount() {
    USER.getCurrentPlayer().name.watch((name) => {
      this.setState({name});
    });
    USER.getCurrentPlayer().activity.watch((activity) => {
      console.info(activity)
      this.setState({activity});
    });
  }

  componentWillUnmount() {
    this.nameToken.stop();
    this.activityToken.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name + ' (Level 3)'}</Text>
        <Text>{'Current Action: ' + this.state.activity.name}</Text>
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
