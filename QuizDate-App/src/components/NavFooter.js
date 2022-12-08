import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

function NavFooter(props) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("QuizList")}
        style={styles.buttonWrapper1}
      >
        <MaterialCommunityIconsIcon
          name="playlist-star"
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.quizList}>QuizList</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MatchList")}
        style={styles.buttonWrapper2}
      >
        <MaterialCommunityIconsIcon
          name="account-multiple"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.matchList}>MatchList</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Matching")}
        style={styles.buttonWrapper2}
      >
        <MaterialCommunityIconsIcon
          name="account-heart"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.matchList}>Matching</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(242,202,238,1)",
    flexDirection: "row",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  buttonWrapper1: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },
  quizList: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  buttonWrapper2: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon2: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },
  matchList: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4
  }
});

export default NavFooter;
