import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import Button from './Button';
import { ITEM } from '../def/Item';
import Activity from './Activity';
import PlayerHeader from './PlayerHeader';

export default class Activities extends React.Component {

  visit(newScreen) {
    this.props.navigation.navigate(newScreen, { name: 'Jane' })
  }

  render() {
    return (
      <PlayerHeader>
        <View style={styles.container}>
          <View style={styles.activity}>
            <Button title='Woodcutting' subTitle='Cut some logs' action={() => {this.visit('WoodcuttingActivities')}}/>
          </View>
        </View>
      </PlayerHeader>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   flexDirection: 'row',
   flexWrap: 'wrap',
   alignItems: 'center',
   justifyContent: 'center',
  },
  activity: {
    width: '50%',
    height: '33%'
  },
})