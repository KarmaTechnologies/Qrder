import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import HomeHeader from '../../compoment/HomeHeader';
import {strings} from '../../i18n/i18n';
import Input from '../../compoment/Input';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import PrimaryButton from '../../compoment/PrimaryButton';
import {Icons} from '../../utils/images';
import {screenName} from '../../navigation/screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';
import CartItems from '../../compoment/CartItems';

type Props = {};

const StudentOrderHistory = (props: Props) => {
  const {colors, isDark} = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const {isDarkTheme} = useAppSelector(state => state.common);
  const [names, setName] = useState<string>('');
  const [emails, setEmail] = useState<string>('');
  const [numbers, setNumber] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        mainShow={true}
        title={strings('Cart.Cart')}
        extraStyle={styles.headerContainer}
        isHideIcon={true}
        isShowIcon={false}
      />
      <FlatList data={[1,2,3,4]} renderItem={()=>{
        return <CartItems />
      }}/>
      <PrimaryButton
        extraStyle={styles.signupButton}
        onPress={() => {
          navigation.navigate(screenName.StudentCheckOut);
        }}
        title={strings('Cart.CheckOut')}
      />
    </SafeAreaView>
  );
};

export default StudentOrderHistory;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerContainer: {
      backgroundColor: colors.white,
    },
    signupButton: {
      marginBottom: 80,
      marginHorizontal: wp(24),
      height: hp(50),
    },
  });
};
