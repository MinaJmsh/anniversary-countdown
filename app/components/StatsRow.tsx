import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface StatsRowProps {
  totalYears: number;
  totalMonths: number;
}

const StatsRow: React.FC<StatsRowProps> = ({ totalYears, totalMonths }) => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <Image
          source={require("../../assets/images/bgicon3.png")}
          style={styles.statIcon}
          resizeMode="contain"
        />
        <Text style={styles.statNumber}>{totalYears}</Text>
        <Text style={styles.statLabel}>Years Together</Text>
      </View>
      <View style={styles.statCard}>
        <Image
          source={require("../../assets/images/bgicon1.png")}
          style={styles.statIcon}
          resizeMode="contain"
        />
        <Text style={styles.statNumber}>{totalMonths}</Text>
        <Text style={styles.statLabel}>Months Together</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  statCard: {
    backgroundColor: "rgba(230, 181, 202, 0.3)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    flex: 0.48,
    borderWidth: 2,
    borderColor: "#e5b4c9",
    borderStyle: "dashed",
  },
  statIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#be185d",
  },
  statLabel: {
    fontSize: 12,
    color: "#b3546f",
    textAlign: "center",
  },
});

export default StatsRow;
