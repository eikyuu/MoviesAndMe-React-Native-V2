import {createStackNavigator} from '@react-navigation/stack';
import Search from '../Search';
import React from 'react';
import FilmDetail from '../FilmDetail';
import Favorites from '../Favorites';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackingSearch = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rechercher" component={Search} />
      <Stack.Screen name="Film Details" component={FilmDetail} />
    </Stack.Navigator>
  );
};

const Favoris = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoris" component={Favorites} />
      <Stack.Screen name="Film Details" component={FilmDetail} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === 'Rechercher') {
            return (
              <Image
                source={require('../../images/ic_search.png')}
                style={styles.icon}
              />
            );
          } else if (route.name === 'Favoris') {
            return (
              <Image
                source={require('../../images/ic_favorite.png')}
                style={styles.icon}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
        inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
        showLabel: false, // On masque les titres
      }}>
      <Tab.Screen name="Rechercher" component={StackingSearch} />
      <Tab.Screen name="Favoris" component={Favoris} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default Navigation;
