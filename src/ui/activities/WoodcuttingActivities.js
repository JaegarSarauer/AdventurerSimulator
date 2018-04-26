import React from 'react';
import { Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {USER, User} from '../../state/User'; 
import { ITEM } from '../../def/Item';
import { SKILL } from '../../def/Skill';
import * as IMAGE from '../../def/Image';
import Activity from './../Activity';
import Float from '../Float';

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
            maxProgress={8}
            reward={{item: ITEM.Logs, amount: 1, xp: 5}}
            onFloat={(type, count) => this.addFloat('tree', type, count)}
          />
          <Float count={this.state.floattreeloot} icon={IMAGE.ITEMS.Logs}/>
          <Float count={this.state.floattreeprogress} icon={IMAGE.ICONS.Smash}/>
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 15) && 
          <View style={styles.activity}>
          <Activity 
            title='Oak Tree'
            maxProgress={32}
            reward={{item: ITEM.OakLogs, amount: 1, xp: 15}}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 30) && 
          <View style={styles.activity}>
          <Activity 
            title='Willow Tree'
            maxProgress={128}
            reward={{item: ITEM.WillowLogs, amount: 1, xp: 30}}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 45) && 
          <View style={styles.activity}>
          <Activity 
            title='Maple Tree'
            maxProgress={512}
            reward={{item: ITEM.MapleLogs, amount: 1, xp: 55}}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 60) && 
          <View style={styles.activity}>
          <Activity 
            title='Yew Tree'
            maxProgress={2048}
            reward={{item: ITEM.YewLogs, amount: 1, xp: 80}}
          />
          </View>
        }
        {USER.players[USER.viewingPlayer].hasLevel(SKILL.Woodcutting, 80) && 
          <View style={styles.activity}>
          <Activity 
            title='Arbutus Tree'
            maxProgress={10240}
            reward={{item: ITEM.ArbutusLogs, amount: 1, xp: 120}}
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