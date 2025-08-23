import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import BackgroundHearts from "./components/BackgroundHearts";
import ButtonsRow from "./components/ButtonsRow";
import CelebrationModal from "./components/CelebrationModal";
import CountdownCard from "./components/CountdownCard";
import Header from "./components/Header";
import LoveMessage from "./components/LoveMessage";
import StatsRow from "./components/StatsRow";
import TimeCard from "./components/TimeCard";

const { width } = Dimensions.get("window");

export default function AnniversaryCountdown() {
  const anniversary = new Date("2024-11-26");
  const [daysToYearly, setDaysToYearly] = useState(0);
  const [daysToMonthly, setDaysToMonthly] = useState(0);
  const [yearlyProgress, setYearlyProgress] = useState(0);
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [totalYears, setTotalYears] = useState(0);
  const [totalMonths, setTotalMonths] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCelebration, setShowCelebration] = useState(false);

  // Animation values
  const animY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animY, {
          toValue: -4,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: 2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animY]);

  // Main countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate next yearly anniversary
      let nextYearly = new Date(
        now.getFullYear(),
        anniversary.getMonth(),
        anniversary.getDate()
      );
      if (now > nextYearly) {
        nextYearly.setFullYear(now.getFullYear() + 1);
      }

      const yearlyDiff = nextYearly.getTime() - now.getTime();
      const yearlyDays = Math.ceil(yearlyDiff / (1000 * 60 * 60 * 24));

      // Calculate yearly progress
      const prevYearly = new Date(
        nextYearly.getFullYear() - 1,
        anniversary.getMonth(),
        anniversary.getDate()
      );
      const totalYearlyDays =
        (nextYearly.getTime() - prevYearly.getTime()) / (1000 * 60 * 60 * 24);
      const yearlyProgressPercent =
        ((totalYearlyDays - yearlyDays) / totalYearlyDays) * 100;

      // Calculate next monthly anniversary
      let nextMonthly = new Date(
        now.getFullYear(),
        now.getMonth(),
        anniversary.getDate()
      );
      if (
        now.getDate() > anniversary.getDate() ||
        (now.getDate() === anniversary.getDate() && now.getHours() >= 0)
      ) {
        nextMonthly.setMonth(now.getMonth() + 1);
      }

      const monthlyDiff = nextMonthly.getTime() - now.getTime();
      const monthlyDays = Math.ceil(monthlyDiff / (1000 * 60 * 60 * 24));

      // Calculate monthly progress
      const prevMonthly = new Date(
        nextMonthly.getFullYear(),
        nextMonthly.getMonth() - 1,
        anniversary.getDate()
      );
      const totalMonthlyDays =
        (nextMonthly.getTime() - prevMonthly.getTime()) / (1000 * 60 * 60 * 24);
      const monthlyProgressPercent =
        ((totalMonthlyDays - monthlyDays) / totalMonthlyDays) * 100;

      // Calculate total years and months together (fixed calculation for Nov 26, 2024 start)
      const startDate = new Date(anniversary);
      const currentDate = new Date(now);

      // Calculate the difference in months
      let monthsDiff =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth());

      // If we haven't reached the day of the month yet, subtract one month
      if (currentDate.getDate() < startDate.getDate()) {
        monthsDiff--;
      }

      // Calculate years (only full years)
      const yearsDiff = Math.floor(monthsDiff / 12);

      // Ensure we don't show negative values for new relationships
      const totalYearsTogether = Math.max(0, yearsDiff);
      const totalMonthsTogether = Math.max(0, monthsDiff);

      setDaysToYearly(yearlyDays);
      setDaysToMonthly(monthlyDays);
      setYearlyProgress(yearlyProgressPercent);
      setMonthlyProgress(monthlyProgressPercent);
      setTotalYears(totalYearsTogether);
      setTotalMonths(totalMonthsTogether);

      // Show celebration when it's anniversary day
      if (monthlyDays === 0 || yearlyDays === 0) {
        setShowCelebration(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackgroundHearts />

      <Header />

      <StatsRow totalYears={totalYears} totalMonths={totalMonths} />

      <TimeCard currentTime={currentTime} />

      {/* Cake Divider 1 */}
      <View style={styles.dividerContainer}>
        <Animated.Image
          source={require("../assets/images/cake2.png")}
          style={[styles.cakeDivider, { transform: [{ translateY: animY }] }]}
          resizeMode="contain"
        />
      </View>

      <CountdownCard
        type="yearly"
        days={daysToYearly}
        progress={yearlyProgress}
      />

      <CountdownCard
        type="monthly"
        days={daysToMonthly}
        progress={monthlyProgress}
      />

      {/* Interactive Buttons Section */}
      <ButtonsRow />

      {/* Cake Divider 2 */}
      <View style={styles.dividerContainer}>
        <Animated.Image
          source={require("../assets/images/cake.png")}
          style={[styles.cakeDivider, { transform: [{ translateY: animY }] }]}
          resizeMode="contain"
        />
      </View>

      <LoveMessage />

      <CelebrationModal
        showCelebration={showCelebration}
        setShowCelebration={setShowCelebration}
      />

      {/* Bottom spacing for navigation bar */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff0f6",
    padding: 20,
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  cakeDivider: {
    width: 80,
    height: 80,
  },
  bottomSpacing: {
    height: 50,
  },
});
