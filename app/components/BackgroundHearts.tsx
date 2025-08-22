import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

const BackgroundHearts: React.FC = () => {
  // Preload your icons in an array
  const backgroundIcons = [
    require("../../assets/images/bgicon1.png"),
    require("../../assets/images/bgicon2.png"),
    require("../../assets/images/bgicon3.png"),
    require("../../assets/images/bgicon4.png"),
    require("../../assets/images/bgicon5.png"),
    require("../../assets/images/bgicon6.png"),
    require("../../assets/images/bgicon7.png"),
    require("../../assets/images/bgicon8.png"),
    require("../../assets/images/bgicon9.png"),
  ];

  // Background hearts animation - 100 hearts with random icons covering full screen
  const backgroundHearts = useRef(
    Array.from({ length: 100 }, () => ({
      animValue: new Animated.Value(Math.random()),
      x: Math.random() * 100, // Full width coverage
      y: Math.random() * 100, // Full height coverage
      delay: Math.random() * 8000,
      icon: backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)],
    }))
  ).current;

  // Background hearts smooth animation
  useEffect(() => {
    backgroundHearts.forEach((heart, index) => {
      const animateHeart = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(heart.animValue, {
              toValue: 1,
              duration: 3000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(heart.animValue, {
              toValue: 0,
              duration: 3000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      setTimeout(() => animateHeart(), heart.delay);
    });
  }, []);

  return (
    <View style={styles.backgroundHearts}>
      {backgroundHearts.map((heart, i) => {
        const opacity = heart.animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.15, 0.5, 0.15],
        });

        const translateY = heart.animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        });

        const scale = heart.animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.6, 1.0, 0.6],
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.backgroundHeart,
              {
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                opacity,
                transform: [{ translateY }, { scale }],
              },
            ]}
          >
            <Image
              source={heart.icon}
              style={styles.backgroundHeartImage}
              resizeMode="contain"
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundHearts: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundHeart: {
    position: "absolute",
    width: 25,
    height: 25,
  },
  backgroundHeartImage: {
    width: "100%",
    height: "100%",
  },
});

export default BackgroundHearts;
