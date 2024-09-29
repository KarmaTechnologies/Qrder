//import liraries
import {
  Image,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Icons } from '../utils/images';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { useTheme } from '@react-navigation/native';
import { light_theme } from '../theme/colors';

type InputProps = {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (params: string) => void;
  onPressEye?: () => void;
  onSubmitEditing?: () => void;
  theme?: string;
  autoCorrect?: boolean;
  rest?: TextInputProps[];
  inputRef?: any;
  returnKeyType?: ReturnKeyType;
  DropDownStyle: ViewStyle;
  keyboardType: any;
  maxLength: number;
  setValue?: any;
  data?: any;
  labelField?: any;
  valueField?: any;
  labelTextStyle?: ViewStyle;
  extraStyle?:ViewStyle
};

const CCDropDown = ({
  placeholder = 'Please select',
  label,
  theme = 'first',
  onSubmitEditing,
  DropDownStyle,
  keyboardType,
  maxLength,
  value,
  setValue,
  data,
  labelField,
  valueField,
  labelTextStyle,
  extraStyle,
  ...rest
}: InputProps) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  return (
    <View style={[styles.container,extraStyle]}>
      {/* <Text numberOfLines={1} style={[styles.labelTextStyle, labelTextStyle]}>
        {label}
      </Text> */}
      <Dropdown
        style={[styles.dropdown, DropDownStyle]}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={200}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.item_style}
        value={value}
        onChange={(item: any) => {
          setValue(item[valueField]);
        }}
        renderRightIcon={() => (
          <Image
            resizeMode="contain"
            source={Icons.drop_down}
            style={styles.downIcon}
          />
        )}
        containerStyle={{ backgroundColor: colors.input_bg, }}
        activeColor={colors.input_bg}
      />
    </View>
  );
};

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      marginTop: hp(40),
    },
    labelTextStyle: {
      ...commonFontStyle(400, 13, colors.Title_Text),
      marginBottom: hp(4)
    },
    inputStyle: {
      flex: 1,
      padding: 0,
      ...commonFontStyle(400, 18, colors.black11),
    },
    dropdown: {
      height: hp(56),
      borderWidth: wp(1),
      paddingHorizontal: wp(25),
      borderColor: colors.input_border,
      borderRadius: 32,
    },
    placeholderStyle: {
      ...commonFontStyle(400, 14, colors.title_dec),
    },
    selectedTextStyle: {
      ...commonFontStyle(400, 14, colors.black),
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    item_style: {
      ...commonFontStyle(400, 14, colors.black),
    },
    downIcon: {
      width: 13,
      height: 13,
      resizeMode: 'contain',
      tintColor:colors.icon_tin
    }
  });
};

export default CCDropDown;
