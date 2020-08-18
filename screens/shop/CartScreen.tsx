import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'
import { RootState } from "../../store";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const CartScreen: NavigationStackScreenComponent = ({}) => {
  const cartAmountTotal = useSelector(
    (state: RootState) => state.cart.totalAmount
  );
  const cartItems = useSelector((state: RootState) => {
    const transformedCartItems = [];
    for (const key in state.cart.cartItems) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.cartItems[key].productTitle,
        productPrice: state.cart.cartItems[key].productPrice,
        quantity: state.cart.cartItems[key].quantity,
        sum: state.cart.cartItems[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Card styles={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(Number(cartAmountTotal.toFixed(2)) * 100) / 100}</Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartAmountTotal))
          }}
          color={Colors.primary}
          disabled={cartItems.length <= 0}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={(itemData) =>
          <CartItem
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
          />
        }
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});

export default CartScreen;
