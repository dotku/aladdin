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

type WishList = Array<{ id: number; title: string; counter: number }>;
type ServeNavigationProp = StackNavigationProp<ServeParamList, "ServeScreen">;
type Props = {
  navigation: ServeNavigationProp;
};

const storeData = async () => {
  const wishList = await AsyncStorage.getItem("@wishList");
  console.log("storeData", wishList);
  if (!wishList) {
    try {
      await AsyncStorage.setItem(
        "@wishList",
        JSON.stringify([
          { id: 1, title: "Car", counter: 1 },
          { id: 2, title: "House", counter: 1 },
          { id: 3, title: "Hapiness", counter: 1 },
        ])
      );
    } catch (e) {
      // saving error
    }
  }
};

storeData();

export default function ServeScreen({ navigation }: Props) {
  const inputRef = useRef() as RefObject<TextInput>;
  const [inputContent, setInputContent] = useState("");
  const [wishList, setWishList] = useState<WishList>([]);

  useEffect(() => {
    genWishListFromStorage();

    const unsubscribe = navigation.addListener("focus", () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const genWishListFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@wishList");
      if (value !== null) {
        // value previously stored
        setWishList(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  const genWishListUpdate = async (newWishList: WishList) => {
    setWishList(newWishList);
    await AsyncStorage.setItem("@wishList", JSON.stringify(newWishList));
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
      let newWishList = wishList;
      const duplicatedItem = wishList.find(
        (item) => item.title === inputContent
      );
      if (duplicatedItem !== undefined) {
        newWishList = wishList.filter((item) => item.id !== duplicatedItem.id);
      }
      await genWishListUpdate([
        {
          id: duplicatedItem
            ? duplicatedItem.id
            : wishList[wishList.length - 1].id + 1,
          title: inputContent,
          counter: duplicatedItem ? duplicatedItem.counter + 1 : 1,
        },
        ...newWishList,
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
            <Text key={index.toString()}>
              * {item.title} x {item.counter}
            </Text>
            <Text
              accessibilityRole="button"
              onPress={async () => {
                await genWishListUpdate(
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
