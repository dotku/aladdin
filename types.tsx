/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  Help: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Require: undefined;
  Serve: undefined;
  Publish: undefined;
  Chat: undefined;
  Account: undefined;
  About: undefined;
};

export type ServeParamList = {
  ServeScreen: undefined;
};

export type RequireParamList = {
  RequireScreen: undefined;
  CategoryScreen: undefined;
  Space: undefined;
};

export type PublishParamList = {
  PublishScreen: undefined;
};

export type ChatParamList = {
  ChatScreen: undefined;
};

export type AccountParamList = {
  AccountScreen: undefined;
  HelpScreen: undefined;
};

export type AboutParamList = {
  AboutScreen: undefined;
};

export type WishlistItem = {
  id: number;
  title: string;
  personal_require: number;
  public_require: number;
  public_serve: number;
  personal_serve: number;
};

export type Wishlist = Array<WishlistItem>;
