import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Text, ScrollView } from "react-native";
import HeaderX from "../components/HeaderX";
import QuizItem from "../components/QuizItem";
import NavFooter from "../components/NavFooter";
import { firebase } from '../firebase/config'
import { useNavigation } from '@react-navigation/native';

function QuizList(props) {
  const navigation = useNavigation();

  const [quizesArr, setQuizesArr] = useState([]);
  const [isLoading, setLoading] = useState("true");

  useEffect(() => {
    firebase.firestore()
      .collection('quizes')
      .get()
      .then(querySnapshot => {
        const testArray = [];
        setQuizesArr([]);
        querySnapshot.forEach((res) => {
          const { name, description } = res.data();
          setQuizesArr(testArray => [...testArray, {
            key: res.id,
            res,
            name,
            description,
          }]);
        });
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, props.style]}>
        <QuizItem style={styles.matchList}></QuizItem>
      </View>
    )
  }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View>
        <HeaderX button="Settings" style={styles.headerX}></HeaderX>
        <View style={styles.textStack}>
          <Text style={styles.text}>Quizes</Text>
          <View style={styles.body}>
            <View style={styles.scrollArea}>
              <ScrollView>
                {
                  quizesArr.map((item, i) => {
                    return (
                      <QuizItem
                        key={i}
                        klucz={item.key}
                        name={item.name}
                        description={item.description}
                      />
                    );
                  })
                }
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.headerXColumnFiller}></View>
      <NavFooter style={styles.materialIconTextButtonsFooter}></NavFooter>
    </View>
  );

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(179,29,173,0.12)",
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
  text: {
    top: 19,
    color: "rgba(209,87,245,1)",
    position: "absolute",
    fontSize: 24,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  body: {
    top: 0,
    left: 5,
    position: "absolute",
    height: 654,
    right: 5
  },
  scrollArea: {
    height: 528,
    marginTop: 76
  },
  textStack: {
    height: 604
  },
  headerXColumnFiller: {
    flex: 1
  },
  materialIconTextButtonsFooter: {
    height: 56
  }
});

export default QuizList;
