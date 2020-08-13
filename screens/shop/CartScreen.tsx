import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import { RootState } from "../../store";
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
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartAmountTotal.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {}}
          color={Colors.primary}
          disabled={cartItems.length <= 0}
        />
      </View>
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

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
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
