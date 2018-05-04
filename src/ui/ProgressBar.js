import React from 'react';
import {View,} from 'react-native';
import {USER, User} from '../state/User';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{
            width: '100%', 
            height: 20,
            backgroundColor: 'red',
          }}>
          <View style={{
                width: (this.props.progress * 100) + '%', 
                height: 20,
                backgroundColor: 'green',
              }}>
          </View>
      </View>
    );
  }
}