import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { DrawerActions } from 'react-navigation-drawer';

import { NavigationStackScreenComponent } from "react-navigation-stack";
import { RootState } from '../../store'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import Product from '../../models/product';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({navigation}) => {
  const products = useSelector((state: RootState) => state.products.availableProducts );
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={({item}) => 
        <ProductItem
          title={item.title}
          image={item.imageUrl}
          price={item.price}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(item))
          }}
          onViewDetail={() => {
            navigation.navigate('ProductDetail', {
              productId: item.id,
              productTitle: item.title
            });
          }}
        />
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


export default ProductsOverviewScreen;