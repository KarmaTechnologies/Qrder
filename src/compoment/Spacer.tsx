import React from 'react';
import {View} from 'react-native';

const Spacer = ({height, width}: {height?: number; width?: number}) => {
  if (width) {
    return <View style={{width}} />;
  }

  if (height) {
    return <View style={{height}} />;
  }

  return <View style={{flex: 1}} />;
};

export default Spacer;
