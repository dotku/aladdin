import React from "react";
import { Text } from "./Themed";

type Props = {
  key: number;
  title: string;
  personal_require: number;
  public_serve: number;
};

export default function WishlistItem({
  key,
  title,
  personal_require,
  public_serve,
}: Props) {
  return (
    <Text key={key}>
      * {title}{" "}
      <Text style={{ color: "gray" }}>
        {personal_require}/{public_serve}
      </Text>
    </Text>
  );
}
