import * as React from "react";
import { useEffect, RefObject, useRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublishParamList } from "../types";
import { Input } from "react-native-elements/dist/input/Input";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function PublishScreen({
  navigation,
}: {
  navigation: StackNavigationProp<PublishParamList, "PublishScreen">;
}) {
  const inputElement = useRef() as RefObject<TextInput>;
  const [textInputHeight, setTextInputHeight] = React.useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputElement && inputElement.current && inputElement.current.focus();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <Input
        autoFocus
        multiline
        ref={inputElement}
        containerStyle={{
          borderBottomWidth: 0,
          marginTop: 8,
        }}
        inputStyle={{
          borderBottomWidth: 0,
          outline: "none",
          height: Math.max(35, textInputHeight),
        }}
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
        onKeyPress={(e) => {
          const triggerCharTypeMap: { [key: string]: string } = {
            "#": "tag",
            $: "stock",
            "@": "entity",
          };
          Object.keys(triggerCharTypeMap).includes(e.key) &&
            console.log(`should trigger ${triggerCharTypeMap[e.key]} picker`);
        }}
        onContentSizeChange={(e) => {
          setTextInputHeight(e.nativeEvent.contentSize.height);
        }}
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
