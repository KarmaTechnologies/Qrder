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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      backgroundColor: colors.card_bg,
      borderRadius: 16,
    },
    profileIcon: {
      width: 14,
      height: 14,
      resizeMode: 'contain',
    },
    rightIcon: {
      width: wp(24),
      height: hp(24),
      resizeMode: 'contain',
    },
    titleText: {
      ...commonFontStyle(400, 15, colors.Title_Text),
    },
    titleText1: {
      ...commonFontStyle(400, 14, colors.gray_300),
    },
    topSpaceInBoxSmall: {
      height: hp(80),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(20),
      justifyContent: 'space-between',
    },
    topSpaceInBox: {
      height: hp(80),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(20),
      justifyContent: 'space-between',
    },
    leftIcon: {
      height: wp(40),
      width: wp(40),
      backgroundColor: colors.white,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp(14),
    },
  });
};
