import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Badge} from 'react-native-paper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import Loader from '../components/Loader';

const ProductDetails = ({navigation, route}) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products/${route?.params?.id}`,
        );
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const [quantity, setQuantity] = useState(1);
  const onIncrement = () => {
    setQuantity(quantity + 1);
  };
  const onDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({...item, quantity}));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color="#000" size={22} />
        </TouchableOpacity>
      </View>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View>
              <SwiperFlatList
                autoplay
                autoplayDelay={4}
                autoplayLoop
                // index={2}
                showPagination
                data={item?.images}
                renderItem={({item}) => (
                  <View style={[styles.child, {backgroundColor: '#FFF'}]}>
                    <Image
                      source={{uri: item}}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                )}
                paginationStyle={styles.paginationStyle}
                paginationStyleItemActive={styles.paginationStyleItemActive}
                paginationStyleItemInactive={styles.paginationStyleItemInactive}
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 25}}>
              <View style={styles.rowViewSB}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    fontSize: 20,
                    textTransform: 'capitalize',
                    flex: 1,
                  }}>
                  {item?.title}
                </Text>
                <Text
                  style={{color: '#000000', fontSize: 22, fontWeight: '600'}}>
                  ${item?.price}
                </Text>
              </View>
              <Rating
                ratingCount={5}
                showRating={false}
                imageSize={15}
                startingValue={item?.rating}
                //   onFinishRating={this.ratingCompleted}
                style={{
                  paddingVertical: 10,
                  alignItems: 'flex-start',
                }}
              />
              <Text
                style={{
                  color: '#333',
                  fontSize: 14,
                  textTransform: 'capitalize',
                  marginTop: 5,
                }}>
                {item?.description}
              </Text>

              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View
                  style={{
                    ...styles.rowViewSB,
                    paddingVertical: 15,
                    marginRight: 8,
                  }}>
                  <Text
                    style={{color: '#000', fontWeight: '500', fontSize: 14}}>
                    Quantity :{' '}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => onDecrement()}>
                      <AntDesign name="minuscircle" size={22} color={'#000'} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#000',
                        marginHorizontal: 12,
                        fontSize: 14,
                      }}>
                      {quantity}
                    </Text>
                    <TouchableOpacity onPress={() => onIncrement()}>
                      <AntDesign name="pluscircle" size={22} color={'#000'} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.rowViewSB,
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => navigation.navigate('Cart')}>
                    <AntDesign name="shoppingcart" size={35} color="#000" />
                    <Badge
                      style={{position: 'absolute', right: -5, top: -3}}
                      size={18}>
                      {cart?.length}
                    </Badge>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleAddToCart()}
                    style={styles.btn}>
                    <AntDesign name="shoppingcart" size={18} color="#fff" />
                    <Text style={styles.btnText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </>
    </View>
  );
};

export default ProductDetails;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
    // padding: 20,
  },
  child: {width, height: height * 0.55, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},

  paginationStyle: {
    marginBottom: 10,
    position: 'absolute',
    top: height * 0.48,
    right: 35,
  },
  paginationStyleItemActive: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#000',
    margin: 0,
    marginHorizontal: 2,
  },
  paginationStyleItemInactive: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#ccc',
    opacity: 0.7,
    marginHorizontal: 2,
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#000',
    height: 50,
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  btnText: {color: '#fff', fontSize: 14, marginLeft: 10},
});
