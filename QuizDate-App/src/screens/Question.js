import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import HeaderX from "../components/HeaderX";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase/config';
import { useRoute } from '@react-navigation/native';
import t from 'tcomb-form-native'

let Form = t.form.Form;

function Question(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [quizDane, setQuizDane] = useState();
  const [listapytan, setListaPytan] = useState(['test']);
  const [listapytanBezPytan, setListaPytanBezPytan] = useState(['test']);
  const formularz = useRef();

  const handleSubmit = () => {
    const user = firebase.auth().currentUser;
    var value = formularz.current.getValue();
    var dane = {};
    dane.wartosci = value;
    dane.idquizu = route.params.klucz;
    dane.iduser = user.uid;
    dane.wgrajodpowiedzi = true;
    if (value) { // prosta walidacja
      console.log(dane.wartosci); //wartosci
      fetch('http://178.238.238.75/api/api/api-apk.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dane)
      });
    }
  };
  function createStr() {
    if (quizDane && quizDane.quest1 && listapytan[0].A && listapytanBezPytan[0].A) {
      var kopia = {};
      for (let i = 0; i < listapytan.length; i++) {
        var pytanie = "Nr." + (i + 1) + " " + listapytan[i].pytanie;
        var jeden = {}
        jeden[pytanie] = t.enums(
          listapytanBezPytan[i] && listapytanBezPytan[i].A ? listapytanBezPytan[i] : {},
          "Test");
        kopia = Object.assign(kopia, jeden);
      }
      //console.log("Wynik", kopia);
      return kopia;
    } else {
      return {};
    }
  }

  let PersonModel = t.struct(
    createStr()
  );

  useEffect(() => {
    firebase.firestore()
      .collection('quizes')
      .doc(route.params.klucz)
      .onSnapshot(documentSnapshot => {
        setQuizDane(documentSnapshot.data());
        setListaPytan(documentSnapshot.data().quest1);
        let kopia = Object.assign(documentSnapshot.data().quest1);
        for (let i = 0; i < kopia.length; i++) {
          delete kopia[i].pytanie;
        }
        setListaPytanBezPytan(kopia);
        //console.log("Forma pytan", documentSnapshot.data().quest1);
        //console.log("Forma pytan kopia", kopia);
      });
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.body}>
        <View style={styles.background}>
          <ImageBackground
            style={styles.rect7}
            imageStyle={styles.rect7_imageStyle}
            source={require("../assets/images/Gradient_ObgfwnC.png")}
          >
            <View style={styles.feedbackBox}>
              <ScrollView>
                <Text style={styles.questionContent}>{route.params.name}</Text>
                <Text style={styles.text42}>
                  {route.params.description}
                </Text>
                <View style={styles.form}>
                  <Form
                    ref={formularz}
                    type={PersonModel}
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text
                      style={styles.appButtonText}>
                      Wyślij
				</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </View>
      <HeaderX button="Settings" style={styles.headerX}></HeaderX>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  body: {
    height: 658,
    marginTop: 80
  },
  background: {
    flex: 1
  },
  rect7: {
    flex: 1
  },
  rect7_imageStyle: {},
  feedbackBox: {
    height: 658
  },
  questionContent: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    textAlign: "center",
    marginTop: 37,
    alignSelf: "center"
  },
  text42: {
    color: "rgba(255,255,255,1)",
    fontSize: 12,
    marginTop: 47,
    alignSelf: "center"
  },
  form: {
    //height: 316,
    //justifyContent: "space-between",
    //width: 280,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    marginTop: 18,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
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
    shadowRadius: 5,
    marginTop: -738
  }
});

export default Question;
