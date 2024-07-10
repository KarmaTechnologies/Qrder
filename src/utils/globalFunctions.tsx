import { Dimensions, Platform } from "react-native";
import { navigationRef } from "../navigation/mainNavigator";
import { CommonActions } from "@react-navigation/native";



export const dispatchNavigation = (name: string) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: name }],
    })
  );
};

