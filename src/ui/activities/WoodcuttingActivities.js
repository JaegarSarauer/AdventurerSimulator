import React from 'react';
import { Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {USER, User} from '../../state/User'; 
import { ITEM } from '../../def/Item';
import { SKILL } from '../../def/Skill';
import * as IMAGE from '../../def/Image';
import Activity from './../Activity';
import Float from '../Float';
import * as Activities from '../../def/Activity';

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
      <View style={styles.container}>
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 1) && 
          <View style={styles.activity}>
          <Activity 
            title='Tree'
            onPress={() => {
              USER.players[USER.viewingPlayer].setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.TREE, USER.viewingPlayer));
            }}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 15) && 
          <View style={styles.activity}>
          <Activity 
            title='Oak Tree'
            onPress={() => {
              USER.players[USER.viewingPlayer].setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.OAKTREE, USER.viewingPlayer));
            }}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 30) && 
          <View style={styles.activity}>
          <Activity 
            title='Willow Tree'
            onPress={() => {
              USER.players[USER.viewingPlayer].setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.WILLOWTREE, USER.viewingPlayer));
            }}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 45) && 
          <View style={styles.activity}>
          <Activity 
            title='Maple Tree'
            onPress={() => {
              USER.players[USER.viewingPlayer].setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.MAPLETREE, USER.viewingPlayer));
            }}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 60) && 
          <View style={styles.activity}>
          <Activity 
            title='Yew Tree'
            onPress={() => {
              USER.players[USER.viewingPlayer].setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.YEWTREE, USER.viewingPlayer));
            }}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 80) && 
          <View style={styles.activity}>
          <Activity 
            title='Arbutus Tree'
            onPress={() => {
              USER.players[USER.viewingPlayer].setActivity(Activities.WOODCUTTING.action(Activities.WOODCUTTING.ARBUTUSTREE, USER.viewingPlayer));
            }}
          />
          </View>
        }
      </View>
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