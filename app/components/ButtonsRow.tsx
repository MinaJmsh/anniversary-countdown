import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateIdeasButton from "./DateIdeasButton";
import DateIdeasPopup from "./DateIdeasPopup";
import SpinWheelPopup from "./SpinWheelPopup";
import SurpriseButton from "./SurpriseButton";

const ButtonsRow: React.FC = () => {
  const [showSpinWheelPopup, setShowSpinWheelPopup] = useState(false);
  const [showDateIdeasPopup, setShowDateIdeasPopup] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        <SurpriseButton
          style={styles.buttonCard}
          onPress={() => setShowSpinWheelPopup(true)}
        />
        <DateIdeasButton
          style={styles.buttonCard}
          onPress={() => setShowDateIdeasPopup(true)}
        />
      </View>

      <SpinWheelPopup
        visible={showSpinWheelPopup}
        onClose={() => setShowSpinWheelPopup(false)}
      />
      <DateIdeasPopup
        visible={showDateIdeasPopup}
        onClose={() => setShowDateIdeasPopup(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, // Add some gap between buttons
  },
  buttonCard: {
    flex: 0.48, // 50/50 width with some gap
  },
});

export default ButtonsRow;
