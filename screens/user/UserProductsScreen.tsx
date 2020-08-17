import React from "react";
import { FlatList, Platform, Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { DrawerActions } from 'react-navigation-drawer';
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen: NavigationStackScreenComponent = ({navigation}) => {
  const userProducts = useSelector(
    (state: RootState) => state.products.userProducts
  );
  const dispatch = useDispatch();

  const editProductHandler = (id:string) => {
    navigation.navigate('EditProduct', {productId: id})
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          image={item.imageUrl}
          price={item.price}
          onSelect={() => {editProductHandler(item.id)}}
        >
          <Button
            title="Edit"
            onPress={() => {editProductHandler(item.id)}}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => {dispatch(productActions.deleteProduct(item.id))}}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
              navData.navigation.navigate('EditProduct')
            }}
          />
        </HeaderButtons>
      )
    },
  }
}

export default UserProductsScreen;
