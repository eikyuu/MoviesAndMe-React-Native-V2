import React from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import FilmList from "./FilmList";

const Favorites = ({ favoritesFilm, navigation }) => {
  return (
    <FilmList
      films={favoritesFilm}
      navigation={navigation}
      favoriteList={true}
    />
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);
