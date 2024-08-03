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


const ChefNameCardList = ({ item, setDelete }: ItemProps) => {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const onPressedit = () => {
        hideMenu();
        const clear = setTimeout(() => {
            navigation.navigate(screenName.ChefEditName)
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
            <TouchableOpacity activeOpacity={0.5} style={styles.subBoxView}>
                <View
                    style={[
                        styles.imageView,
                        { backgroundColor: colors.image_Bg_gray },
                    ]}
                />
                <View style={styles.container}>
                    <View style={styles.leftView}>
                        <Text style={styles.titleText}> {'sdsdsd'}</Text>
                        <View style={styles.rightContainers}>
                            <Menu
                                visible={visible}
                                style={styles.boxMenu}
                                anchor={
                                    <TouchableOpacity onPress={showMenu} style={{ paddingRight: 8 }}>
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
                    <Text style={styles.breakfastText}> {'sss'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default ChefNameCardList

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
            width: wp(100),
            height: wp(100),
            borderRadius: wp(50),
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
            ...commonFontStyle(700, 16, colors.headerText),
        },
        optionIcon: {
            width: wp(24),
            height: hp(24),
        },
        breakfastText: {
            ...commonFontStyle(400, 14, colors.Primary_Orange),
        },
        rightContainers: {
            alignItems: 'flex-end',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        menuTextStyle: {
            ...commonFontStyle(400, 16, colors.black),
        },
        boxMenu: {
            backgroundColor: colors.card_bg
        }
    });
};
