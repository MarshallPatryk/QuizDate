import React, { Component } from "react";
import { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Center } from "@builderx/utils";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config'
function SignUp(props) {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    if (password.length < 6) {
      alert("Too short password.")
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home', { user: data })
          })
          .catch((error) => {
            alert(error)
          });
      })
      .catch((error) => {
        alert(error)
      });
  }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect2}
          imageStyle={styles.rect2_imageStyle}
          source={require("../assets/images/Gradient_UsWMNEh.png")}
        >
          <View style={styles.logo1StackColumn}>
            <View style={styles.logo1Stack}>
              <Center horizontal>
                <View style={styles.logo1}>
                  <View style={styles.endWrapperFiller}></View>
                  <View style={styles.text5Column}>
                    <Text style={styles.text5}>QuizDate</Text>
                    <View style={styles.rect3}></View>
                  </View>
                </View>
              </Center>
            </View>
            <Text style={styles.text3}>CREATE ACCOUNT</Text>
            <View style={styles.form}>
              <View style={styles.group2}>
                <View style={styles.nameColumn}>
                  <View style={styles.name}>
                    <EvilIconsIcon
                      name="user"
                      style={styles.icon5}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Name"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.nameInput}
                      onChangeText={(text) => setFullName(text)}
                      value={fullName}
                      autoCapitalize="none"
                    ></TextInput>
                  </View>
                  <View style={styles.email}>
                    <EvilIconsIcon
                      name="envelope"
                      style={styles.icon6}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.emailInput}
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                      autoCapitalize="none"
                    ></TextInput>
                  </View>
                  <View style={styles.password}>
                    <EvilIconsIcon
                      name="lock"
                      style={styles.icon7}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={true}
                      style={styles.passwordInput}
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      autoCapitalize="none"
                    ></TextInput>
                  </View>
                  <View style={styles.passwordTwo}>
                    <EvilIconsIcon
                      name="lock"
                      style={styles.icon8}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={true}
                      style={styles.password2}
                      onChangeText={(text) => setConfirmPassword(text)}
                      value={confirmPassword}
                      autoCapitalize="none"
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.nameColumnFiller}></View>
                <TouchableOpacity
                  onPress={() => onRegisterPress()}
                  style={styles.button}
                >
                  <Text style={styles.text2}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.logo1StackColumnFiller}></View>
          <Text style={styles.text4}>Terms &amp; Conditions</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  logo1: {
    top: 28,
    width: 102,
    height: 111,
    position: "absolute"
  },
  endWrapperFiller: {
    flex: 1
  },
  text5: {
    color: "rgba(255,255,255,1)",
    fontSize: 55,
    marginBottom: 2
  },
  rect3: {
    height: 5,
    backgroundColor: "rgba(189,16,224,1)",
    marginLeft: 63,
    marginRight: 65
  },
  text5Column: {
    marginBottom: 12,
    marginLeft: -61,
    marginRight: -62
  },
  logo1Stack: {
    height: 139
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 16,
    alignSelf: "center"
  },
  form: {
    height: 377,
    marginTop: 19
  },
  group2: {
    height: 251,
    width: 284,
    alignSelf: "center"
  },
  name: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  nameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 5
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  emailInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  password: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 5
  },
  icon7: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    marginTop: 13
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  passwordTwo: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 5
  },
  icon8: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    marginTop: 13
  },
  password2: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  nameColumn: {
    width: 278
  },
  nameColumnFiller: {
    flex: 1
  },
  button: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    width: 278,
    marginBottom: -99,
    alignSelf: "center"
  },
  text2: {
    width: 53,
    color: "rgba(255,255,255,1)",
    marginTop: 18,
    alignSelf: "center"
  },
  logo1StackColumn: {
    marginTop: 40
  },
  logo1StackColumnFiller: {
    flex: 1
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
    marginBottom: 31,
    alignSelf: "center",
    height: 0,
    width: 0,
    opacity: 0
  }
});

export default SignUp;
