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
    flex: 0.48, // just like statCard for 50/50 width
    backgroundColor: "rgba(230, 181, 202, 0.3)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5b4c9",
    borderStyle: "dashed",
  },
});

export default ButtonsRow;
