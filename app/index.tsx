import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#ff6b9d",
  backgroundColor = "#fce7f3",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

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
  const heartScale = useRef(new Animated.Value(1)).current;
  const sparkleRotation = useRef(new Animated.Value(0)).current;
  const floatingHeart = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0)).current;

  // Preload your icons in an array
  const backgroundIcons = [
    require("../assets/images/bgicon1.png"),
    require("../assets/images/bgicon2.png"),
    require("../assets/images/bgicon3.png"),
    require("../assets/images/bgicon4.png"),
    require("../assets/images/bgicon5.png"),
    require("../assets/images/bgicon6.png"),
    require("../assets/images/bgicon7.png"),
    require("../assets/images/bgicon8.png"),
    require("../assets/images/bgicon9.png"),
  ];

  // Background hearts animation - 100 hearts with random icons covering full screen
  const backgroundHearts = useRef(
    Array.from({ length: 100 }, () => ({
      animValue: new Animated.Value(Math.random()),
      x: Math.random() * 100, // Full width coverage
      y: Math.random() * 100, // Full height coverage
      delay: Math.random() * 8000,
      icon: backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)],
    }))
  ).current;

  // Background hearts smooth animation
  useEffect(() => {
    backgroundHearts.forEach((heart, index) => {
      const animateHeart = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(heart.animValue, {
              toValue: 1,
              duration: 3000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(heart.animValue, {
              toValue: 0,
              duration: 3000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ).start();
      };

      setTimeout(() => animateHeart(), heart.delay);
    });
  }, []);

  // Heart beating animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Floating heart animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingHeart, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatingHeart, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Sparkle rotation animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(sparkleRotation, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Celebration animation
  useEffect(() => {
    if (showCelebration) {
      Animated.sequence([
        Animated.timing(celebrationScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.delay(4000),
        Animated.timing(celebrationScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowCelebration(false));
    }
  }, [showCelebration]);

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

  const spin = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Hearts */}
      <View style={styles.backgroundHearts}>
        {backgroundHearts.map((heart, i) => {
          const opacity = heart.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.15, 0.5, 0.15],
          });

          const translateY = heart.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30],
          });

          const scale = heart.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.6, 1.0, 0.6],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.backgroundHeart,
                {
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  opacity,
                  transform: [{ translateY }, { scale }],
                },
              ]}
            >
              <Image
                source={heart.icon}
                style={styles.backgroundHeartImage}
                resizeMode="contain"
              />
            </Animated.View>
          );
        })}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Animated.View
          style={{
            transform: [{ scale: heartScale }, { translateY: floatingHeart }],
          }}
        >
          <Image
            source={require("../assets/images/heart.png")}
            style={styles.mainHeartImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.title}>Our Love Journey</Text>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Image
            source={require("../assets/images/sandglass.png")}
            style={styles.sparkleImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Image
            source={require("../assets/images/bgicon3.png")}
            style={styles.statIcon}
            resizeMode="contain"
          />
          <Text style={styles.statNumber}>{totalYears}</Text>
          <Text style={styles.statLabel}>Years Together</Text>
        </View>
        <View style={styles.statCard}>
          <Image
            source={require("../assets/images/bgicon1.png")}
            style={styles.statIcon}
            resizeMode="contain"
          />
          <Text style={styles.statNumber}>{totalMonths}</Text>
          <Text style={styles.statLabel}>Months Together</Text>
        </View>
      </View>

      {/* Current Time */}
      <View style={styles.timeCard}>
        <Image
          source={require("../assets/images/bgicon5.png")}
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

      {/* Yearly Anniversary Countdown */}
      <View style={[styles.countdownCard, styles.yearlyCard]}>
        <View style={styles.cardTitleContainer}>
          <Image
            source={require("../assets/images/bgicon7.png")}
            style={styles.cardTitleIcon}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>Next Yearly Anniversary</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressWrapper}>
            <CircularProgress
              progress={yearlyProgress}
              size={140}
              color="#ec4899"
            />
            <View style={styles.progressText}>
              <Text style={styles.daysNumber}>{daysToYearly}</Text>
              <Text style={styles.daysLabel}>days</Text>
            </View>
          </View>
        </View>

        <Text style={styles.progressPercentage}>
          {yearlyProgress.toFixed(1)}% Complete
        </Text>
        <Text style={styles.progressSubtext}>This love year journey</Text>
      </View>

      {/* Monthly Anniversary Countdown */}
      <View style={[styles.countdownCard, styles.monthlyCard]}>
        <View style={styles.cardTitleContainer}>
          <Image
            source={require("../assets/images/bgicon9.png")}
            style={styles.cardTitleIcon}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>Next Monthly Anniversary</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressWrapper}>
            <CircularProgress
              progress={monthlyProgress}
              size={140}
              color="#a855f7"
            />
            <View style={styles.progressText}>
              <Text style={styles.daysNumber}>{daysToMonthly}</Text>
              <Text style={styles.daysLabel}>days</Text>
            </View>
          </View>
        </View>

        <Text style={styles.progressPercentage}>
          {monthlyProgress.toFixed(1)}% Complete
        </Text>
        <Text style={styles.progressSubtext}>This month's journey</Text>
      </View>

      {/* Love Message */}
      <View style={styles.messageCard}>
        <Image
          source={require("../assets/images/bgicon2.png")}
          style={styles.giftIcon}
          resizeMode="contain"
        />
        <Text style={styles.loveMessage}>
          "Every day with you is a celebration"
        </Text>
      </View>

      {/* Celebration Modal */}
      {showCelebration && (
        <Animated.View
          style={[
            styles.celebrationModal,
            { transform: [{ scale: celebrationScale }] },
          ]}
        >
          <View style={styles.celebrationContent}>
            <View style={styles.celebrationIconsRow}>
              <Image
                source={require("../assets/images/bgicon7.png")}
                style={styles.celebrationIcon}
                resizeMode="contain"
              />
              <Image
                source={require("../assets/images/bgicon1.png")}
                style={styles.celebrationIcon}
                resizeMode="contain"
              />
              <Image
                source={require("../assets/images/bgicon9.png")}
                style={styles.celebrationIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.celebrationTitle}>Happy Anniversary!</Text>
            <Text style={styles.celebrationText}>
              Celebrating another milestone in our love story!
            </Text>
          </View>
        </Animated.View>
      )}

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
  backgroundHearts: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundHeart: {
    position: "absolute",
    width: 25,
    height: 25,
  },
  backgroundHeartImage: {
    width: "100%",
    height: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  mainHeartImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#be185d",
    marginBottom: 10,
  },
  sparkleImage: {
    width: 60,
    height: 60,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statCard: {
    backgroundColor: "rgba(252, 231, 243, 0.7)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    flex: 0.48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
    borderWidth: 2,
    borderColor: "#f9a8d4",
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
    color: "#ec4899",
    textAlign: "center",
  },
  timeCard: {
    backgroundColor: "rgba(245, 208, 208 , 0.5)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    borderWidth: 2,
    borderColor: "#f4d0d0",
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
  countdownCard: {
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // elevation: 5,
  },
  yearlyCard: {
    backgroundColor: "rgba(252, 231, 243, 0.8)",
    borderWidth: 2,
    borderColor: "#f9a8d4",
  },
  monthlyCard: {
    backgroundColor: "rgba(243, 232, 255, 0.8)",
    borderWidth: 2,
    borderColor: "#c084fc",
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
    color: "#ec4899",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#be185d",
    textAlign: "center",
  },
  progressSubtext: {
    fontSize: 12,
    color: "#ec4899",
    marginTop: 2,
    textAlign: "center",
  },
  messageCard: {
    backgroundColor: "rgba(252, 231, 243, 0.7)",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // elevation: 3,
    borderWidth: 1,
    borderColor: "#f9a8d4",
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
  subMessage: {
    fontSize: 14,
    color: "#ec4899",
    textAlign: "center",
  },
  celebrationModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  celebrationContent: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    // elevation: 10,
  },
  celebrationIconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  celebrationIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  celebrationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#be185d",
    marginBottom: 10,
  },
  celebrationText: {
    fontSize: 14,
    color: "#ec4899",
    textAlign: "center",
  },
  bottomSpacing: {
    height: 50,
  },
});
