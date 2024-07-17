import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

type Props = {
  size?: string
};

const Loader = ({ size }: Props) => {
  const { colors } = useTheme();
  return (
    <View>
      <ActivityIndicator size={size} color={colors.black} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
