import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Platform, ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector, useDispatch } from "react-redux";
import { DispatchThunk } from '../../store/index';
import { RootState } from "../../store";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";
import OrderItem from "../../components/shop/OrderItem";
import HeaderButton from "../../components/UI/HeaderButton";
import * as orderActions from "../../store/actions/order"
import Colors from "../../constants/Colors";

const OrdersScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<DispatchThunk>();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    loadOrders();
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        );
      }}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default OrdersScreen;
