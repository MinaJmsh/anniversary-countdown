import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DateIdeasPopupProps {
  visible: boolean;
  onClose: () => void;
}

const DateIdeasPopup: React.FC<DateIdeasPopupProps> = ({
  visible,
  onClose,
}) => {
  const [currentIdeas, setCurrentIdeas] = useState<string[]>([]);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const dateIdeas = [
    // Cozy dates
    "🏠 Cook a fancy dinner together at home",
    "🎬 Movie marathon with your favorite films",
    "🧩 Work on a puzzle while listening to music",
    "📚 Read the same book and discuss chapters",
    "🛁 Take a relaxing bubble bath together",
    "🕯️ Have a candlelit dinner on the floor",
    "🎨 Try painting or drawing together",
    "☕ Create your own coffee shop experience at home",
    // Adventure dates
    "🥾 Go on a nature hike or trail walk",
    "🚴 Take a bike ride through the city",
    "🎡 Visit a local fair or carnival",
    "🏛️ Explore a museum you've never been to",
    "🎢 Spend a day at an amusement park",
    "🏖️ Take a day trip to the beach",
    "⛰️ Go on a scenic drive to somewhere new",
    "🎪 Attend a local festival or event",
    // Romantic dates
    "🌅 Watch the sunrise with breakfast picnic",
    "💃 Take a dance class together",
    "🌹 Visit a botanical garden",
    "🍷 Go wine tasting or to a vineyard",
    "🌟 Stargaze in a quiet spot",
    "🎭 Attend a theater show or concert",
    "🚢 Take a boat ride or ferry",
    "💆 Book a couples massage or spa day",
    // Creative dates
    "🏺 Try pottery or ceramics class",
    "👨‍🍳 Take a cooking class together",
    "📸 Go on a photography adventure",
    "🎵 Write a song or poem together",
    "🌱 Start a garden or plant flowers",
    "🎪 Learn a new skill or hobby together",
    "🏗️ Build something together (furniture, craft)",
    "🎨 Visit art galleries and create your own",
    // Additional romantic ideas
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

  useEffect(() => {
    if (visible) {
      // Get 4 random ideas
      const shuffledIdeas = [...dateIdeas].sort(() => Math.random() - 0.5);
      setCurrentIdeas(shuffledIdeas.slice(0, 4));

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
      floatAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

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
                source={require("../../assets/images/bgicon2.png")}
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
                source={require("../../assets/images/bgicon3.png")}
                style={styles.decorativeIcon}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/bgicon6.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Perfect Date Ideas</Text>
            <Image
              source={require("../../assets/images/bgicon1.png")}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </View>

          {/* Ideas list */}
          <ScrollView
            style={styles.ideasScrollView}
            showsVerticalScrollIndicator={false}
          >
            {currentIdeas.map((idea, index) => (
              <View key={index} style={styles.ideaItem}>
                <Text style={styles.ideaText}>{idea}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Image
              source={require("../../assets/images/bgicon9.png")}
              style={styles.closeIcon}
              resizeMode="contain"
            />
            <Text style={styles.closeText}>Let's do this! ✨</Text>
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
    padding: 25,
    width: "100%",
    maxWidth: 370,
    maxHeight: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 3,
    borderColor: "#e5b4c9",
    borderStyle: "dashed",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#be185d",
    textAlign: "center",
  },
  ideasScrollView: {
    width: "100%",
    maxHeight: 300,
  },
  ideaItem: {
    backgroundColor: "rgba(230, 181, 202, 0.2)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#c2889b",
    shadowColor: "#be185d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ideaText: {
    fontSize: 15,
    color: "#831843",
    fontWeight: "500",
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "rgba(230, 181, 202, 0.4)",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#e5b4c9",
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

export default DateIdeasPopup;
