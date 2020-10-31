import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import FilmList from './FilmList';

const Favorites = ({favoritesFilm, navigation}) => {
  return (
    <View style={styles.main_container}>
      <View style={styles.avatar_container}>
        <Avatar />
      </View>
      <FilmList
        films={favoritesFilm}
        navigation={navigation}
        favoriteList={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);
