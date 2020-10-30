import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getFilmDetailFromApi } from "../services/TMDApi";
import { connect } from "react-redux";
import EnlargeShrink from "../animations/EnlargeShrink";

const FilmDetail = ({ dispatch, route, favoritesFilm }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState(undefined);

  const id = route.params.idFilm;

  const _shareFilm = () => {
    Share.share({ title: film.title, message: film.overview });
  };

  const _displayFloatingActionButton = () => {
    if (film != undefined && Platform.OS === "android") {
      // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => _shareFilm()}
        >
          <Image
            style={styles.share_image}
            source={require("../images/ic_share.png")}
          />
        </TouchableOpacity>
      );
    }
  };

  const _loadFilm = async (id) => {
    try {
      const data = await getFilmDetailFromApi(id);
      setFilm(data);
      setIsLoading(false);
    } catch (error) {
      console.log("erreur");
    }
  };

  useEffect(() => {
    _loadFilm(id);
  }, [id]);

  const _displayFavoriteImage = () => {
    let sourceImage = require("../images/ic_favorite_border.png");
    let shouldEnLarge = true;
    if (favoritesFilm.findIndex((item) => item.id === film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require("../images/ic_favorite.png");
      shouldEnLarge = false;
    }
    return (
      <EnlargeShrink shouldEnLarge={shouldEnLarge}>
        <Image source={sourceImage} style={styles.favorite_image} />
      </EnlargeShrink>
    );
  };

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  const _displayFilm = () => {
    if (!isLoading) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{
              uri: "https://image.tmdb.org/t/p/original" + film.backdrop_path,
            }}
          />
          <Text style={styles.title_text}>{film.title}</Text>

          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => dispatch({ type: "TOGGLE_FAVORITE", value: film })}
          >
            {_displayFavoriteImage()}
          </TouchableOpacity>
          {_displayFloatingActionButton()}

          <Text style={styles.description_text}>{film.overview}</Text>

          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :
            {film.genres
              .map(function (genre) {
                return genre.name;
              })
              .join(" / ")}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :
            {film.production_companies
              .map(function (company) {
                return company.name;
              })
              .join(" / ")}
          </Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {_displayLoading()}
      {_displayFilm()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  favorite_container: {
    alignItems: "center",
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null,
  },
  share_touchable_floatingactionbutton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  share_image: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmDetail);
