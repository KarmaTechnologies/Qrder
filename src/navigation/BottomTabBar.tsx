import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, isIos, SCREEN_WIDTH, wp } from "../theme/fonts";
import { screenName } from "./screenNames";
import Home from "../screens/Chef/Home";
import { useTheme } from "@react-navigation/native";
import FoodList from "../screens/Chef/FoodList";
import AddFoodDetails from "../screens/Chef/AddFoodDetails";
import Notification from "../screens/Chef/Notification";
import Profile from "../screens/Chef/Profile";
import { Icons } from "../utils/images";

const Tab = createBottomTabNavigator();



const TabBarItem = ({ state, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

  const getIcons = (key: number, isFocused: boolean) => {
    switch (key) {
      case 0:
        return <Image source={Icons.home} style={{ width: 24, height: 24, tintColor: isFocused ? colors.Primary_Orange : colors.tabBar }} />;
      case 1:
        return <Image source={Icons.menuTab} style={{ width: 24, height: 24, tintColor: isFocused ? colors.Primary_Orange : colors.tabBar }} />;

      case 2:
        return <Image source={Icons.addmenu} style={{ width: 57, height: 57, }} />;

      case 3:
        return <Image source={Icons.notification} style={{ width: 24, height: 24, tintColor: isFocused ? colors.Primary_Orange : colors.tabBar }} />;

      case 4:
        return <Image source={Icons.profile} style={{ width: 24, height: 24, tintColor: isFocused ? colors.Primary_Orange : colors.tabBar }} />;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.itemContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[
              styles.itemViewContainer,
              // isFocused && styles.itemFocusContainer,
            ]}
          >
            {getIcons(index, isFocused)}
            {/* <Text
              numberOfLines={1}
              style={{
                ...styles.itemLabelTextStyle,
                color: isFocused ? colors.white : colors.gery_6,
              }}
            >
              {route.name}
            </Text> */}
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

function BottomTabBar() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarItem {...props} />}
      initialRouteName={screenName.tab_bar_name.Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={screenName.tab_bar_name.Home} component={Home} />
      <Tab.Screen name={screenName.tab_bar_name.FoodList} component={FoodList} />
      <Tab.Screen
        name={screenName.tab_bar_name.AddFoodDetails}
        component={AddFoodDetails}
      />
      <Tab.Screen name={screenName.tab_bar_name.Notification} component={Notification} />
      <Tab.Screen name={screenName.tab_bar_name.Profile} component={Profile} />
    </Tab.Navigator>
  );
}

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.white,
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingHorizontal: wp(16),
      borderRadius: 30,
      paddingBottom: 15,
      paddingTop: 4,
      bottom: 0,
      position: 'absolute',
      width: SCREEN_WIDTH
    },
    itemViewContainer: {
      height: isIos ? hp(80) : hp(70),
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginBottom: isIos ? hp(10) : -hp(15),
    },
    itemFocusContainer: {
      backgroundColor: 'red',
      paddingHorizontal: wp(10),
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
  });
};

export default BottomTabBar;
