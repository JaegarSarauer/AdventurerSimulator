import React from 'react';
import { Animated, View, StyleSheet} from 'react-native';

export default class Float extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    let icons = this.state.icons;
    for (let i = this.props.count; i < nextProps.count; i++) {
      icons.push(<FloatIcon key={i} floatStart={(Math.random() * 100) - 50}/>);
    }
    this.setState({icons});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.icons.map(i => i)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
})



class FloatIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: new Animated.Value(1), 
      floatStart: props.floatStart,
      float: new Animated.Value(props.floatStart),
    };
  }

  componentDidMount() {
    Animated.timing(           
      this.state.fadeOut,     
      {
        toValue: 0,            
        duration: 1000, 
        delay: 400,      
      }
    ).start();   
    Animated.timing(           
      this.state.float,     
      {
        toValue: this.state.floatStart - 100,            
        duration: 1000,       
      }
    ).start();   
  }

  render() {
    let { fadeOut, float, floatStart } = this.state;
    if (fadeOut.Value == 0)
      return null;
    return (
      <Animated.View style={{
        height: 40,
        width: 40,
        position: 'absolute',
        left: -floatStart,
        top: float,
        backgroundColor: 'red',
        opacity: fadeOut
      }}
      pointerEvents={'none'}>
      </Animated.View>
    );
  }
}