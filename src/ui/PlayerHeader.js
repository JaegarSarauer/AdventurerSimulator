import React from 'react';
import { Button, View, Text, StyleSheet,} from 'react-native';
import {USER, User} from '../state/User';
import ProgressBar from './ProgressBar';
import { TICK_TIME } from '../game/GameState';

export default class PlayerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      activity: null,
      items: {},
      skills: {},
    };
    this.nameToken = null;
    this.activityToken = null;
    this.itemsToken = null;
  }

  componentWillMount() {
    this.nameToken = USER.getCurrentPlayer().name.watch((name) => {
      this.setState({name});
    });
    this.activityToken = USER.getCurrentPlayer().activity.watch((activity) => {
      this.setState({activity});
    });
    this.itemsToken = USER.getCurrentPlayer().items.watch((items) => {
      this.setState({items});
    });
  }

  componentWillUnmount() {
    this.nameToken.stop();
    this.activityToken.stop();
    this.itemsToken.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name + ' : Total Level ' + USER.getCurrentPlayer().totalLevel.get()}</Text>
        {this.state.activity != null &&
          <Text>{'Current Action: ' + this.state.activity.name}</Text>
        }
        {this.state.activity != null &&
          <ProgressBar progress={this.state.activity.progress / this.state.activity.maxProgress} />
        }
        <Text>{'Coins: ' + USER.getCurrentPlayer().getItemAmount(0)}</Text>
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
