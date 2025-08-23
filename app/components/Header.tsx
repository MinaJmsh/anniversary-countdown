import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

const Header: React.FC = () => {
  const heartScale = useRef(new Animated.Value(1)).current;
  // const sparkleRotation = useRef(new Animated.Value(0)).current;
  const floatingHeart = useRef(new Animated.Value(0)).current;

  // Heart beating animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Floating heart animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingHeart, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatingHeart, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // sandglass rotation animation
  const sparkleRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const frames = 24; // number of steps in one spin
    const duration = 180; // ms per frame (adjust speed)

    Animated.loop(
      Animated.sequence(
        Array.from({ length: frames }, (_, i) =>
          Animated.timing(sparkleRotation, {
            toValue: i + 1,
            duration,
            easing: Easing.step0,
            useNativeDriver: true,
          })
        )
      )
    ).start();
  }, []);

  const frames = 24;
  const spin = sparkleRotation.interpolate({
    inputRange: Array.from({ length: frames + 1 }, (_, i) => i),
    outputRange: Array.from(
      { length: frames + 1 },
      (_, i) => `${(360 / frames) * i}deg`
    ),
  });

  return (
    <View style={styles.header}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Image
          source={require("../../assets/images/sandglass.png")}
          style={styles.sparkleImage}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.title}>map anniversaries</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#be185d",
    marginTop: 10,
  },
  sparkleImage: {
    width: 80,
    height: 80,
  },
});

export default Header;
