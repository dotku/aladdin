import * as React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { FlatList } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountParamList } from "../types";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/core";

type AccountNavigationProp = StackNavigationProp<
  AccountParamList,
  "AccountScreen"
>;

export default function AccountScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ margin: 30 }}>Under construction.</Text>
      <FlatList
        data={["Help"]}
        renderItem={({ item, index }) => {
          console.log("item", item);
          return (
            <View>
              <Text
                onPress={() => {
                  console.log("onPress");
                  navigation.navigate(`Root`, { screen: "Help" });
                }}
              >
                {item}
              </Text>
            </View>
          );
          // return (
          //   <ListItem key={index}>
          //     <ListItem.Content>
          //       <ListItem.Title>{item.toString()}</ListItem.Title>
          //     </ListItem.Content>
          //   </ListItem>
          // );
          // return (
          //   // <ListItem key={index}>
          //   //   <ListItem.Content>
          //   //     <ListItem.Title>{item}</ListItem.Title>
          //   //   </ListItem.Content>
          //   // </ListItem>
          // );
        }}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
