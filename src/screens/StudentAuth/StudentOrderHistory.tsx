import { StatusBar, StyleSheet, View } from 'react-native';
import React  from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useAppSelector } from '../../redux/hooks';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';

type Props = {};

const StudentOrderHistory = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const { isDarkTheme } = useAppSelector(state => state.common);
  return (
    <View style={styles.container}>
         <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
         <HomeHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                mainShow={true}
                title={strings('StudentSignUp.orders_history')}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                isShowIcon={false}
            />
    </View>
  );
};

export default StudentOrderHistory;

const getGlobalStyles = (props: any) => {
  const { colors } = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerContainer: {
        backgroundColor: colors.white,
    },
  });
};
