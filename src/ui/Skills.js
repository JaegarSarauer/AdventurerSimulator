import React from 'react';
import { Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {User, USER} from '../state/User'; 
import * as SKILL from '../def/Skill';
import PlayerHeader from './PlayerHeader';

export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: {},
    };
    this.skillsToken = null;
  }

  componentWillMount() {
    this.skillsToken = USER.getCurrentPlayer().skills.watch((skills) => {
      this.setState({skills});
    })
  }

  componentWillUnmount() {
    this.skillsToken.stop();
  }

  render() {
    return (
      <PlayerHeader>
        <View style={styles.container}>
          {Object.keys(this.state.skills).map(id => 
            <Text 
              key={id}
              style={styles.item}
            >
              {SKILL.getNameById(id) + ": " + this.state.skills[id].level + ' (' + this.state.skills[id].xp + 'xp)'}
            </Text>
          )}
        </View>
      </PlayerHeader>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})