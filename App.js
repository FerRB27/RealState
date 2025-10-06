import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { UserProvider, UserContext } from './frontend/src/context/UserContext';
import { SQLiteProvider } from 'expo-sqlite'; 
import {initDB} from './frontend/src/db/database';

// Importar pantallas
import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import DataEntryScreen from './frontend/src/screens/DataEntryScreen';
import ListScreen from './frontend/src/screens/ListScreen';


const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'FerRealState',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#2E7D32' },
        }}
      />
      <HomeStack.Screen 
        name="List" 
        component={ListScreen}
        options={{
          title: 'Propiedades',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#2E7D32' },
        }}
      />
      <HomeStack.Screen 
        name="DataEntry" 
        component={DataEntryScreen}
        options={({ route }) => ({
          title: route.params?.property ? 'Editar Propiedad' : 'Nueva Propiedad',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#2E7D32' },
        })}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Mi Perfil',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#2E7D32' },
        }}
      />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AppContent() {
  const navigationRef = useRef();
  const { logout } = useContext(UserContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Profile') iconName = 'person';
            else if (route.name === 'Login') iconName = 'login';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: 'Inicio' }} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarLabel: 'Perfil' }} />
        <Tab.Screen name="Login" component={LoginScreen} options={{ 
          tabBarLabel: 'Salir',
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => { 
                logout(); 
                navigationRef.current?.navigate('Login'); 
              }} 
            />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <SQLiteProvider
        databaseName="realstate.db"
        onInit={initDB}
      >
        <AppContent />
      </SQLiteProvider>
    </UserProvider>
  );
}

// ...existing code...
