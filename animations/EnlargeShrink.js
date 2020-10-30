import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const EnlargeShrink = (props) => {
  const EnlargeAnim = useRef(new Animated.Value(0)).current;

  const _getSize = () => {
    if (props.shouldEnLarge) {
      return 40;
    }
    return 80;
  };

  console.log(props.shouldEnLarge);

  Animated.spring(EnlargeAnim, {
    toValue: _getSize(),
    useNativeDriver: false,
  }).start();

  return (
    <Animated.View style={{ width: EnlargeAnim, height: EnlargeAnim }}>
      {props.children}
    </Animated.View>
  );
};

export default EnlargeShrink;
