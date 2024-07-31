import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { commonFontStyle } from '../theme/fonts';

export default function NoDataFound() {
    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);
    return (
        <View>
            <Text style={styles.noDataFound}>No Data Found</Text>
        </View>
    )
}
const getGlobalStyles = (props: any) => {
    const { colors } = props;
    return StyleSheet.create({
        noDataFound: {
            ...commonFontStyle(700, 14, colors.black),
            textAlign: 'center',
            marginTop: 100
        },
    });
};
