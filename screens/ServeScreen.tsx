import * as React from "react";
import { useEffect, useRef, useState, RefObject } from "react";
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { ServeParamList } from "../types";
import { Text, View } from "../components/Themed";
import WishlistItem from "../components/WishlistItemText";
import { Wishlist } from "../types";
import defaultWishlist from "../__tests__/data/defaultWishlist";

type ServeNavigationProp = StackNavigationProp<ServeParamList, "ServeScreen">;
type Props = {
  navigation: ServeNavigationProp;
};

const storeData = async () => {
  const wishList = await AsyncStorage.getItem("@wishList");
  console.log("storeData", wishList);
  if (!wishList) {
    try {
      await AsyncStorage.setItem("@wishList", JSON.stringify(defaultWishlist));
    } catch (e) {
      // saving error
    }
  }
};

storeData();

export default function ServeScreen({ navigation }: Props) {
  const inputRef = useRef() as RefObject<TextInput>;
  const [inputContent, setInputContent] = useState("");
  const [wishList, setWishlist] = useState<Wishlist>([]);

  useEffect(() => {
    genWishlistFromStorage();

    const unsubscribe = navigation.addListener("focus", () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const genWishlistFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@wishList");
      if (value !== null) {
        // value previously stored
        setWishlist(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  const genWishlistUpdate = async (newWishlist: Wishlist) => {
    setWishlist(newWishlist);
    await AsyncStorage.setItem("@wishList", JSON.stringify(newWishlist));
  };
  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setInputContent(e.nativeEvent.text);
  };
  const handleInputKeyPress = async (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Enter") {
      let newWishlist = wishList;
      const duplicatedItem = wishList.find(
        (item) => item.title === inputContent
      );
      if (duplicatedItem !== undefined) {
        newWishlist = wishList.filter((item) => item.id !== duplicatedItem.id);
      }
      await genWishlistUpdate([
        {
          id: duplicatedItem
            ? duplicatedItem.id
            : wishList[wishList.length - 1].id + 1,
          title: inputContent,
          personal_require: duplicatedItem
            ? duplicatedItem.personal_require
            : 0,
          public_serve: duplicatedItem ? duplicatedItem.public_serve + 1 : 1,
        },
        ...newWishlist,
      ]);
      setInputContent("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={inputContent}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="What can you serve?"
        blurOnSubmit={false}
        style={{ padding: 2, marginTop: 30 }}
        ref={inputRef}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        style={{ maxWidth: "80%", width: 500 }}
        data={wishList}
        renderItem={({ index, item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <WishlistItem
              key={index}
              title={item.title}
              personal_require={item.personal_require}
              public_serve={item.public_serve}
            />
            <Text
              accessibilityRole="button"
              onPress={async () => {
                await genWishlistUpdate(
                  wishList.filter((wishListItem) => wishListItem.id !== item.id)
                );
              }}
            >
              [x]
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
