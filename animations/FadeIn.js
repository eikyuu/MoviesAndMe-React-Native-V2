import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

const FadeIn = (props) => {
  const fadeAnim = useRef(new Animated.Value(Dimensions.get("window").width))
    .current;

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  });

  return (
    <Animated.View
      style={[
        styles.fadingContainer,
        {
          left: fadeAnim, // Bind opacity to animated value
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fadingContainer: {},
});
export default FadeIn;
