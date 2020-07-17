import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Loading from './screens/Loading'
import Login from './screens/Login'
import Register  from './screens/Register'
import Home from './screens/Home'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Message from './screens/Message'
import Profile from './screens/Profile'
import Notification from './screens/Notification'
import Post from './screens/Post'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCffl6VHFpYvHPZctlSG0O2oEimrIpXRSA",
  authDomain: "vibin-85635.firebaseapp.com",
  databaseURL: "https://vibin-85635.firebaseio.com",
  projectId: "vibin-85635",
  storageBucket: "vibin-85635.appspot.com",
  messagingSenderId: "672333351507",
  appId: "1:672333351507:web:278fe5e2ff22045698d4a6",
  measurementId: "G-P5BP9JFF5C"
};

firebase.initializeApp(firebaseConfig)

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home:{
          screen:Home,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-home" size={28} color={tintColor}></Ionicons>
          }
        },
        Message:{
          screen:Message,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-chatboxes" size={28} color={tintColor}></Ionicons>
          }
        },
        Post:{
          screen:Post,
          navigationOptions:{
            tabBarIcon:({tintColor}) => 
            <Ionicons 
              name="ios-add-circle" 
              size={47} 
              color="#e9446a">
              </Ionicons>
          }
        },    
        Notification:{
          screen:Notification,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-notifications" size={28} color={tintColor}></Ionicons>
          }
        },    
        Profile:{
          screen:Profile,
          navigationOptions:{
            tabBarIcon:({tintColor}) => <Ionicons name="ios-person" size={28} color={tintColor}></Ionicons>
          }
        }
      },
      {
        defaultNavigationOptions:{
          tabBarOnPress:({navigation,defaultHandler}) => {
            if(navigation.state.key ==="Post"){
              navigation.navigate("postModal")
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions:{
          activeTintColor:"#161F3D",
          inactiveTintColor:"#B8BBC4",
          showLabel:false
        }
      }
    ),
    postModal:{
      screen:Post
    }
  },
  {
    mode:"modal",
    headerMode:"none"
  }
)

const AuthStack = createStackNavigator(
  {
    Login:Login,
    Register:Register
  }
)

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading:Loading,
      App:AppContainer,
      Auth:AuthStack
    },
    {
      initialRouteName:"Loading"
    }
  )
);




  


