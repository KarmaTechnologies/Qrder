// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { colors } from "../../theme/color";
// import { icons, images } from "../../theme/icons";
// import { hp, wp } from "../../helper/globalFunction";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   DirectionIcon,
//   FillBell,
//   FillCart,
//   FillLike,
//   Hamburger,
//   RightArrow,
// } from "../../theme/SvgIcon";
// import { useNavigation } from "@react-navigation/native";
// import { screenName } from "../../helper/routeNames";
// import { commonFontStyle, fontFamily } from "../../theme/fonts";

// type HomeProps = {
//   onPresslocation?: () => void;
//   onPressCart?: () => void;
//   onPressProfile?: () => void;
//   location?: any;
// };

// const HomeHeader = ({
//   onPresslocation,
//   onPressCart,
//   onPressProfile,
//   location,
// }: HomeProps) => {
//   const { navigate } = useNavigation();

//   const onPressBell = () => {
//     // @ts-ignore
//     navigate(screenName.Notifications);
//   };

//   return (
//     <SafeAreaView edges={["top"]} style={styles?.container}>
//       <View style={styles?.drawer_btn}>
//         <DirectionIcon />
//         <View style={styles.address_container}>
//           <TouchableOpacity onPress={onPresslocation} style={styles.location}>
//             <Text style={styles.home_title}>Home</Text>
//             <View style={styles.location_icon}>
//               <RightArrow />
//             </View>
//           </TouchableOpacity>
//           <Text style={styles.addrs}>{location?.city}</Text>
//         </View>
//       </View>
//       {/* <Image source={images?.header_logo} style={styles?.header_logo} /> */}
//       <View style={styles?.header_service_container}>
//         <TouchableOpacity onPress={onPressCart}>
//           <FillCart />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onPressBell}>
//           <FillBell />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onPressProfile} style={styles.profile}>
//           <Text style={styles.profile_text}>K</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomeHeader;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors?.white,
//     paddingVertical: hp(17),
//     paddingHorizontal: wp(20),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 1,
//   },
//   hemburger_icon: {
//     width: wp(28),
//     height: wp(28),
//     alignSelf: "flex-start",
//   },
//   drawer_btn: {
//     flexDirection: "row",
//     gap: wp(6),
//     alignItems: "center",
//   },
//   header_logo: {
//     width: wp(100),
//     height: hp(35),
//     marginLeft: wp(50),
//   },
//   header_service_container: {
//     flexDirection: "row",
//     gap: wp(10),
//     alignSelf: "center",
//   },
//   icons: {
//     width: wp(24),
//     height: wp(24),
//   },
//   location: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: wp(5),
//   },
//   location_icon: {
//     transform: [{ rotate: "90deg" }],
//   },
//   home_title: {
//     ...commonFontStyle(fontFamily.medium, 16, colors.black),
//   },
//   addrs: {
//     ...commonFontStyle(fontFamily.medium, 12, colors.gery_8),
//   },
//   address_container: {},
//   profile: {
//     width: wp(26),
//     height: wp(26),
//     borderRadius: wp(50),
//     backgroundColor: colors.green_4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profile_text: {
//     ...commonFontStyle(fontFamily.semi_bold, 16, colors.black),
//   },
// });
