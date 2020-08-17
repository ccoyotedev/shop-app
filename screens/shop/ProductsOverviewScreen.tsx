import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { DrawerActions } from 'react-navigation-drawer';

import { NavigationStackScreenComponent } from "react-navigation-stack";
import { RootState } from '../../store'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import Product from '../../models/product';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({navigation}) => {
  const products = useSelector((state: RootState) => state.products.availableProducts );
  const dispatch = useDispatch();

  const selectItemHandler = (id:string, title:string) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  }

  return (
    <FlatList
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


export default ProductsOverviewScreen;