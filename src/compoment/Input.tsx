import {
  Image,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';

type Props = {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (params: string) => void;
  isShowEyeIcon?: boolean;
  secureTextEntry?: boolean;
  onPressEye?: () => void;
  onSubmitEditing?: () => void;
  autoCorrect?: boolean;
  rest?: TextInputProps[];
  inputRef?: any;
  returnKeyType?: ReturnKeyType;
  extraStyle?: ViewStyle
  inputStyle: ViewStyle;
  maxLength: number;
  keyboardType:any;
  multiline?:boolean
};

const Input = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
  onPressEye,
  isShowEyeIcon,
  autoCorrect,
  inputRef,
  returnKeyType,
  onSubmitEditing,
  extraStyle,
  inputStyle,
  maxLength,
  keyboardType,
  multiline= false,
  ...rest
}: Props) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  return (
    <View style={[styles.container, extraStyle]}>
      <Text numberOfLines={1} style={styles.labelTextStyle}>
        {label}
      </Text>
      <View
        style={[styles.firstThemeContainer, inputStyle]}
      >
        <TextInput
          {...rest}
          ref={inputRef}
          value={value}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          style={[styles.inputStyle]}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={colors.gray_300}
          multiline={multiline}
          maxLength={maxLength}
          keyboardType={keyboardType}
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
  const { colors } = props;
  return StyleSheet.create({
    container: {
      marginTop: hp(24),
    },
    labelTextStyle: {
      ...commonFontStyle(400, 13, colors.Title_Text),
      marginBottom: hp(4),
      textTransform: 'uppercase'
    },
    firstThemeContainer: {
      height: hp(60),
      borderRadius: 10,
      marginTop: hp(4),
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
      borderWidth: 1,
      borderColor: colors.border_line4,
    },
    inputStyle: {
      flex: 1,
      padding: 0,
      ...commonFontStyle(400, 14, colors.Title_Text),
    },
    eyeIconStyle: {
      height: hp(26),
      width: hp(26),
      tintColor: "#BDBDBD",
    },
  });
};
