import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateIdeasButton from "./DateIdeasButton";
import DateIdeasPopup from "./DateIdeasPopup";
import QuotePopup from "./QuotePopup";
import SurpriseButton from "./SurpriseButton";

const ButtonsRow: React.FC = () => {
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [showDateIdeasPopup, setShowDateIdeasPopup] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsRow}>
        <SurpriseButton
          style={styles.buttonCard}
          onPress={() => setShowQuotePopup(true)}
        />
        <DateIdeasButton
          style={styles.buttonCard}
          onPress={() => setShowDateIdeasPopup(true)}
        />
      </View>

      {/* new rectangle button */}
      {/* <SpinWheelButton onPress={() => setShowSpinWheel(true)} /> */}

      <QuotePopup
        visible={showQuotePopup}
        onClose={() => setShowQuotePopup(false)}
      />
      <DateIdeasPopup
        visible={showDateIdeasPopup}
        onClose={() => setShowDateIdeasPopup(false)}
      />
      {/* <SpinWheelPopup
        visible={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
      /> */}
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
  },
  buttonCard: {
    flex: 1,
  },
});

export default ButtonsRow;
