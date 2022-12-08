import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

function QuizItem(props) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.name1StackStack}>
        <View style={styles.name1Stack}>
          <Text style={styles.name1}>{props.name}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Question", { ...props })}
            style={styles.button}
          >
            <Text style={styles.appButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description1}>{props.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    backgroundColor: "rgba(238,230,230,1)",
    borderWidth: 1,
    borderColor: "#000000"
  },
  name1: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    right: 9
  },
  button: {
    left: 288,
    top: 10,
    right: 70,
    width: 100,
    height: 70,
    backgroundColor: "#915099",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    top: 13,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  name1Stack: {
    top: 0,
    left: 0,
    height: 77,
    position: "absolute",
    right: 0
  },
  description1: {
    top: 24,
    left: 0,
    color: "#121212",
    position: "absolute",
    fontSize: 16,
    lineHeight: 20,
    right: 105
  },
  name1StackStack: {
    height: 91,
    marginLeft: 4,
    marginRight: 8
  }
});

export default QuizItem;
