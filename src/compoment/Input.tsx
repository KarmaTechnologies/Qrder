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
  validate?: boolean | string;
  invalidText?: string;
  isValidation?: boolean;
  onBlur?: any;
  IsEditable?: boolean;
  IsEye?: boolean;
  showIcon?: boolean;
  extraStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  editValue: boolean;
  dateValue: any;
  multiline: any;
  editValuePress: any;
};

const Input = ({
  onChangeText = () => {},
  placeholder,
  value,
  validate = false,
  invalidText,
  isValidation = false,
  onBlur = () => {},
  IsEditable = true,
  IsEye = false,
  extraStyle = {},
  showIcon,
  editValue,
  containerStyle,
  dateValue,
  multiline,
  inputStyle,
  placeholderStyle,
  secureTextEntry,
  visible,
  setVisible,
  editValuePress
}: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  const isFocuse = useIsFocused();
  const [isFocused, setIsFocused] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useFocusEffect(
    useCallback(() => {
      isFocuse ? setIsFocused(false) : setIsFocused(true);
      value?.length > 0 ? setIsFocused(true) : setIsFocused(false);
    }, [isFocuse]),
  );

  useEffect(() => {
    value?.length > 0 || isFocused ? setIsFocused(true) : setIsFocused(false);
  }, [value]);

  const animatedValue = new Animated.Value(isFocused ? 1 : 0);
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
    outputRange: [16, 12],
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
          <TouchableOpacity
            disabled={!IsEditable}
            onPress={() => {
              handleFocus();
            }}>
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
          </TouchableOpacity>
          <TextInput
            value={value}
            onFocus={handleFocus}
            onBlur={() => (handleBlur(), onBlur())}
            style={[styles.input, inputStyle]}
            onChangeText={onChangeText}
            editable={IsEditable}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {editValue && (
          <TouchableOpacity onPress={editValuePress}>
            <Image
              source={dateValue ? Icons.calender : Icons.edit}
              style={styles?.editIconStyle}
            />
          </TouchableOpacity>
        )}
        {isValidation && (
          <Pressable onPress={() => setVisible(!visible)}>
            <Image
              source={visible ? Icons?.hide : Icons?.eyeHide}
              style={styles?.eyeIconStyle}
            />
          </Pressable>
        )}
        {/* {isValidation && IsEye ? (
                    <Pressable onPress={() => setVisible(!visible)}>
                        <Image
                            source={visible ? icons?.eye : icons?.offeye}
                            style={styles?.eyeIconStyle}
                        />
                    </Pressable>
                ) : (
                    (isBlurred && !showIcon) &&
                    (validate ? (
                        <Image style={styles.validateImg} source={Icons.check_circle} />
                    ) : value?.length > 0 ? (
                        <Image style={styles.validateImg} source={Icons.check_circle} />
                    ) : null)
                )} */}
      </View>
    </View>
  );
};

export default Input;

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
      width: 20,
      height: 20,
      marginRight: 10,
    },
    eyeIconStyle:{
      width: 20,
      height: 20,
      marginRight: 10,
      tintColor:colors.black

    }
  });
};
