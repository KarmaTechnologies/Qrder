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
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  value: any;
  onChangeText: any;
};

const HomeDropDown = ({value, onChangeText}: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        data={[
          {label: 'Today', value: 'Today'},
          {label: 'Yesterday', value: 'Yesterday'},
        ]}
        placeholder=""
        labelField={'label'}
        onChange={(item: any) => {
          onChangeText(item.value);
        }}
        valueField={'value'}
        value={value}
        selectedTextStyle={styles.inputText}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.rederItemStyle}
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

export default HomeDropDown;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      // marginHorizontal: wp(16),
      borderRadius: 10,
      paddingHorizontal: 9,
      marginLeft:13,
      height: 35,
      marginTop:3,
      borderWidth:1,
      borderColor:colors.Border_gray
    },

    inputText: {
      ...commonFontStyle(500, 12, colors.dropDownText),
    },
    dropdown: {
      // flex: 1,
      width: 70,
      height: 35,
    },
    downIcon: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
    },
    rederItemStyle: {
      ...commonFontStyle(400, 12, colors.btnText),
    },
    itemContainer: {
      width: 80,
    },
  });
};
