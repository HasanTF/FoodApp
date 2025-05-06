import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import Animated, { withSpring } from "react-native-reanimated";

export default function Index() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const router = useRouter();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + wp(8))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + wp(10))),
      350
    );
    setTimeout(() => router.push("/homeScreen"), 2500);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center  bg-amber-500">
      <StatusBar style="light" />

      {/* logo image */}
      <Animated.View
        className="bg-white/30 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/30 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: wp(55), height: wp(50) }}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>

      {/* title and punline */}
      <View className="flex items-center mt-12">
        <Text
          style={{ fontSize: wp(14) }}
          className="font-bold text-white tracking-widest"
        >
          Foody
        </Text>
        <Text style={{ fontSize: wp(5) }} className="font-medium text-white ">
          Food is always right!
        </Text>
      </View>
    </SafeAreaView>
  );
}
