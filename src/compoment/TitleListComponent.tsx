import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';

export interface ListObj {
  title: string;
  iconName?: any;
  screens: string;
  title1: string
}

interface TitleListComponentProps {
  arr_list: ListObj[];
  onPressCell?: (value: any, index?: any) => void;
  styleProp?: ViewStyle;
  screens: string;
  isSecondText: boolean
}

const TitleListComponent = ({
  arr_list,
  onPressCell,
  styleProp,
  isSecondText = false
}: TitleListComponentProps) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

  const leftIcon = (value: ListObj) => {
    return (
      <View style={styles.leftIcon}>
        <Image source={value?.iconName} style={styles.profileIcon} />
      </View>
    );
  };

  return (
    <View style={[styles.container, styleProp]}>
      {arr_list.map((value, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              disabled={isSecondText}
              onPress={() => (onPressCell ? onPressCell(value.screens) : null)}
              style={[
                index === 0 ? styles.topSpaceInBoxSmall : styles.topSpaceInBox,
              ]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {leftIcon(value)}
                <View>
                  <Text style={styles.titleText}>{value.title}</Text>
                  {isSecondText ?
                    <Text style={styles.titleText1}>{value.title1}</Text> : null}
                </View>

              </View>
              {isSecondText ?
                null : <Image style={styles.rightIcon} source={Icons.rightBack} />}
            </TouchableOpacity>
            {(arr_list.length - 1 !== index && (
                <View
                  style={[
                    styles.bottomLine,
                    {
                      backgroundColor: colors.image_bg,
                      left: 60,
                      right:16
                    },
                  ]}
                />
              )) ||
                null}
          </View>
        );
      })}
    </View>
  );
};

export default TitleListComponent;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.cards_bg,
      borderRadius: 16,
      paddingVertical:hp(16)
    },
    profileIcon: {
      width: wp(18),
      height: wp(18),
      resizeMode: 'contain',
    },
    rightIcon: {
      width: wp(24),
      height: hp(24),
      resizeMode: 'contain',
    },
    titleText: {
      ...commonFontStyle(400, 14, colors.black),
    },
    titleText1: {
      ...commonFontStyle(400, 14, colors.gray_300),
    },
    topSpaceInBoxSmall: {
      height: hp(48),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(16),
      justifyContent: 'space-between',
    },
    topSpaceInBox: {
      height: hp(48),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(20),
      justifyContent: 'space-between',
    },
    leftIcon: {
      height: wp(32),
      width: wp(32),
      backgroundColor: colors.orange_bg,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp(16),
    },
    bottomLine: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      height: 1,
    },
  });
};
