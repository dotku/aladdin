import React from "react";
import WishlistItemText from "./WishlistItemText";
import { WishlistItem } from "../types";
import { View, TextInput, Text, GestureResponderEvent } from "react-native";

export default function WishlistItemNative({
  index,
  item,
  onPress,
}: {
  index: number;
  item: WishlistItem;
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <WishlistItemText
        key={index}
        title={item.title}
        personal_require={item.personal_require}
        public_serve={item.public_serve}
      />
      <View style={{ flexDirection: "row", width: 60, height: 32 }}>
        <TextInput
          value={item.personal_require.toString()}
          style={{ width: 20, padding: 4 }}
        />
        <Text accessibilityRole="button" onPress={onPress}>
          [x]
        </Text>
      </View>
    </View>
  );
}
