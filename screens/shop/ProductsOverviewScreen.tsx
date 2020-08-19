import React, { useEffect, useState, useCallback } from 'react'
import { DispatchThunk } from '../../store/index'
import { FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { DrawerActions } from 'react-navigation-drawer';

import { NavigationStackScreenComponent } from "react-navigation-stack";
import { RootState } from '../../store'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({navigation}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState();
  const products = useSelector((state: RootState) => state.products.availableProducts );
  const dispatch = useDispatch<DispatchThunk>();

  const loadProducts = useCallback(async () => {
    setError(undefined);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);
    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id:string, title:string) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured:</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found... Try adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={({item}) => 
        <ProductItem
          title={item.title}
          image={item.imageUrl}
          price={item.price}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <Button
            title="View Details"
            onPress={() => selectItemHandler(item.id, item.title)}
            color={Colors.primary}
          />
          <Button title="To Cart" onPress={() => dispatch(cartActions.addToCart(item))} color={Colors.primary} />
        </ProductItem>
      }
    />
  );
}

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.dispatch(DrawerActions.toggleDrawer())
            }}
          />
        </HeaderButtons>
      )
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              navData.navigation.navigate('Cart')
            }}
          />
        </HeaderButtons>
      )
    }
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default ProductsOverviewScreen;