import { View, Text, StyleSheet } from 'react-native';
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './frontend/src/context/UserContext';

// Importar pantallas
import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import DataEntryScreen from './frontend/src/screens/DataEntryScreen';
import ListScreen from './frontend/src/screens/ListScreen';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'FerRealState - Login',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2E7D32' },
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'FerRealState',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2E7D32' },
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            title: 'Mi Perfil',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2E7D32' },
          }}
        />
        <Stack.Screen 
          name="DataEntry" 
          component={DataEntryScreen}
          options={{
            title: 'Nueva Propiedad',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2E7D32' },
          }}
        />
        <Stack.Screen 
          name="List" 
          component={ListScreen}
          options={{
            title: 'Propiedades',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2E7D32' },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
