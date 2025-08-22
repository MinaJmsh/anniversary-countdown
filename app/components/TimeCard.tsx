import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface TimeCardProps {
  currentTime: Date;
}

const TimeCard: React.FC<TimeCardProps> = ({ currentTime }) => {
  return (
    <View style={styles.timeCard}>
      <Image
        source={require("../../assets/images/bgicon5.png")}
        style={styles.timeIcon}
        resizeMode="contain"
      />
      <Text style={styles.timeText}>
        {currentTime.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeCard: {
    backgroundColor: "rgba(245, 208, 208 , 0.5)",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#f4d0d0",
    borderStyle: "dashed",
  },
  timeIcon: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  timeText: {
    color: "#be185d",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
    flex: 1,
  },
});

export default TimeCard;
