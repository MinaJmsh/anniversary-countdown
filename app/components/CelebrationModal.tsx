import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

interface CelebrationModalProps {
  showCelebration: boolean;
  setShowCelebration: (show: boolean) => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
  showCelebration,
  setShowCelebration,
}) => {
  const celebrationScale = useRef(new Animated.Value(0)).current;

  // Celebration animation
  useEffect(() => {
    if (showCelebration) {
      Animated.sequence([
        Animated.timing(celebrationScale, {
          toValue: 1,
          duration: 500,
          easing: Animated.Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.delay(4000),
        Animated.timing(celebrationScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowCelebration(false));
    }
  }, [showCelebration]);

  if (!showCelebration) return null;

  return (
    <Animated.View
      style={[
        styles.celebrationModal,
        { transform: [{ scale: celebrationScale }] },
      ]}
    >
      <View style={styles.celebrationContent}>
        <View style={styles.celebrationIconsRow}>
          <Image
            source={require("../../assets/images/bgicon7.png")}
            style={styles.celebrationIcon}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/images/bgicon1.png")}
            style={styles.celebrationIcon}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/images/bgicon9.png")}
            style={styles.celebrationIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.celebrationTitle}>Happy Anniversary!</Text>
        <Text style={styles.celebrationText}>
          Celebrating another milestone in our love story!
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  celebrationModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  celebrationContent: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  celebrationIconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  celebrationIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  celebrationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#be185d",
    marginBottom: 10,
  },
  celebrationText: {
    fontSize: 14,
    color: "#b3546f",
    textAlign: "center",
  },
});

export default CelebrationModal;
