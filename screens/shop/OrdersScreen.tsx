import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";
import OrderItem from "../../components/shop/OrderItem";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const orders = useSelector((state: RootState) => state.orders.orders);
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

export default OrdersScreen;
