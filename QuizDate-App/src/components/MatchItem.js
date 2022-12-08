import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config'
function MatchItem(props) {
  const navigation = useNavigation();

  const [nick2, setNick2] = useState();
  const [kontakt2, setKontakt2] = useState();
  var user2 = "";
  useEffect(() => {
    firebase.firestore()
      .collection('users')
      .doc(props.uid)
      .onSnapshot(documentSnapshot => {
        user2 = documentSnapshot.data();
        setNick2(user2.fullName);
        setKontakt2(user2.contact);
      });
  }, [props.uid]);

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.name1StackStack}>
        <View style={styles.name1Stack}>
          <Text style={styles.name1}>{nick2}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.appButtonText}>{props.Procent}%</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description1}>
          Data: {new Date(props.DataDopasowania.toDate()).toDateString()}, {'\n'}
			Wspólne Quizy: {props.WspolneQuizy},{'\n'}
			Wspólne odpowiedzi {props.WspolneOdpowiedzi} na {props.WszystkieOdpowiedzi}.
		</Text>
        <Text style={styles.description2}>
          Kontakt: {kontakt2}
        </Text>
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
    top: 25,
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
    fontSize: 14,
    lineHeight: 20,
    right: 105
  },
  description2: {
    top: 105,
    left: 0,
    color: "#121212",
    position: "absolute",
    fontSize: 16,
    lineHeight: 20,
    right: 15
  },
  name1StackStack: {
    height: 150,
    marginLeft: 4,
    marginRight: 8
  }
});

export default MatchItem;
