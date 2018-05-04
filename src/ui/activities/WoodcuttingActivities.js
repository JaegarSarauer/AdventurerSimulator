import React from 'react';
import { Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {USER, User} from '../../state/User'; 
import { ITEM } from '../../def/Item';
import { SKILL } from '../../def/Skill';
import * as IMAGE from '../../def/Image';
import Activity from './../Activity';
import Float from '../Float';
import * as Activities from '../../def/Activity';
import PlayerHeader from '../PlayerHeader';

export default class WoodcuttingActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floattreeloot: 0,
      floattreeprogress: 0, 
    };
  }

  addFloat(id, type, count) {
    let float = this.state['float'+id+type];
    float += count;
    this.setState({['float'+id+type]: float});
  }

  render() {
    return (
      <PlayerHeader>
        <View style={styles.container}>
          {USER.getCurrentPlayer().hasLevel(0, 1) && 
            <View style={styles.activity}>
            <Activity 
              title='Tree'
              onPress={() => {
                USER.getCurrentPlayer().setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.TREE, USER.viewingPlayer.value));
              }}
            />
            </View>
          }
          {USER.getCurrentPlayer().hasLevel(0, 15) && 
            <View style={styles.activity}>
            <Activity 
              title='Oak Tree'
              onPress={() => {
                USER.getCurrentPlayer().setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.OAKTREE, USER.viewingPlayer.value));
              }}
            />
            </View>
          }
          {USER.getCurrentPlayer().hasLevel(0, 30) && 
            <View style={styles.activity}>
            <Activity 
              title='Willow Tree'
              onPress={() => {
                USER.getCurrentPlayer().setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.WILLOWTREE, USER.viewingPlayer.value));
              }}
            />
            </View>
          }
          {USER.getCurrentPlayer().hasLevel(0, 45) && 
            <View style={styles.activity}>
            <Activity 
              title='Maple Tree'
              onPress={() => {
                USER.getCurrentPlayer().setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.MAPLETREE, USER.viewingPlayer.value));
              }}
            />
            </View>
          }
          {USER.getCurrentPlayer().hasLevel(0, 60) && 
            <View style={styles.activity}>
            <Activity 
              title='Yew Tree'
              onPress={() => {
                USER.getCurrentPlayer().setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.YEWTREE, USER.viewingPlayer.value));
              }}
            />
            </View>
          }
          {USER.getCurrentPlayer().hasLevel(0, 80) && 
            <View style={styles.activity}>
            <Activity 
              title='Arbutus Tree'
              onPress={() => {
                USER.getCurrentPlayer().setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.ARBUTUSTREE, USER.viewingPlayer.value));
              }}
            />
            </View>
          }
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