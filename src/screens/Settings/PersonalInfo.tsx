import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { hp, wp } from '../../theme/fonts';
import HomeHeader from '../../compoment/HomeHeader';
import { strings } from '../../i18n/i18n';

type Props = {};

const PersonalInfo = (props: Props) => {
    const { colors, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.white}
            />
            <HomeHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                // onRightPress={onRightPress}
                mainShow={true}
                title={strings('PersonalInfo.personal_Info')}
                extraStyle={styles.headerContainer}
                isHideIcon={true}
                rightText={strings('PersonalInfo.edit')}
                rightTextStyle={styles.rightTextStyle}
            />
        </View>
    );
};

export default PersonalInfo;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.white,
            paddingHorizontal: hp(2),
        },
        headerContainer: {
            backgroundColor: colors.white,
        },
        rightTextStyle: {
            textDecorationLine: 'underline',
            textTransform: 'uppercase'
        }
    });
};
