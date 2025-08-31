import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SpinWheelButtonProps {
  onPress: () => void;
  style?: object;
}

const SpinWheelButton: React.FC<SpinWheelButtonProps> = ({
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.touchable, style]} onPress={onPress}>
      <ImageBackground
        source={require("../../assets/images/rctbtn2.png")}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="stretch"
      >
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/bgicon8.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Spin the Wheel</Text>
          <Text style={styles.buttonSubtext}>Random date ideas</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: "100%", // always full width
    height: 150, // fixed height you want
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  image: {
    width: "100%", // stretch to full width
    height: "100%", // fill container height
  },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    paddingTop: 14,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#be185d",
    textAlign: "center",
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 11,
    color: "#b3546f",
    textAlign: "center",
  },
});

export default SpinWheelButton;
