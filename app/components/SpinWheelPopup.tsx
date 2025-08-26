import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SpinWheelPopupProps {
  visible: boolean;
  onClose: () => void;
}

const SpinWheelPopup: React.FC<SpinWheelPopupProps> = ({
  visible,
  onClose,
}) => {
  const [wheelOptions, setWheelOptions] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const spinAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const prewrittenOptions = [
    "🍕 Pizza and movie night",
    "🌅 Watch the sunrise together",
    "🎨 Paint pottery together",
    "🥾 Nature hike adventure",
    "☕ Coffee shop hopping",
    "🍳 Cook breakfast in bed",
    "🎪 Visit local fair/carnival",
    "🌟 Stargazing picnic",
    "💃 Dance in the living room",
    "🛁 Bubble bath together",
    "📚 Read to each other",
    "🚲 Bike ride around town",
    "🎬 Make a home movie",
    "🌸 Visit botanical garden",
    "🍰 Bake dessert together",
  ];

  useEffect(() => {
    if (visible) {
      // Reset state when popup opens
      setWheelOptions([]);
      setSelectedOption("");
      setShowResult(false);
      setCustomInput("");

      // Reset wheel position
      spinAnim2.setValue(0);

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
      spinAnim.setValue(0);
      spinAnim2.setValue(0);
    }
  }, [visible]);

  const addToWheel = (option: string) => {
    if (!wheelOptions.includes(option) && wheelOptions.length < 8) {
      setWheelOptions([...wheelOptions, option]);
    }
  };

  const addCustomOption = () => {
    if (customInput.trim() && wheelOptions.length < 8) {
      addToWheel(customInput.trim());
      setCustomInput("");
    }
  };

  const removeFromWheel = (index: number) => {
    setWheelOptions(wheelOptions.filter((_, i) => i !== index));
  };

  const currentRotation = useRef(0); // keeps track of wheel position

  const spinWheel = () => {
    if (wheelOptions.length < 2) return;

    setIsSpinning(true);
    setShowResult(false);

    const degreesPerSlice = 360 / wheelOptions.length;

    // pick random slice + offset
    const randomSliceIndex = Math.floor(Math.random() * wheelOptions.length);
    const randomOffset = Math.random() * degreesPerSlice;
    const targetAngle = randomSliceIndex * degreesPerSlice + randomOffset;

    // spin amount this round
    const spinAmount = 1800 + (360 - targetAngle);

    // final cumulative rotation
    const newRotation = currentRotation.current + spinAmount;

    Animated.timing(spinAnim, {
      toValue: newRotation,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      currentRotation.current = newRotation; // save where it stopped

      const landedAngle = newRotation % 360;
      const index =
        Math.floor((360 - landedAngle) / degreesPerSlice) % wheelOptions.length;

      setSelectedOption(wheelOptions[index]);
      setShowResult(true);
      setIsSpinning(false);
    });
  };

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const getWheelSliceColor = (index: number) => {
    const colors = [
      "rgba(190, 24, 93, 0.8)", // Pink
      "rgba(194, 136, 155, 0.8)", // Light pink
      "rgba(230, 181, 202, 0.8)", // Very light pink
      "rgba(244, 208, 208, 0.8)", // Pale pink
    ];
    return colors[index % colors.length];
  };

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
            <Text style={styles.title}>Spin the Wheel of Dates</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}
          >
            {/* Wheel Section */}
            {wheelOptions.length > 0 && (
              <View style={styles.wheelSection}>
                <View style={styles.wheelContainer}>
                  <Animated.View
                    style={[
                      styles.wheel,
                      {
                        transform: [
                          { translateX: -100 },
                          { translateY: -100 },
                          { rotate: spin },
                        ],
                      }, // <- center + rotate
                    ]}
                  >
                    {wheelOptions.map((option, index) => {
                      const degreesPerSlice = 360 / wheelOptions.length;
                      const startAngle = index * degreesPerSlice;
                      const endAngle = startAngle + degreesPerSlice;

                      // Create SVG path for pie slice
                      const radius = 90; // Wheel radius minus border
                      const centerX = 100;
                      const centerY = 100;

                      // Calculate start and end points
                      const startAngleRad = ((startAngle - 90) * Math.PI) / 180; // -90 to start from top
                      const endAngleRad = ((endAngle - 90) * Math.PI) / 180;

                      const x1 = centerX + radius * Math.cos(startAngleRad);
                      const y1 = centerY + radius * Math.sin(startAngleRad);
                      const x2 = centerX + radius * Math.cos(endAngleRad);
                      const y2 = centerY + radius * Math.sin(endAngleRad);

                      const largeArcFlag = degreesPerSlice > 180 ? 1 : 0;

                      const pathData = [
                        `M ${centerX} ${centerY}`, // Move to center
                        `L ${x1} ${y1}`, // Line to start point
                        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc to end point
                        "Z", // Close path
                      ].join(" ");

                      // Calculate text position (middle of slice)
                      const textAngle = startAngle + degreesPerSlice / 2 - 90;
                      const textAngleRad = (textAngle * Math.PI) / 180;
                      const textRadius = radius * 0.6;
                      const textX =
                        centerX + textRadius * Math.cos(textAngleRad);
                      const textY =
                        centerY + textRadius * Math.sin(textAngleRad);

                      return (
                        <View key={index} style={styles.sliceContainer}>
                          {/* Fill the wheel and pin coordinates with a viewBox */}
                          <svg
                            viewBox="0 0 200 200"
                            width="100%"
                            height="100%"
                            style={styles.sliceSvg}
                          >
                            <path
                              d={pathData}
                              fill={getWheelSliceColor(index)}
                              stroke="#be185d"
                              strokeWidth="1"
                            />
                            <text
                              x={textX}
                              y={textY}
                              fill="white"
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              {option.length > 15
                                ? option.substring(0, 12) + "..."
                                : option}
                            </text>
                          </svg>
                        </View>
                      );
                    })}

                    <View style={styles.wheelCenter}>
                      <Image
                        source={require("../../assets/images/heart.png")}
                        style={styles.wheelCenterIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </Animated.View>

                  {/* Pointer centered */}
                  <View style={styles.pointer}>
                    <Text style={styles.pointerText}>▼</Text>
                  </View>
                </View>

                {/* Spin Button */}
                <TouchableOpacity
                  style={[
                    styles.spinButton,
                    isSpinning && styles.spinButtonDisabled,
                  ]}
                  onPress={spinWheel}
                  disabled={isSpinning}
                >
                  <Image
                    source={require("../../assets/images/bgicon6.png")}
                    style={styles.buttonIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.spinButtonText}>
                    {isSpinning ? "Spinning..." : "SPIN!"}
                  </Text>
                </TouchableOpacity>

                {/* Result */}
                {showResult && (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultLabel}>Your Date is:</Text>
                    <Text style={styles.resultText}>{selectedOption}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Add Options Section */}
            <View style={styles.addOptionsSection}>
              <Text style={styles.sectionTitle}>
                Add Date Ideas ({wheelOptions.length}/8):
              </Text>

              {/* Custom Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add your own date idea..."
                  value={customInput}
                  onChangeText={setCustomInput}
                  maxLength={50}
                />
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    (!customInput.trim() || wheelOptions.length >= 8) &&
                      styles.addButtonDisabled,
                  ]}
                  onPress={addCustomOption}
                  disabled={!customInput.trim() || wheelOptions.length >= 8}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Prewritten Options */}
              <Text style={styles.subsectionTitle}>Quick Add:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.quickAddContainer}
              >
                {prewrittenOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.quickAddButton,
                      wheelOptions.includes(option) &&
                        styles.quickAddButtonAdded,
                      wheelOptions.length >= 8 &&
                        !wheelOptions.includes(option) &&
                        styles.quickAddButtonDisabled,
                    ]}
                    onPress={() => addToWheel(option)}
                    disabled={
                      wheelOptions.includes(option) || wheelOptions.length >= 8
                    }
                  >
                    <Text
                      style={[
                        styles.quickAddButtonText,
                        wheelOptions.includes(option) &&
                          styles.quickAddButtonTextAdded,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Current Wheel Options */}
              {wheelOptions.length > 0 && (
                <View style={styles.currentOptionsSection}>
                  <Text style={styles.subsectionTitle}>On Your Wheel:</Text>
                  {wheelOptions.map((option, index) => (
                    <View key={index} style={styles.currentOption}>
                      <Text style={styles.currentOptionText}>{option}</Text>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFromWheel(index)}
                      >
                        <Text style={styles.removeButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Image
              source={require("../../assets/images/bgicon7.png")}
              style={styles.closeIcon}
              resizeMode="contain"
            />
            <Text style={styles.closeText}>Close</Text>
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
    maxWidth: 400,
    maxHeight: "90%",
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
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#be185d",
    textAlign: "center",
  },
  content: {
    width: "100%",
    maxHeight: 400,
  },
  wheelSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  wheelContainer: {
    position: "relative",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  wheel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#be185d",
    backgroundColor: "transparent",
  },

  sliceContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  sliceSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // pointer: {
  //   position: "absolute",
  //   top: -15,
  //   left: "50%",
  //   transform: [{ translateX: -8 }], // adjust if arrow width changes
  //   zIndex: 10,
  // },

  wheelCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#be185d",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  wheelCenterIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  pointer: {
    position: "absolute",
    top: -15,
    zIndex: 10,
  },
  pointerText: {
    fontSize: 24,
    color: "#be185d",
  },
  spinButton: {
    backgroundColor: "rgba(190, 24, 93, 0.9)",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  spinButtonDisabled: {
    backgroundColor: "rgba(190, 24, 93, 0.4)",
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    // tintColor: "white",
  },
  spinButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  resultContainer: {
    backgroundColor: "rgba(245, 208, 208, 0.7)",
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: "#f4d0d0",
    borderStyle: "dashed",
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 14,
    color: "#be185d",
    fontWeight: "bold",
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: "#831843",
    fontWeight: "600",
    textAlign: "center",
  },
  addOptionsSection: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#be185d",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e5b4c9",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "#831843",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#be185d",
    borderRadius: 10,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "rgba(190, 24, 93, 0.4)",
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#831843",
    marginBottom: 8,
  },
  quickAddContainer: {
    marginBottom: 15,
  },
  quickAddButton: {
    backgroundColor: "rgba(230, 181, 202, 0.5)",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e5b4c9",
  },
  quickAddButtonAdded: {
    backgroundColor: "rgba(190, 24, 93, 0.8)",
  },
  quickAddButtonDisabled: {
    backgroundColor: "rgba(230, 181, 202, 0.2)",
  },
  quickAddButtonText: {
    fontSize: 12,
    color: "#831843",
    fontWeight: "500",
  },
  quickAddButtonTextAdded: {
    color: "white",
  },
  currentOptionsSection: {
    marginBottom: 10,
  },
  currentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 208, 208, 0.5)",
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
  },
  currentOptionText: {
    flex: 1,
    fontSize: 12,
    color: "#831843",
  },
  removeButton: {
    backgroundColor: "#be185d",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  closeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#be185d",
  },
});

export default SpinWheelPopup;
