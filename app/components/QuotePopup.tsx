import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuotePopupProps {
  visible: boolean;
  onClose: () => void;
}

const QuotePopup: React.FC<QuotePopupProps> = ({ visible, onClose }) => {
  const [currentQuote, setCurrentQuote] = useState("");
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const sparkleRotation = useRef(new Animated.Value(0)).current;

  const loveQuotes = [
    '💕 "Every love story is beautiful, but ours is my favorite."',
    '🌟 "In all the world, there is no heart for me like yours."',
    '💖 "You are my today and all of my tomorrows."',
    '🌹 "Being deeply loved gives you strength, loving deeply gives you courage."',
    '✨ "I love you not only for what you are, but for what I am when I am with you."',
    '💫 "You are the source of my joy, the center of my world."',
    '🦋 "Together is a wonderful place to be."',
    '🌸 "Love is not just looking at each other, it\'s looking in the same direction."',
    '💝 "You make my heart skip a beat and fill my soul with happiness."',
    '🌺 "In you, I\'ve found the love of my life and my closest truest friend."',
    '💞 "Every day I love you more than yesterday, less than tomorrow."',
    '🌈 "You are my sunshine on a cloudy day."',
    '🎀 "Love is composed of a single soul inhabiting two bodies."',
    '🦄 "You are my happy place, my safe haven, my everything."',
    '🌙 "I choose you, and I\'ll choose you over and over, without pause."',
  ];

  useEffect(() => {
    if (visible) {
      // Get random quote
      const randomQuote =
        loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
      setCurrentQuote(randomQuote);

      // Scale in animation
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Start sparkle rotation
      Animated.loop(
        Animated.timing(sparkleRotation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      scaleAnim.setValue(0);
      sparkleRotation.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const spin = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.popup, { transform: [{ scale: scaleAnim }] }]}
        >
          {/* Decorative sparkles */}
          <View style={styles.sparklesContainer}>
            <Animated.View
              style={[
                styles.sparkle,
                styles.sparkle1,
                { transform: [{ rotate: spin }] },
              ]}
            >
              <Image
                source={require("../../assets/images/bgicon5.png")}
                style={styles.sparkleIcon}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.sparkle,
                styles.sparkle2,
                { transform: [{ rotate: spin }] },
              ]}
            >
              <Image
                source={require("../../assets/images/bgicon8.png")}
                style={styles.sparkleIcon}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Header with heart icons */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/bgicon1.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Love Quote</Text>
            <Image
              source={require("../../assets/images/bgicon1.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </View>

          {/* Quote content */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{currentQuote}</Text>
          </View>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Image
              source={require("../../assets/images/bgicon7.png")}
              style={styles.closeIcon}
              resizeMode="contain"
            />
            <Text style={styles.closeText}>Got it! 💕</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 3,
    borderColor: "#f4d0d0",
    borderStyle: "dashed",
  },
  sparklesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  sparkle1: {
    top: 15,
    right: 15,
  },
  sparkle2: {
    bottom: 15,
    left: 15,
  },
  sparkleIcon: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#be185d",
  },
  quoteContainer: {
    backgroundColor: "rgba(245, 208, 208, 0.5)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#f4d0d0",
    borderStyle: "dashed",
  },
  quoteText: {
    fontSize: 16,
    color: "#831843",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 24,
    fontStyle: "italic",
  },
  closeButton: {
    backgroundColor: "rgba(194, 136, 155, 0.3)",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#c2889b",
    borderStyle: "dashed",
  },
  closeIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#be185d",
  },
});

export default QuotePopup;
