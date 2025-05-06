import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import Loading from "../components/loading";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function recipeDetails() {
  const params = useLocalSearchParams();
  const item = JSON.parse(params.item);

  const [isFav, setIsFav] = useState(false);
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndex = (meal) => {
    if (!meal) return [];
    let index = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        index.push(i);
      }
    }

    return index;
  };

  const getYoutubeId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: wp(8),
            backgroundColor: "gray",
            marginTop: hp(0.45),
          }}
        />
      </View>

      {/* back button */}

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <AntDesign name="caretleft" size={hp(3.5)} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFav(!isFav)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <AntDesign
            name="heart"
            size={hp(3.5)}
            color={isFav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-24" />
      ) : (
        <Animated.View
          entering={FadeInDown.duration(700).springify().damping(12)}
          className="px-4 flex justify-between space-y-4 pt-8"
        >
          {/* name of area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500 mb-4"
            >
              {meal?.strArea}
            </Text>
          </View>

          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-200 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <AntDesign name="clockcircleo" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.4) }}
                  className="font-bold text-neutral-700"
                >
                  mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-200 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FontAwesome5
                  name="user-friends"
                  size={hp(4)}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.4) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-200 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FontAwesome5 name="fire-alt" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.4) }}
                  className="font-bold text-neutral-700"
                >
                  Calories
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-200 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Octicons name="stack" size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.4) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      )}

      {/* ingredients */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
        className="my-4 ml-4"
      >
        <Text
          style={{ fontSize: hp(2.5) }}
          className="font-bold flex-1 text-neutral-700"
        >
          Ingredients
        </Text>
        <View className="mt-4 ml-4">
          {ingredientsIndex(meal).map((i) => {
            return (
              <View key={i} className="flex-row mb-3 items-center">
                <View
                  style={{ height: hp(1.5), width: hp(1.5) }}
                  className="bg-amber-300 rounded-full"
                />
                <View className="flex-row ml-2">
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-extrabold text-neutral-700"
                  >
                    {meal["strMeasure" + i]}
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-medium text-neutral-600 ml-2"
                  >
                    {meal["strIngredient" + i]}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {/* Instructions */}
      <Animated.View
        entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
        className="my-4 px-4"
      >
        <Text
          style={{ fontSize: hp(2.5) }}
          className="font-bold flex-1 text-neutral-700"
        >
          Instructions
        </Text>
        <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
          {meal?.strInstructions}
        </Text>
      </Animated.View>

      {/* recipe video */}

      {meal?.strYoutube && (
        <Animated.View
          entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
          className="mx-4"
        >
          <Text
            style={{ fontSize: hp(2.5) }}
            className="font-bold flex-1 text-neutral-700 mb-2"
          >
            Recipe Video
          </Text>
          <View>
            <YoutubeIframe
              videoId={getYoutubeId(meal.strYoutube)}
              height={hp(30)}
            />
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
}
