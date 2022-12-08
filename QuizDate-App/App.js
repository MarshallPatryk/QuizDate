import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Login from "./src/screens/Login";
import Matching from "./src/screens/Matching";
import MatchList from "./src/screens/MatchList";
import Question from "./src/screens/Question";
import QuizList from "./src/screens/QuizList";
import Settings from "./src/screens/Settings";
import SignUp from "./src/screens/SignUp";
import { YellowBox } from "react-native";
import { firebase } from './src/firebase/config';

const Stack = createStackNavigator();

function App() {
  YellowBox.ignoreWarnings([""]);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? <Zawartosc /> : <AppLoading />;
  }
}

function Zawartosc() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
          })
          .catch((error) => {
          });
      } else {

      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {user ? (
          <>
            <Stack.Screen name="Matching">
              {props => <Matching {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="MatchList">
              {props => <MatchList {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Question">
              {props => <Question {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="QuizList">
              {props => <QuizList {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Settings">
              {props => <Settings {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Home" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
            <>
              <Stack.Screen name="Home" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf"),
      "roboto-700": require("./src/assets/fonts/roboto-700.ttf")
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;
