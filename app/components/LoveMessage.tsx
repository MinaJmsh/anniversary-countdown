import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoveMessage: React.FC = () => {
  return (
    <View style={styles.messageCard}>
      <Image
        source={require("../../assets/images/bgicon2.png")}
        style={styles.giftIcon}
        resizeMode="contain"
      />
      <Text style={styles.loveMessage}>
        "Every day with you is a celebration"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageCard: {
    backgroundColor: "rgba(245, 208, 208 , 0.5)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f4d0d0",
    borderStyle: "dashed",
  },
  giftIcon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  loveMessage: {
    fontSize: 18,
    fontWeight: "600",
    color: "#be185d",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default LoveMessage;
