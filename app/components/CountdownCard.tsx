import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CircularProgress from "./CircularProgress";

interface CountdownCardProps {
  type: "yearly" | "monthly";
  days: number;
  progress: number;
}

const CountdownCard: React.FC<CountdownCardProps> = ({
  type,
  days,
  progress,
}) => {
  const isYearly = type === "yearly";

  const cardStyles = isYearly
    ? [styles.countdownCard, styles.yearlyCard]
    : [styles.countdownCard, styles.monthlyCard];

  const title = isYearly
    ? "Next Yearly Anniversary"
    : "Next Monthly Anniversary";

  const iconSource = isYearly
    ? require("../../assets/images/bgicon7.png")
    : require("../../assets/images/bgicon9.png");

  const progressColor = isYearly ? "#c1889b" : "#e5b4c9";
  const subtext = isYearly ? "This love year journey" : "This month's journey";

  return (
    <View style={cardStyles}>
      <View style={styles.cardTitleContainer}>
        <Image
          source={iconSource}
          style={styles.cardTitleIcon}
          resizeMode="contain"
        />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressWrapper}>
          <CircularProgress
            progress={progress}
            size={140}
            color={progressColor}
          />
          <View style={styles.progressText}>
            <Text style={styles.daysNumber}>{days}</Text>
            <Text style={styles.daysLabel}>days</Text>
          </View>
        </View>
      </View>

      <Text style={styles.progressPercentage}>
        {progress.toFixed(1)}% Complete
      </Text>
      <Text style={styles.progressSubtext}>{subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  yearlyCard: {
    backgroundColor: "rgba(194, 136, 155, 0.3)",
    borderWidth: 2,
    borderColor: "#c2889b",
    borderStyle: "dashed",
  },
  monthlyCard: {
    backgroundColor: "rgba(230, 181, 202, 0.3)",
    borderWidth: 2,
    borderColor: "#e5b4c9",
    borderStyle: "dashed",
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cardTitleIcon: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#831843",
    textAlign: "center",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  progressWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    position: "absolute",
    alignItems: "center",
  },
  daysNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#be185d",
  },
  daysLabel: {
    fontSize: 12,
    color: "#b3546f",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#be185d",
    textAlign: "center",
  },
  progressSubtext: {
    fontSize: 12,
    color: "#b3546f",
    marginTop: 2,
    textAlign: "center",
  },
});

export default CountdownCard;
