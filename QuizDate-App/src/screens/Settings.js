import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import HeaderX from "../components/HeaderX";
import Svg, { Ellipse } from "react-native-svg";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import NavFooter from "../components/NavFooter";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config'

function Settings(props) {
  const navigation = useNavigation();
  const [pobranaNazwa, setPobranaNazwa] = useState();
  const [pobranyContact, setPobranyContact] = useState();
  const [unazwa, setNazwa] = useState();
  const [ucontact, setContact] = useState();

  var email, uid;
  var user = firebase.auth().currentUser;
  var user2 = "";

  useEffect(() => {
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        user2 = documentSnapshot.data();
        setPobranaNazwa(user2.fullName);
        setPobranyContact(user2.contact);
      });
  }, [user.uid]);

  function aktualizuj() {
    var dane = {};
    dane.uid = user.uid;
    if (unazwa != null) {
      dane.nazwa = unazwa;
    }
    if (ucontact != null) {
      dane.kontakt = ucontact;
    }
    dane.ustawienia = true;
    fetch('http://178.238.238.75/api/api/api-apk.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dane)
    });
  }

  if (user != null) {
    email = user.email;
    uid = user.uid;
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
      <View style={styles.body}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 821.35 890.3" style={styles.ellipse}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              cx={411}
              cy={445}
              rx={410}
              ry={445}
            ></Ellipse>
          </Svg>
          <View style={styles.settingsList}>
            <ScrollView style={styles.scrollArea}>
              <View style={styles.accountSettings}>
                <Text style={styles.expanded}>Ustawienia Konta</Text>
                <View style={styles.form1}>
                  <View style={styles.nameColumn}>

                    <View style={styles.name}>
                      <EvilIconsIcon
                        name="user"
                        style={styles.icon2}
                      ></EvilIconsIcon>
                      <TextInput
                        placeholder="Nazwa"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.nameInput2}
                        onChangeText={(value) => setNazwa(value)}
                      >{pobranaNazwa}</TextInput>
                    </View>
                    <View style={styles.password4}>
                      <EvilIconsIcon
                        name="comment"
                        style={styles.icon3}
                      ></EvilIconsIcon>
                      <TextInput
                        placeholder="Kontakt"
                        placeholderTextColor="rgba(255,255,255,1)"
                        secureTextEntry={false}
                        style={styles.passwordInput4}
                        maxLength={200}
                        multiline={true}
                        numberOfLines={4}
                        maxHeight={150}
                        onChangeText={(value) => setContact(value)}
                      >{pobranyContact}
                      </TextInput>
                    </View>

                  </View>
                  <View style={styles.nameColumnFiller}></View>
                  <TouchableOpacity
                    onPress={() => aktualizuj()}
                    style={styles.button1}
                  >
                    <Text style={styles.update}>AKTUALIZUJ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
          <Text style={styles.pageName}>USTAWIENIA</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      </View>
      <NavFooter style={styles.materialIconTextButtonsFooter1}></NavFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  scrollArea: {
    paddingBottom: 200
  },
  headerX: {
    height: 80,
    elevation: 15,
    shadowOffset: {
      height: 7,
      width: 1
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  body: {
    backgroundColor: "rgba(118,117,249,1)",
    flex: 1
  },
  ellipse: {
    top: 9,
    left: 0,
    width: 821,
    height: 890,
    position: "absolute"
  },
  settingsList: {
    left: 72,
    height: 374,
    position: "absolute",
    right: 411,
    bottom: 329
  },
  accountSettings: {
    height: 600,
    width: 310,
    marginTop: 15,
    marginLeft: 24
  },
  expanded: {
    color: "#121212",
    fontSize: 18,
    marginTop: -3
  },
  form1: {
    height: 250,
    width: 278,
    marginTop: 12,
    marginLeft: 16
  },
  name: {
    height: 59,
    backgroundColor: "rgba(10,10,192,0.49)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  nameInput2: {
    height: 30,
    color: "rgba(20,17,17,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  password4: {
    height: 100,
    backgroundColor: "rgba(10,10,192,0.49)",
    borderRadius: 5,
    width: 278,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    textAlignVertical: "top"
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput4: {
    height: 100,
    color: "rgba(20,17,17,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14,
    textAlignVertical: 'top'
  },
  nameColumn: {
    width: 278,
    marginTop: 1
  },
  nameColumnFiller: {
    flex: 1
  },
  button1: {
    height: 59,
    backgroundColor: "rgba(80,31,204,1)",
    borderRadius: 5,
    width: 278
  },
  update: {
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 20
  },
  pageName: {
    top: 0,
    left: 86,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 24
  },
  userInfo: {
    top: 56,
    left: 86,
    height: 125,
    position: "absolute",
    right: 414
  },
  userEmail: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 88,
    marginLeft: 143
  },
  ellipseStack: {
    height: 899,
    marginTop: 34,
    marginLeft: -51,
    marginRight: -410
  },
  materialIconTextButtonsFooter1: {
    height: 56
  }
});

export default Settings;
