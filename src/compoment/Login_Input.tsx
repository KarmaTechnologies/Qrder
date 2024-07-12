import {
  ColorValue,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import React, {FC} from 'react';
import { hp } from '../theme/fonts';

interface input_props {
  placeholder: string;
  input_style?: TextStyle;
  placeholder_color?: ColorValue | any;
  value?: String | number | any;
  input_container_style?: TextStyle;
  custom_component?: any;
  onTextChange?: any;
}

const Login_Input = ({
  placeholder = 'Enter Text...',
  input_style,
  placeholder_color,
  value,
  input_container_style,
  custom_component = null,
  onTextChange,
}: input_props) => {
  return (
    <View style={[styles?.def_input_bg,input_container_style]}>
      {custom_component || (
        <TextInput
          placeholder={placeholder}
          value={value}
          keyboardType="phone-pad"
          placeholderTextColor={placeholder_color}
          showSoftInputOnFocus
          style={[styles?.def_input_styles, input_style]}
          onChangeText={(e: string) => onTextChange(e)}
        />
      )}
    </View>
  );
};

export default Login_Input;


const styles = StyleSheet.create({
  def_input_bg: {
    height: hp(62),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf:'center',
  },
  def_input_styles: {
    width: '100%',
    height: '100%',
  },
});
