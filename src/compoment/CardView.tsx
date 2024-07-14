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
  children?: any;
  containerStyle?: any;
  onPress?:any
  isDisabled?:any
};

const CardView = ({children,containerStyle,onPress,isDisabled}: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  return <TouchableOpacity disabled={!isDisabled} onPress={onPress} style={[styles.container,containerStyle]}>{children}</TouchableOpacity>;
};

export default CardView;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
     elevation:2,
     backgroundColor:colors.white,
     marginHorizontal:wp(16),
     borderRadius:15
    },
  });
};
