import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const EmptyCartView = ({}) => {
  const {height, width} = Dimensions.get('screen');
  return (
    <View
      style={{
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{height: 300, width: 300}}>
        <LottieView
          source={require('../assets/empty_cart.json')}
          style={{height: 300, width: 300}}
          autoPlay={true}
          loop={false}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: '#000',
          fontSize: 22,
          fontWeight: '600',
        }}>
        Your cart is empty
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: 'gray',
          width: '77%',
          fontSize: 14,
        }}>
        You have no items in your shopping cart.Let's go buy something!
      </Text>
    </View>
  );
};

export default EmptyCartView;

const styles = StyleSheet.create({});
