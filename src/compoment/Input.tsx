import {
  Animated,
  Image,
  Pressable,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useIsFocused, useTheme} from '@react-navigation/native';
import {commonFontStyle, hp, wp} from '../theme/fonts';
import {Icons} from '../utils/images';

type Props = {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (params: string) => void;
  isShowEyeIcon?: boolean;
  secureTextEntry?: boolean;
  onPressEye?: () => void;
  onSubmitEditing?: () => void;
  theme?: string;
  autoCorrect?: boolean;
  rest?: TextInputProps[];
  inputRef?: any;
  returnKeyType?: ReturnKeyType;
};

const Input = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
  onPressEye,
  isShowEyeIcon,
  theme = "first",
  autoCorrect,
  inputRef,
  returnKeyType,
  onSubmitEditing,
  ...rest
}: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  const isFocuse = useIsFocused();
 

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.labelTextStyle}>
        {label}
      </Text>
      <View
        style={
          theme === "first"
            ? { ...styles.firstThemeContainer }
            : { ...styles.secondThemeContainer }
        }
      >
        <TextInput
          {...rest}
          ref={inputRef}
          value={value}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          style={styles.inputStyle}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={colors.borderGreyLight}
        />
        {isShowEyeIcon ? (
          <TouchableOpacity onPress={onPressEye}>
            <Image
              resizeMode="contain"
              style={styles.eyeIconStyle}
              source={secureTextEntry ? Icons.eyeOff : Icons.eyeIn}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Input;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      marginTop: hp(25),
    },
    labelTextStyle: {
      ...commonFontStyle(400, 18, colors.primary),
      marginBottom: hp(5),
    },
    firstThemeContainer: {
      height: hp(60),
      borderRadius: 10,
      marginTop: hp(5),
      backgroundColor: colors.inputColor,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: wp(20),
    },
    secondThemeContainer: {
      height: hp(60),
      borderRadius: 10,
      marginTop: hp(5),
      backgroundColor: colors.white,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: wp(20),
      borderWidth: 1.5,
      borderColor: colors.inputBorder,
    },
    inputStyle: {
      flex: 1,
      padding: 0,
      ...commonFontStyle(400, 18, colors.primary),
    },
    eyeIconStyle: {
      height: hp(26),
      width: hp(26),
      tintColor: "#BDBDBD",
    },
  });
};
