import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  const surprises = [
    "💕 Leave a sweet note in their favorite book",
    "🌟 Plan a stargazing night together",
    "☕ Make their favorite drink and surprise them",
    "📸 Create a photo collage of your memories",
    "🎵 Make a playlist of songs that remind you of them",
    "🌸 Pick flowers from your garden (or buy some!)",
    "💌 Write them a handwritten love letter",
    "🍰 Bake their favorite dessert together",
    "🌅 Watch the sunrise or sunset together",
    "💭 Share three things you love about them today",
    "🎨 Draw or paint something special for them",
    "🍕 Order from the restaurant of your first date",
    "🎁 Hide little love notes around the house",
    "💃 Have a dance party in your living room",
    "📚 Read a book together chapter by chapter",
  ];

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

    // Random surprise
    const randomSurprise =
      surprises[Math.floor(Math.random() * surprises.length)];
    setCurrentSurprise(randomSurprise);
    setShowSurprise(true);

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
        <Image
          source={require("../../assets/images/bgicon4.png")}
          style={styles.buttonIcon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Surprise Me!</Text>
        <Text style={styles.buttonSubtext}>cheezy love quotes</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 0.48, // half of row
    aspectRatio: 1, // square
  },
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  buttonIcon: {
    width: 32,
    height: 32,
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
