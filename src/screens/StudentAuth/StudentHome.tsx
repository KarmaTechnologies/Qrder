import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useAppSelector } from '../../redux/hooks';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import Spacer from '../../compoment/Spacer';
import NoDataFound from '../../compoment/NoDataFound';
import Loader from '../../compoment/Loader';
import { screenName } from '../../navigation/screenNames';

type Props = {};

const StudentHome = (props: Props) => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
  const { isDarkTheme } = useAppSelector(state => state.common);

  const renderItem = ({ item, index }: any) => {
    const containerWidth = (SCREEN_WIDTH - 40) / 2;
    const containerHeight = 120;
    const xPosition = index % 2 === 0 ? 0 : 10;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{
          navigation.navigate(screenName.StudentMenuList)
        }}
        style={{
          width: containerWidth,
          marginLeft: xPosition,
          marginTop:10
        }}
      >
        <Image
          style={[
            styles.renderContainer,
            {
              height: containerHeight,
              backgroundColor: colors.image_Bg_gray,
            },
          ]}>
        </Image>
          <Text style={styles.textStyle}>{'Nirma University of Science and Technology'}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={colors.white} />
      <HomeHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        mainShow={true}
        title={strings('StudentSignUp.university')}
        extraStyle={styles.headerContainer}
        isHideIcon={true}
        isShowIcon={false}
      />
      <View style={{marginHorizontal:wp(16)}}>
        <FlatList
          numColumns={2}
          windowSize={10}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={[1,1,1,1,1,1,1,1,1,1,1,1]}
          initialNumToRender={10}
          onEndReachedThreshold={0.1}
          nestedScrollEnabled={true}
          renderItem={renderItem}
          ListEmptyComponent={ <NoDataFound />}
          ListFooterComponent={() => {
            return (
              <View>
                {true && <Loader size={'small'} />}
                <Spacer height={150} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default StudentHome;

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
    columnWrapperStyle: {
      justifyContent: 'center',
    },
    renderContainer: {
      borderRadius: 16,
      backgroundColor: colors.image_Bg_gray
    },
    textStyle:{
      paddingTop:hp(8),
      paddingLeft:7,
      ...commonFontStyle(700, 12, colors.Title_Text),
    }
  });
};
