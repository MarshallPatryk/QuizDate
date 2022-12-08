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
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config';

function Login(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLoginPress = () => {
    if (email == "") {
      alert("Email is empty.")
      return
    }
    if (password == "") {
      alert("Passwords is empty.")
      return
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              alert("Użytkownik nie istnieje.")
              return;
            }
            const user = firestoreDocument.data()
            navigation.navigate('QuizList', { user })
          })
          .catch(error => {
            alert(error)
          });
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect}
          source={require("../assets/images/Gradient_MbuVvfI.png")}
        >
          <View style={styles.contentLogin}>
            <View style={styles.logo}>
              <View style={styles.endWrapperFiller}></View>
              <View style={styles.text3Column}>
                <Text style={styles.text3}>QuizDate</Text>
                <View style={styles.rect7}></View>
              </View>
            </View>
            <View style={styles.form}>
              <View>
                <View style={styles.username}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon22}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.emailinput}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  ></TextInput>
                </View>
                <View style={styles.password}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon2}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.passwordInput}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.usernameColumnFiller}></View>
              <TouchableOpacity
                onPress={() => onLoginPress()}
                style={styles.button}
              >
                <Text style={styles.text2}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentLoginFiller}></View>
          <View style={styles.footerTexts}>
            <View style={styles.button2Filler}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={styles.button2}
            >
              <View style={styles.createAccountFiller}></View>
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
          </View>
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
  rect: {
    flex: 1
  },
  logo: {
    width: 102,
    height: 111,
    marginTop: 42,
    alignSelf: "center"
  },
  endWrapperFiller: {
    flex: 1
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 55,
    marginBottom: 10
  },
  rect7: {
    height: 6,
    backgroundColor: "rgba(189,16,224,1)",
    marginLeft: 63,
    marginRight: 65
  },
  text3Column: {
    marginBottom: 7,
    marginLeft: -61,
    marginRight: -62
  },
  form: {
    height: 230,
    marginTop: 59,
    marginLeft: 41,
    marginRight: 41
  },
  username: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon22: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  emailinput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14
  },
  password: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  usernameColumnFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(80,31,204,1)",
    borderRadius: 5
  },
  text2: {
    color: "rgba(255,255,255,1)",
    width: 36,
    marginTop: 20,
    alignSelf: "center"
  },
  contentLogin: {
    marginTop: 40
  },
  contentLoginFiller: {
    flex: 1
  },
  footerTexts: {
    height: 14,
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button2Filler: {
    flex: 1
  },
  button2: {
    width: 104,
    height: 14
  },
  createAccountFiller: {
    flex: 1
  },
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  }
});

export default Login;
