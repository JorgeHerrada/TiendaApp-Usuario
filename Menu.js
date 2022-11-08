import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// pantallas que saldran en el proyecto
import LOGIN from "./Login";
import SIGNIN from "./SignIn";
import TIENDA from "./Tienda";
import CONFIRMACION from "./Confirmacion";
import PROGRESO from "./Progreso";


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen 
          name="Login" 
          component={LOGIN} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="SignIn" 
          component={SIGNIN} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="Tienda" 
          component={TIENDA} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="Confirmacion" 
          component={CONFIRMACION} 
          options={{ headerShown: false }} // header wont show
        />
        <Stack.Screen 
          name="Progreso" 
          component={PROGRESO} 
          options={{ headerShown: false }} // header wont show
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;