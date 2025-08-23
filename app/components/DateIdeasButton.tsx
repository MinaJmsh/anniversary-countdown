import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface DateIdeasButtonProps {
  onPress: () => void;
  style?: object;
}

const DateIdeasButton: React.FC<DateIdeasButtonProps> = ({
  onPress,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [currentIdeas, setCurrentIdeas] = useState<string[]>([]);
  const [showIdeas, setShowIdeas] = useState(false);

  const dateIdeas = {
    cozy: [
      "🏠 Cook a fancy dinner together at home",
      "🎬 Movie marathon with your favorite films",
      "🧩 Work on a puzzle while listening to music",
      "📚 Read the same book and discuss chapters",
      "🛁 Take a relaxing bubble bath together",
      "🕯️ Have a candlelit dinner on the floor",
      "🎨 Try painting or drawing together",
      "☕ Create your own coffee shop experience at home",
    ],
    adventure: [
      "🥾 Go on a nature hike or trail walk",
      "🚴 Take a bike ride through the city",
      "🎡 Visit a local fair or carnival",
      "🏛️ Explore a museum you've never been to",
      "🎢 Spend a day at an amusement park",
      "🏖️ Take a day trip to the beach",
      "⛰️ Go on a scenic drive to somewhere new",
      "🎪 Attend a local festival or event",
    ],
    romantic: [
      "🌅 Watch the sunrise with breakfast picnic",
      "💃 Take a dance class together",
      "🌹 Visit a botanical garden",
      "🍷 Go wine tasting or to a vineyard",
      "🌟 Stargaze in a quiet spot",
      "🎭 Attend a theater show or concert",
      "🚢 Take a boat ride or ferry",
      "💆 Book a couples massage or spa day",
    ],
    creative: [
      "🏺 Try pottery or ceramics class",
      "👨‍🍳 Take a cooking class together",
      "📸 Go on a photography adventure",
      "🎵 Write a song or poem together",
      "🌱 Start a garden or plant flowers",
      "🎪 Learn a new skill or hobby together",
      "🏗️ Build something together (furniture, craft)",
      "🎨 Visit art galleries and create your own",
    ],
  };

  const categories = Object.keys(dateIdeas) as Array<keyof typeof dateIdeas>;

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

    // Get random ideas from different categories
    const selectedIdeas: string[] = [];
    categories.forEach((category) => {
      const categoryIdeas = dateIdeas[category];
      const randomIdea =
        categoryIdeas[Math.floor(Math.random() * categoryIdeas.length)];
      selectedIdeas.push(randomIdea);
    });

    // Shuffle and take 3 random ideas
    const shuffledIdeas = selectedIdeas.sort(() => Math.random() - 0.5);
    setCurrentIdeas(shuffledIdeas.slice(0, 3));
    setShowIdeas(true);

    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Auto hide after 8 seconds
    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowIdeas(false));
    }, 8000);

    if (onPress) onPress();
  };

  return (
    <TouchableOpacity style={[styles.touchable, style]} onPress={handlePress}>
      <ImageBackground
        source={require("../../assets/images/sqrbtn.png")}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="contain" // PNG is the box
      >
        <Image
          source={require("../../assets/images/bgicon6.png")}
          style={styles.buttonIcon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Date Ideas</Text>
        <Text style={styles.buttonSubtext}>Perfect plans for us</Text>
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

export default DateIdeasButton;
