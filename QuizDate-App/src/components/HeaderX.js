import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config'
function HeaderX(props) {
  const navigation = useNavigation();

  const signOut = () => {
    firebase.auth().signOut();
  }
  const onButtPress = () => {
    if (props.icon2Name == 'power') {
      console.log("wyloguj");
      signOut();
      navigation.navigate("Home");
    } else {
      navigation.navigate("Settings");
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      <ImageBackground
        style={styles.group}
        source={require("../assets/images/Gradient_ADJD6ev.png")}
      >
        <View style={styles.buttonFiller}>
          <Text style={styles.quizDate}>QuizDate</Text>
        </View>
        <TouchableOpacity
          onPress={() => onButtPress()}
          style={styles.button}
        >
          <Icon
            name={props.icon2Name || "settings"}
            style={styles.icon2}
          ></Icon>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(230,111,255,1)"
  },
  group: {
    height: 55,
    flexDirection: "row",
    marginTop: 25
  },
  quizDate: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginTop: 8
  },
  buttonFiller: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 15
  },
  icon2: {
    color: "rgba(250,250,250,1)",
    fontSize: 25
  }
});

export default HeaderX;
