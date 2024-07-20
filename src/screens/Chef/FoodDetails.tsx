import { Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, SCREEN_WIDTH, wp } from '../../theme/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '../../i18n/i18n';
import HomeHeader from '../../compoment/HomeHeader';
import Swiper from 'react-native-swiper'
import { Icons } from '../../utils/images';

type Props = {};

const FoodDetails = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const [basicDetails, setBasicDetails] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.white}
            />
            <HomeHeader
                onBackPress={() => { navigation.goBack() }}
                onRightPress={() => { console.log('dee') }}
                mainShow={true}
                title={strings('foodDetails.food_Details')}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                rightText={strings('foodDetails.edit')}
            />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainerStyle}>
                {/* <Swiper
                    showsPagination={true}
                    autoplay={true}
                    horizontal={true}
                    paginationStyle={{ height: 10 }}
                    height="auto"
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activateDot} />}
                >
                    {props.Banners?.map((item, index) => {
                        Image.getSize(${ APIBaseURL?.imageDomain}${ item.lib_image_url }, (width, height) => {
                            ratio = width / height;
                        }, (error) => {
                            console.error(Couldn't get the image size: ${error.message});
                })

                return (
                    <View key={index} style={styles.slide}>
                        {isTablet ? (
                            <Image source={{ uri: ${APIBaseURL?.imageDomain} ${item.lib_image_url} }} style={[styles.imageStyle, { aspectRatio: ratio }]} resizeMode={'contain'} />
                        ) :
                        (
                        <Image source={{ uri: ${APIBaseURL?.imageDomain} ${item.lib_image_url} }} style={[styles.imageStyle, { aspectRatio: ratio }]} resizeMode={'contain'} />
                        )}
                    </View>
                    )
            }
                    )
            }
                </Swiper> */}

                <View style={styles.foodTitle}>
                    <View>
                        <Text style={styles.foodText}>Chicken Thai Biriyani</Text>
                        <View style={styles.locationView}>
                            <Image source={Icons.locationPin} style={styles.locationIcon} />
                            <Text style={styles.locationText}>Kentucky 39495</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.priceText}>$60</Text>
                        <View style={styles.rateView}>
                            <Image source={Icons.star} style={styles.starStyle} />
                            <Text style={styles.rateText}>4.9</Text>
                            <Text style={styles.rateText1}>{`${'(10 Reviews)'}`}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.underlineAll} />
                <Text style={styles.basicText}>{strings('foodDetails.basic_details')}</Text>
                <TextInput
                    value={basicDetails}
                    onChangeText={(t: string) => setBasicDetails(t)}
                    placeholder={'Write your basic details here...'}
                    style={styles.basicInput}
                    multiline
                    maxLength={200}
                    placeholderTextColor={colors.gray_400}
                />

                <View style={[styles.underlineAll, { marginTop: hp(36) }]} />

            </KeyboardAwareScrollView>
        </View>
    );
};

export default FoodDetails;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
        },
        contentContainerStyle: {
            marginHorizontal: wp(16),
        },
        headerContainer: {
            backgroundColor: colors.white,
        },
        foodTitle: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        foodText: {
            ...commonFontStyle(700, 16, colors.Title_Text),
        },
        locationView: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        locationIcon: {
            width: 12,
            height: 12,
            marginTop: 10,
        },
        locationText: {
            paddingTop: hp(9),
            ...commonFontStyle(400, 13, colors.tabBar),
        },
        priceText: {
            alignSelf: 'flex-end',
            ...commonFontStyle(700, 18, colors.Title_Text),
        },
        rateView: {
            flexDirection: 'row',
            paddingTop: hp(7),
            alignItems:'center'
        },
        starStyle: {
            width: 17,
            height: 17,
        },
        rateText: {
            marginLeft: 3,
            ...commonFontStyle(700, 14, colors.Primary_Orange),
        },
        rateText1: {
            ...commonFontStyle(400, 14, colors.tabBar),
            marginLeft: 6,
        },
        underlineAll: {
            height: 1,
            width: SCREEN_WIDTH,
            backgroundColor: colors.border_line5,
            marginTop: hp(24)
        },
        basicText: {
            ...commonFontStyle(400, 14, colors.Title_Text),
            paddingTop: hp(20),
            textTransform: 'uppercase'
        },
        basicInput: {
            height: hp(136),
            borderColor: colors.border_line4,
            borderWidth: 1,
            borderRadius: 8,
            padding: 15,
            textAlignVertical: 'top',
            marginTop: hp(20)
        },
    });
};
