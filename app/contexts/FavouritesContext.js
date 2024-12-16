import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem("favourites");
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.error("Error loading favourites from AsyncStorage:", error);
      }
    };

    loadFavourites();
  }, []);

  useEffect(() => {
    const saveFavourites = async () => {
      try {
        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
      } catch (error) {
        console.error("Error saving favourites to AsyncStorage:", error);
      }
    };

    saveFavourites();
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
