import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface CardProps {
  styles: StyleProp<ViewStyle>
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <View style={[styles.card, props.styles]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  }
});

export default Card