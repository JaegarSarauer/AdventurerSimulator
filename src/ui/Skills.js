import React from 'react';
import { Button, View, Text, StyleSheet, FlatList} from 'react-native';
import {User, USER} from '../state/User'; 

export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
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
      <View style={styles.container}>
        {this.state.skills.map(skill => 
          <Text 
            key={skill.name}
            style={styles.item}
          >
            {skill.name + ": " + skill.level + ' (' + skill.xp + 'xp)'}
          </Text>
        )}
      </View>
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