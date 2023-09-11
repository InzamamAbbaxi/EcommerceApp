import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <Text
      style={{
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
      }}>
      Loading...
    </Text>
  );
};

export default Loader;

const styles = StyleSheet.create({});
