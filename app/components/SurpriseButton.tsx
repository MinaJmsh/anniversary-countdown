import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface SurpriseButtonProps {
  onPress: () => void;
  style?: object;
}
const SurpriseButton: React.FC<SurpriseButtonProps> = ({ onPress, style }) => {
  const [currentSurprise, setCurrentSurprise] = useState("");
  const [showSurprise, setShowSurprise] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowSurprise(false));
    }, 5000);

    // Call the optional prop callback
    if (onPress) onPress();
  };
  return (
    <TouchableOpacity style={[styles.touchable, style]} onPress={handlePress}>
      <ImageBackground
        source={require("../../assets/images/sqrbtn.png")}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="contain" // show full PNG as the button box
      >
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/bgicon4.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Surprise Me!</Text>
          <Text style={styles.buttonSubtext}>cheezy love quotes</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 0.48,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },

  bgImage: {
    width: "100%",
    height: "100%",
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#be185d",
    textAlign: "center",
  },
  buttonSubtext: {
    fontSize: 11,
    color: "#b3546f",
    textAlign: "center",
  },
});
export default SurpriseButton;
