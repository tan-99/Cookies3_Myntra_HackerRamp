import { View, Text, FlatList, StatusBar, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard';
import products from '../../data/products';
import { Dropdown } from 'react-native-element-dropdown';

const Explore = () => {

  const dropdownItems = [
    { title: 'All', id: 0 },
    { title: 'Top Wear', id: 1 },
    { title: 'Bottom Wear', id: 2 },
    { title: 'Jackets', id: 3 },
    { title: 'Foot Wear', id: 4 },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [headingTitle, setHeadingTitle] = useState("");

  const filterProducts = () => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  };

  useEffect(() => {
    if (selectedCategory === 'All') {
      setHeadingTitle("All Products");
    } else {
      setHeadingTitle(`Search for "${selectedCategory}"`);
    }
  }, [selectedCategory]);

  return (
    <View className="mx-4">
      {/* <View>
        <Text className="text-center my-2">All Products</Text>
      </View> */}
      <View className="mb-4">
        <Dropdown 
          style={styles.dropdown}
          data={dropdownItems}
          search
          mode='modal'
          labelField="title"
          valueField="id"
          placeholder="Filter Products"
          searchPlaceholder="Search..."
          value={selectedCategory}
          onChange={item => {
            setSelectedCategory(item.title);
          }}
        />
        <View className="text-center">
          <Text className="text-center text-md font-semibold text-pink-500">{headingTitle}</Text>
        </View>
      </View>
      <View style={styles.productContainer}>
        {/* <ProductCard />
        <ProductCard /> */}
        <FlatList
          numColumns={2}
          data={filterProducts()}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  productContainer: {
    height: 600,
  },
});

export default Explore