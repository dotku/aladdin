import * as React from "react";
import { useEffect, useRef, useState, RefObject } from "react";
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputSubmitEditingEventData,
  TextInputChangeEventData,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RequireParamList } from "../types";
import { Text, View } from "../components/Themed";
import WishlistItemText from "../components/WishlistItemText";
import { Wishlist, WishlistItem } from "../types";
import { ListItem, CheckBox, ButtonGroup, Avatar } from "react-native-elements";
import defaultWishlist from "../__tests__/data/defaultWishlist";
import { useLinkTo, useNavigation } from "@react-navigation/native";

type RequireNavigationProp = StackNavigationProp<
  RequireParamList,
  "RequireScreen"
>;
type Props = {
  navigation: RequireNavigationProp;
};

const storeData = async () => {
  const wishlist = await AsyncStorage.getItem("@wishlist");
  // console.log("storeData", wishlist);
  if (!wishlist) {
    try {
      await AsyncStorage.setItem("@wishlist", JSON.stringify(defaultWishlist));
    } catch (e) {
      // saving error
    }
  }
};

storeData();

export default function SpaceScreen({ navigation }: Props) {
  const inputRef = useRef() as RefObject<TextInput>;
  const [inputContent, setInputContent] = useState("");
  const [operationListRerender, setOperationListRerender] = useState(false);
  const [operations, setOperations] = useState<
    Array<{ key: string; value: boolean }>
  >([
    { key: "impress", value: false },
    { key: "buy", value: false },
    { key: "sell", value: false },
    { key: "eat", value: false },
    { key: "cook", value: false },
    { key: "play", value: false },
    { key: "go", value: false },
    { key: "have", value: false },
    { key: "do", value: false },
  ]);
  const [wishlist, setWishlist] = useState<Wishlist>([]);
  const linkTo = useLinkTo();

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
      const value = await AsyncStorage.getItem("@wishlist");
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
    await AsyncStorage.setItem("@wishlist", JSON.stringify(newWishlist));
  };
  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setInputContent(e.nativeEvent.text);
  };
  const handleInputSubmitEditing = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    let newWishlist = wishlist;
    const duplicatedItem = wishlist.find((item) => item.title === inputContent);
    if (duplicatedItem !== undefined) {
      newWishlist = wishlist.filter((item) => item.id !== duplicatedItem.id);
    }
    await genWishlistUpdate([
      {
        id: duplicatedItem
          ? duplicatedItem.id
          : Math.max(...wishlist.map((item) => item.id)) + 1,
        title: inputContent,
        personal_require: duplicatedItem
          ? duplicatedItem.personal_require + 1
          : 1,
        public_serve: duplicatedItem ? duplicatedItem.public_serve : 0,
        personal_serve: duplicatedItem ? duplicatedItem.personal_serve : 0,
        public_require: duplicatedItem ? duplicatedItem.public_require : 0,
      },
      ...newWishlist,
    ]);
    setInputContent("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const RequireListItemNew = ({
    index,
    item,
  }: {
    index: number;
    item: WishlistItem;
  }) => {
    return (
      <ListItem
        key={index}
        bottomDivider
        onPress={() => {
          navigation.navigate("CategoryScreen");
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>
            require/serve: {item.personal_require} / {item.public_serve}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  const handleCheckBoxClick = (key: string) => {
    let foundedOperationItem = operations.find(
      (operationItem) => operationItem.key === key
    );
    // console.log("onPress");
    // console.log(
    //   "ifFound",
    //   operations.find((operationItem) => operationItem.key === key)
    // );

    if (foundedOperationItem) {
      foundedOperationItem.value = !foundedOperationItem.value;
      // console.log("operations", operations, foundedOperationItem);
      setOperations(operations);
      // console.log("operations", operations);
      setOperationListRerender(!operationListRerender);
    }

    inputRef.current && inputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5,
          padding: 10,
        }}
      >
        <Avatar
          containerStyle={{ marginRight: 4 }}
          rounded
          source={{
            uri: "https://i1.wp.com/nicholegabrielle.com/wp-content/uploads/2019/04/sample-avatar-003.jpg?ssl=1",
          }}
        />
        <TextInput
          value={inputContent}
          onChange={handleInputChange}
          onSubmitEditing={handleInputSubmitEditing}
          placeholder="input anything here."
          blurOnSubmit={false}
          style={{ padding: 2 }}
          ref={inputRef}
        />
      </View>

      <FlatList
        style={{ width: "100%" }}
        data={operations}
        extraData={operationListRerender}
        renderItem={({ item, index }) => {
          // console.log("checkbox", item);
          return (
            <CheckBox
              key={index}
              title={item.key}
              checked={item.value}
              onPress={() => handleCheckBoxClick(item.key)}
            />
          );
        }}
        keyExtractor={(_item, index) => {
          // console.log("key", index, _item);
          return _item.toString();
        }}
      />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        style={{ width: "100%" }}
        data={wishlist}
        renderItem={({ index, item }) => (
          <RequireListItemNew index={index} item={item} />
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
    paddingTop: 18,
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
