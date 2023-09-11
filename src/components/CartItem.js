import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/CartReducer';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const CartItem = ({item}) => {
  const dispatch = useDispatch();

  const onIncrement = item => {
    dispatch(incrementQuantity(item?.id));
  };
  const onDecrement = item => {
    dispatch(decrementQuantity(item?.id));
  };
  const handleRemoveItemFromCart = item => {
    dispatch(removeFromCart(item?.id));
  };

  return (
    <View style={styles.card}>
      <Image source={{uri: item?.thumbnail}} style={styles.image} />
      <View style={{marginHorizontal: 10, flex: 1}}>
        <Text style={styles.name}>{item?.title}</Text>
        <Text style={styles.price}>${item?.price} </Text>
      </View>
      <View style={styles.rowView}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => onDecrement(item)}>
          <AntDesign name="minuscircle" size={22} color={'#000'} />
        </TouchableOpacity>
        <Text style={{color: '#000', marginHorizontal: 12, fontSize: 14}}>
          {item?.quantity}
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => onIncrement(item)}>
          <AntDesign name="pluscircle" size={22} color={'#000'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleRemoveItemFromCart(item)}
        style={{position: 'absolute', right: -8, top: -10}}>
        <Entypo name="circle-with-cross" color="red" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 18,

    backgroundColor: '#fff',

    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    width: '27%',
    height: '80%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  name: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  price: {color: '#000', fontWeight: '600', fontSize: 20},
  rowView: {flexDirection: 'row', alignItems: 'center'},
});
