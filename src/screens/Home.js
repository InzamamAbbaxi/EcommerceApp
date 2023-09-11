import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Badge} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';

const Home = ({navigation, route}) => {
  const cart = useSelector(state => state.cart);
  const categoryRef = useRef(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/products/categories',
        );
        const data = await response.json();
        setCategoriesList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products');
      const res = await response.json();
      setData(res?.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAllProductsByCategory = async selectedCategory => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`,
      );
      const res = await response.json();
      setData(res?.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedCategory == 'all') {
      fetchAllProducts();
    } else {
      fetchAllProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category, index) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f8f8f8'} />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.title}>Let's</Text>
          <Text style={styles.title}>Get Started!</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{position: 'absolute', top: 10, right: 25}}>
          <AntDesign name="shoppingcart" size={25} color="#000" />
          <Badge style={{position: 'absolute', right: -5, top: -3}} size={14}>
            {cart?.length}
          </Badge>
        </TouchableOpacity>
        <View style={{marginVertical: 15}}>
          <FlatList
            scrollEnabled={true}
            ref={categoryRef}
            data={categoriesList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.toString()}
            ListFooterComponent={() => <View style={{width: 20}} />}
            ListHeaderComponent={() => (
              <TouchableOpacity
                onPress={() => handleCategoryChange('all', 0)}
                style={[
                  styles.categoryCard,
                  selectedCategory === 'all' && styles.categoryCardActive,
                  {marginLeft: 20},
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === 'all' && styles.categoryTextActive,
                  ]}>
                  All
                </Text>
              </TouchableOpacity>
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleCategoryChange(item, index)}
                style={[
                  styles.categoryCard,
                  selectedCategory === item && styles.categoryCardActive,
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextActive,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View style={{}}>
            <FlatList
              scrollEnabled={false}
              data={data}
              key={'_2_'}
              numColumns={2}
              columnWrapperStyle={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.productCard}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {id: item?.id})
                  }>
                  <Image
                    source={{uri: item?.thumbnail}}
                    style={{height: 150, width: '100%'}}
                    resizeMode="cover"
                  />
                  <View style={{padding: 10}}>
                    <Text style={{color: '#000000', fontSize: 13}}>
                      {item?.title}
                    </Text>
                    <View style={styles.rowViewSB}>
                      <Text style={styles.price}>${item?.price}</Text>
                      <Rating
                        ratingCount={5}
                        showRating={false}
                        imageSize={12}
                        startingValue={item?.rating}
                        //   onFinishRating={this.ratingCompleted}
                        style={{paddingVertical: 10}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '800',
  },
  categoryCard: {
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 25,
  },
  categoryCardActive: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#000',
    marginRight: 10,
    borderRadius: 25,
  },
  categoryText: {
    color: '#000000',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,

    width: '48%',
    marginBottom: 12,
    overflow: 'hidden',

    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  price: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
