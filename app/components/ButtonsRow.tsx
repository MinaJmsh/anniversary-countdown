import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateIdeasButton from "./DateIdeasButton";
import DateIdeasPopup from "./DateIdeasPopup";
import QuotePopup from "./QuotePopup";
import SurpriseButton from "./SurpriseButton";

const ButtonsRow: React.FC = () => {
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [showDateIdeasPopup, setShowDateIdeasPopup] = useState(false);

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

      <QuotePopup
        visible={showQuotePopup}
        onClose={() => setShowQuotePopup(false)}
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
  },
  buttonCard: {
    flex: 0.48, // 50% of row
    aspectRatio: 1, // square
  },
});

export default ButtonsRow;
