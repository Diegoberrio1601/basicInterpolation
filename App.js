import { useRef } from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  const animation = useRef(new Animated.Value(0)).current;
  const backgroundColorUno = "rgba(171, 68, 89, 1)"; // #AB4459
  const backgroundColorDos = "rgba(68, 23, 82, 1)"; // #441752

  const handleAnimated = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => resetAnimation());
  };

  const resetAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [backgroundColorUno, backgroundColorDos],
      extrapolate: "clamp",
    }),
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
          extrapolate: "clamp",
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 100],
          extrapolate: "clamp",
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [-50, -25, 0, 25, 50],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F29F58" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Toca el cuadro para ver la animación.</Text>
        <TouchableWithoutFeedback onPress={handleAnimated}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <Text style={styles.footerText}>@Diegoberrio1601</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1833",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    width: 150,
    height: 150,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
