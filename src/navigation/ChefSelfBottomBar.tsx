import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, isIos, SCREEN_WIDTH, wp } from "../theme/fonts";
import { screenName } from "./screenNames";
import { useTheme } from "@react-navigation/native";
import { Icons } from "../utils/images";
import ChefHome from "../screens/ChefSelf/ChefHome";
import ChefProfile from "../screens/ChefSelf/ChefProfile";
import ChefFoodList from "../screens/ChefSelf/ChefMenuList";
import ChefNotification from "../screens/ChefSelf/ChefNotification";
import ChefMenuList from "../screens/ChefSelf/ChefMenuList";

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
        return <Image source={Icons.notification} style={{ width: 24, height: 24, tintColor: isFocused ? colors.Primary_Orange : colors.tabBar }} />;

      case 3:
        return <Image source={Icons.profile} style={{ width: 24, height: 24, tintColor: isFocused ? colors.Primary_Orange : colors.tabBar }} />;
      default:
        break;
    }
  };

  return (
    <View edges={['bottom']} style={styles.itemContainer}>
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
    </View>
  );
};

function ChefSelfBottomBar() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarItem {...props} />}
      initialRouteName={screenName.chef_tab_bar.ChefHome}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={screenName.chef_tab_bar.ChefHome} component={ChefHome} />
      <Tab.Screen name={screenName.chef_tab_bar.ChefMenuList} component={ChefMenuList} />
      <Tab.Screen name={screenName.chef_tab_bar.ChefNotification} component={ChefNotification} />
      <Tab.Screen name={screenName.chef_tab_bar.ChefProfile} component={ChefProfile} />
    </Tab.Navigator>
  );
}

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.modalBg,
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingHorizontal: wp(32),
      borderRadius: 30,
      paddingBottom: Platform.OS == 'ios' ? 4 :15,
      paddingTop: 4,
      bottom: isIos ?  hp(16) :0,
      position: 'absolute',
      width: SCREEN_WIDTH,
      height: isIos ? hp(65) : hp(70),
    },
    itemViewContainer: {
      height: isIos ? hp(0) : hp(70),
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginBottom: isIos ? hp(0) : -hp(15),
    },
  });
};

export default ChefSelfBottomBar;
