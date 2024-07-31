import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { commonFontStyle, hp, wp } from '../theme/fonts';
import CCModal from './CCModal';
import PrimaryButton from './PrimaryButton';
type Props = {
    visible?: boolean;
    closeModal: () => void;
    onPressDelete: () => void;
    title?: string;
    leftText: string;
    rightText: string
};

const DleleteModal = ({ visible, closeModal, title, onPressDelete, leftText ,rightText}: Props) => {
    const { colors, isDark } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return (
        <View>
            <CCModal
                visible={visible}
                close={closeModal}
                containStyle={{ alignItems: 'center' }}
                contain={
                    <View>
                        <Text style={styles.containerContain}>
                            {title}
                        </Text>
                        <View
                            style={[
                                styles.btnContainer,
                                { marginTop: hp(10), gap: wp(20), justifyContent: 'center' },
                            ]}>
                            <PrimaryButton
                                title={leftText}
                                onPress={closeModal}
                                extraStyle={styles.btnStyle}
                                titleStyle={styles.btnText}
                            />
                            <PrimaryButton
                                title={rightText}
                                onPress={onPressDelete}
                                extraStyle={styles.btnStyle}
                                titleStyle={styles.btnText}
                            />
                        </View>
                    </View>
                }
            />
        </View>
    );
};

export default DleleteModal;

const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        containerContain: {
            alignSelf: 'center',
            ...commonFontStyle(400, 16, colors.black),
        },
        btnContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        btnStyle: {
            backgroundColor: colors.Primary_Orange,
            alignSelf: 'center',
            marginTop: 10,
            width: wp(80),
            height: hp(40),
        },
        btnText: {
            lineHeight: 18,
            bottom: 0,
            ...commonFontStyle(700, 15, colors.black),
        }
    });
};
