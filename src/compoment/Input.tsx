import {
  FlatList,
  Image,
  ReturnKeyType,
  ScrollView,
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
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { useAppSelector } from '../redux/hooks';

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
  extraStyle?: ViewStyle;
  inputStyle: ViewStyle;
  maxLength: number;
  keyboardType: any;
  multiline?: boolean;
  onFocus?: any;
  searchData?: any;
  showListView?: boolean;
  setShowListView?: any
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
  multiline = false,
  showListView,
  onFocus,
  setShowListView,
  searchData,
  ...rest
}: Props) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

  return (
    <View style={[styles.container, extraStyle]}>
      {/* <Text numberOfLines={1} style={styles.labelTextStyle}>
        {label}
      </Text> */}
      <View style={[styles.firstThemeContainer, inputStyle]}>
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
          placeholderTextColor={colors.title_dec}
          multiline={multiline}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onFocus={onFocus}
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
      {showListView && value.length >= 3 ? (
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps={'handled'}
          style={styles.listView}>
          <FlatList
            data={searchData}
            contentContainerStyle={{ flex: 1 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setShowListView(item);
                  }}
                  key={index}
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 20,
                    borderTopWidth: index == 0 ? 0 : 1,
                    borderColor: colors.gray_200,
                  }}>
                  <Text style={styles.listText}>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      ) : null}
    </View>
  );
};

export default Input;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      marginTop: hp(8),
    },
    labelTextStyle: {
      ...commonFontStyle(400, 13, colors.Title_Text),
      marginBottom: hp(4),
      textTransform: 'uppercase',
    },
    firstThemeContainer: {
      height: hp(56),
      borderRadius: 32,
      backgroundColor: colors.input_bg,
      borderWidth: 1,
      borderColor: colors.input_border,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(25),
    },
    inputStyle: {
      flex: 1,
      padding: 0,
      ...commonFontStyle(400, 14, colors.black),
    },
    eyeIconStyle: {
      height: hp(26),
      width: hp(26),
      tintColor: colors.icon_tin,
    },
    listText: {
      ...commonFontStyle(400, 14, colors.Title_Text),
    },
    listView: {
      position: 'absolute',
      backgroundColor: colors.white,
      bottom: -255,
      borderRadius: 10,
      width: '100%',
      maxHeight: 250,
      zIndex: 1,
      height: 250,
      borderWidth: 1,
      borderColor: colors.gray_200,
    }
  });
};
