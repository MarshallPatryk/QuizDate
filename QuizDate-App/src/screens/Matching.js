import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import HeaderX from "../components/HeaderX";
import NavFooter from "../components/NavFooter";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config'

function Matching(props) {
  const navigation = useNavigation();
  const [pobranaData, setPobranaData] = useState();
  const [sformatowana, setFormatowana] = useState('');
  var user = firebase.auth().currentUser;
  useEffect(() => {
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        var user2 = documentSnapshot.data();
        setPobranaData(user2.dopasowanie);
        setFormatowana(new Date(user2.dopasowanie.toDate()).toDateString());
        //console.log(user2.dopasowanie);
      });
  }, [user.uid]);

  function dopasuj() {
    var dane = {};
    dane.uid = user.uid;
    dane.dopasuj = true;
    fetch('http://178.238.238.75/api/api/api-apk.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dane)
    });
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <HeaderX button="Settings" style={styles.headerX}></HeaderX>
      <View style={styles.body}>
        <Text style={styles.text}>Matching</Text>
        <Text style={styles.infoMatch}>You can match only one on day</Text>
        <View style={styles.lastMatchingRow}>
          <Text style={styles.lastMatching}>Last matching:</Text>
          <Text style={styles.matchdate}> {sformatowana}</Text>
        </View>
        <TouchableOpacity
          onPress={() => dopasuj()}
          style={styles.button}
        >
          <Text
            style={styles.materialButtonViolet1}
          >Dopasuj</Text>
        </TouchableOpacity>
      </View>
      <NavFooter style={styles.stopka}></NavFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
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
    paddingLeft: 40,
    backgroundColor: "rgba(65,29,194,0.84)",
    flex: 1
  },
  text: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    textAlign: "center",
    width: 112,
    height: 33,
    marginTop: 19,
    marginLeft: 114
  },
  infoMatch: {
    color: "rgba(255,255,255,1)",
    fontSize: 10,
    textAlign: "center",
    width: 200,
    height: 14,
    marginTop: 18,
    marginLeft: 70
  },
  lastMatching: {
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    textAlign: "center",
    width: 109,
    height: 22
  },
  matchdate: {
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    textAlign: "center",
    width: 220,
    height: 22,
    marginLeft: 11
  },
  lastMatchingRow: {
    height: 22,
    flexDirection: "row",
    marginTop: 80,
    marginLeft: 18,
    marginRight: 64
  },
  button: {
    width: 100,
    height: 36,
    marginTop: 340,
    marginLeft: 226
  },
  materialButtonViolet1: {
    height: 36,
    width: 100,
    backgroundColor: "rgba(80,31,204,1)",
    textAlign: "center",
    paddingTop: 7,
    color: 'white'
  },
  stopka: {
    height: 56
  }
});

export default Matching;
