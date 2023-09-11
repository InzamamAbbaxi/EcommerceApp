import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/CartReducer';

import CartItem from '../components/CartItem';
import EmptyCartView from '../components/EmptyCartView';

const Cart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const calculateTotal = () => {
    let total = 0;
    cart.map(item => (total = total + item.quantity * item.price));
    setTotalAmount(total);
  };
  useEffect(() => {
    const subscribe = setTimeout(() => {
      calculateTotal();
    }, 200);
    return () => clearTimeout(subscribe);
  }, [cart]);

  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color="#000" size={22} />
        </TouchableOpacity>
        <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
          My Cart
        </Text>
      </View>
      {cart?.length == 0 ? (
        <EmptyCartView />
      ) : (
        <FlatList
          data={cart}
          renderItem={({item, index}) => <CartItem item={item} />}
          ListFooterComponent={() => (
            <View style={styles.totalsContainer}>
              <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>${totalAmount}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
    // padding: 20,
  },
  rowView: {flexDirection: 'row', alignItems: 'center'},

  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    textTransform: 'uppercase',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
});
