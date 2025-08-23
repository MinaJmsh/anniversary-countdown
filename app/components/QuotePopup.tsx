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
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkleRotation = useRef(new Animated.Value(0)).current;

  const loveQuotes = [
    // "With you, even silence feels full.",
    "You make the ordinary feel rare.",
    // "I don’t want perfect, I want us.",
    "The best part of my day is knowing it ends with you.",
    "You’re my favorite decision.",
    "I’d choose your hand in a crowd every time.",
    // "Nothing feels as steady as your presence.",
    // "You turn moments into memories without even trying.",
    "You make me want to stay, always.",
    "Every version of me is better next to you.",
    // "You’re the calm in my restless mind.",
    "If I get one lifetime, I’m glad it’s with you.",
    "You make love feel simple.",
    // "The world feels less sharp when you’re near.",
    // "I don’t need more—I just need you.",
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

      // Start floating animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
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
  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.popup, { transform: [{ scale: scaleAnim }] }]}
        >
          {/* Floating decorative elements */}
          <View style={styles.decorativeContainer}>
            <Animated.View
              style={[
                styles.floatingIcon,
                styles.floatingIcon1,
                { transform: [{ translateY: floatY }] },
              ]}
            >
              <Image
                source={require("../../assets/images/bgicon8.png")}
                style={styles.decorativeIcon}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.floatingIcon,
                styles.floatingIcon2,
                { transform: [{ translateY: floatY }] },
              ]}
            >
              <Image
                source={require("../../assets/images/bgicon8.png")}
                style={styles.decorativeIcon}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Header with heart icons */}
          <View style={styles.header}>
            {/* <Image
              source={require("../../assets/images/bgicon1.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            /> */}
            <Text style={styles.title}>Cheezy Love Quote</Text>
            {/* <Image
              source={require("../../assets/images/bgicon1.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            /> */}
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
            <Text style={styles.closeText}>Got it!</Text>
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
    // backgroundColor: "rgba(245, 208, 208, 0.5)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    // borderWidth: 2,
    // borderColor: "#f4d0d0",
    // borderStyle: "dashed",
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
  decorativeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingIcon: {
    position: "absolute",
    width: 35,
    height: 35,
  },
  floatingIcon1: {
    top: 20,
    right: 20,
  },
  floatingIcon2: {
    bottom: 20,
    left: 20,
  },
  decorativeIcon: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
});

export default QuotePopup;
