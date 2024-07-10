import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useIsFocused, useTheme} from '@react-navigation/native';
import {commonFontStyle, hp} from '../theme/fonts';
import {Icons} from '../utils/images';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: any;
  inputStyle?: any;
  placeholderStyle?: any;
  extraStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  editValue: boolean;
  listData: any;
};

const DropDownItem = ({
  onChangeText = () => {},
  placeholder,
  value,
  extraStyle = {},
  editValue,
  containerStyle,
  inputStyle,
  placeholderStyle,
  listData,
}: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  const isFocuse = useIsFocused();
  const [isFocused, setIsFocused] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showDrop, setShowDrop] = useState(false);

  useFocusEffect(
    useCallback(() => {
      isFocuse ? setIsFocused(false) : setIsFocused(true);
      value?.length > 0 ? setIsFocused(true) : setIsFocused(false);
    }, [isFocuse]),
  );

  const animatedValue = new Animated.Value(isFocused ? 1 : 0);

  useEffect(() => {
    value?.length > 0 || isFocused ? setIsFocused(true) : setIsFocused(false);
  }, [value]);

  
  const handleFocus = () => {
    if (value?.length > 0) {
      setIsFocused(true);
    } else {
      setIsFocused(true);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    setIsBlurred(false);
  };
  const handleBlur = () => {
    value?.length > 0 ? setIsFocused(true) : setIsFocused(false);
    setIsBlurred(true);
  };
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const lablesize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 12],
  });

  const lablecolor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.Text_Tertiary, colors.Primary],
  });

  return (
    <View style={extraStyle}>
      <View
        style={[
          styles.container,
          {
            height: 56,
            borderColor: isFocused ? colors.black : colors.Surface_Tertiary,
          },
          containerStyle,
        ]}>
        <View style={{flex: 1}}>
          <View>
            <Animated.Text
              style={[
                styles.label,
                {
                  transform: [{translateY}],
                  fontSize: lablesize,
                  color: lablecolor,
                },
                placeholderStyle,
              ]}>
              {placeholder}
            </Animated.Text>
          </View>
          <TextInput
            value={value}
            style={[styles.input, inputStyle]}
            onChangeText={onChangeText}
            editable={false}
          />
        </View>
        {editValue && (
          <TouchableOpacity
            onPress={() => {
              setShowDrop(!showDrop);
            }}>
            <Image source={Icons.downArrow} style={styles?.editIconStyle} />
          </TouchableOpacity>
        )}
      </View>
      {showDrop && (
        <View style={styles.listView}>
          {listData?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleFocus();
                  onChangeText(item.value);
                  setShowDrop(false);
                }}
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderTopWidth: index == 0 ? 0 : 1,
                  paddingLeft: 16,
                  paddingRight: 3,
                  borderTopColor: colors.neutral_100,
                }}>
                <Text style={styles.listText}>{item?.label}</Text>
                {value == item.value && (
                  <Image source={Icons.check} style={styles?.editIconStyle} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropDownItem;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: hp(2),
      borderRadius: 5,
    },
    label: {
      position: 'absolute',
      ...commonFontStyle(400, 16, colors.Text_Tertiary),
      height: 56,
      width: '100%',
    },
    input: {
      ...commonFontStyle(400, 16, colors.Primary),
      padding: 0,
      height: 35,
      // backgroundColor: 'red',
      justifyContent: 'flex-end',
      marginBottom: -15,
    },
    validateImg: {
      width: 20,
      height: 20,
      marginHorizontal: hp(2),
    },
    editIconStyle: {
      width: 12,
      height: 12,
      marginRight: 10,
      tintColor: colors.black,
      resizeMode: 'contain',
    },
    eyeIconStyle: {
      width: 12,
      height: 7,
      marginRight: 10,
      tintColor: colors.black,
      resizeMode: 'contain',
    },
    listText: {
      ...commonFontStyle(400, 14, colors.Primary),
      flex: 1,
    },
    listView: {
      borderWidth: 1,
      top: 58,
      position: 'absolute',
      width: '100%',
      backgroundColor: colors.white,
      zIndex: 1,
      borderColor: colors.neutral_100,
      borderRadius: 8,
      elevation: 5,
    },
  });
};
