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
  ...rest
}: InputProps) => {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={[styles.labelTextStyle, labelTextStyle]}>
        {label}
      </Text>
      <Dropdown
        style={[styles.dropdown, DropDownStyle]}
        placeholderStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
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
            source={Icons.down}
            style={styles.downIcon}
          />
        )}
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
      height: hp(42),
      borderWidth: wp(1),
      paddingHorizontal: wp(12),
      borderColor: colors.border_line4,
      borderRadius: 10,
      marginTop: hp(4),
    },
    placeholderStyle: {
      ...commonFontStyle(400, 14, colors.dropDownText),
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
      width: 22,
      height: 22,
      resizeMode: 'contain',
    }
  });
};

export default CCDropDown;
