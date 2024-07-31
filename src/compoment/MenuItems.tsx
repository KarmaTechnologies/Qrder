import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import { Icons } from '../utils/images';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import { strings } from '../i18n/i18n';
import { screenName } from '../navigation/screenNames';

export interface ListObj {
    title: string;
    iconName?: any;
    images?: string[];
    name?: string;
    cuisine_name?: string;
    price?: number;
}
type ItemProps = {
    item: ListObj;
    setDelete?: any
};


const MenuItems = ({ item, setDelete }: ItemProps) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const onPressedit = () => {
        hideMenu();
        const clear = setTimeout(() => {
            navigation.navigate(screenName.FoodDetails, { itemData: item })
        }, 500);
        return () => {
            clearTimeout(clear);
        };
    };

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    const onPressDelete = () => {
        setDelete(true);
    };

    return (
        <View style={styles.boxView}>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                   navigation.navigate(screenName.FoodDetails, { itemData: item })
            }} style={styles.subBoxView}>
                {item.images[0] ? (
                    <Image source={{ uri: item.images[0] }} style={[styles.imageView, { backgroundColor: colors.image_Bg_gray }]} />
                ) : (
                    <View
                        style={[
                            styles.imageView,
                            { backgroundColor: colors.image_Bg_gray },
                        ]}
                    />
                )}
                <View style={styles.container}>
                    <View style={styles.leftView}>
                        <Text style={styles.titleText}> {item?.name}</Text>
                        <View style={styles.rightContainers}>
                            <Menu
                                visible={visible}
                                anchor={
                                    <TouchableOpacity onPress={showMenu}>
                                        <Image source={Icons.optionIcon} style={styles.optionIcon} />
                                    </TouchableOpacity>
                                }
                                onRequestClose={hideMenu}>
                                <MenuItem textStyle={styles.menuTextStyle} onPress={onPressedit}>
                                    {strings('myMenuList.edit')}
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    textStyle={{ ...styles.menuTextStyle, color: colors.black }}
                                    onPress={() => {
                                        hideMenu();
                                        setTimeout(() => {
                                            onPressDelete();
                                        }, 500);
                                    }}>
                                    {strings('myMenuList.delete')}
                                </MenuItem>
                            </Menu>
                        </View>
                    </View>
                    <View style={styles.rateView}>
                        <View style={styles.breakfastView}>
                            <Text style={styles.breakfastText}> {item.cuisine_name}</Text>
                        </View>
                        <Text style={styles.priceText}> {`$${item.price}`}</Text>
                    </View>

                    <View style={styles.rateView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={Icons.star} style={styles.starStyle} />
                            <Text style={styles.rateText}>4.9</Text>
                            <Text style={styles.rateText1}>{`${'(10 Reviews)'}`}</Text>
                        </View>
                        <Text style={styles.pickUpText}> {'Pick UP'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default MenuItems

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        boxView: {
            marginTop: hp(20),
        },
        subBoxView: {
            flexDirection: 'row',
        },
        imageView: {
            width: wp(102),
            height: wp(102),
            borderRadius: 20,
        },
        container: {
            flex: 1,
            marginLeft: wp(12),
            paddingTop: hp(11),
        },
        leftView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        titleText: {
            ...commonFontStyle(700, 14, colors.headerText),
        },
        optionIcon: {
            width: wp(24),
            height: hp(24),
        },
        pickUpText: {
            ...commonFontStyle(400, 14, colors.tabBar),
        },
        breakfastView: {
            backgroundColor: colors.orange_bg,
            alignSelf: 'flex-start',
            paddingHorizontal: wp(12),
            paddingVertical: hp(2),
            borderRadius: 29,
            marginVertical: hp(11),
        },
        priceText: {
            ...commonFontStyle(700, 18, colors.Title_Text),
        },
        breakfastText: {
            ...commonFontStyle(400, 14, colors.Primary_Orange),
        },
        itemsText: {
            ...commonFontStyle(400, 14, colors.gray_400),
        },
        rateView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        starStyle: {
            width: 17,
            height: 17,
        },
        rateText: {
            marginLeft: 4,
            ...commonFontStyle(700, 14, colors.Primary_Orange),
        },
        rateText1: {
            ...commonFontStyle(400, 14, colors.tabBar),
            marginLeft: 9,
        },
        rightContainers: {
            alignItems: 'flex-end',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        menuTextStyle: {
            ...commonFontStyle(400, 16, colors.black),
        },
    });
};
