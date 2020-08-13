import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CartItem from "../../models/cartItem";
import CartItemComponent from "./CartItem";
import Colors from "../../constants/Colors";

interface OrderItemProps {
  amount: number;
  date: string;
  items: CartItem[];
}

const OrderItem: React.FC<OrderItemProps> = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((cartItem, key) => {
            return (
              <CartItemComponent
                key={key}
                title={cartItem.productTitle}
                quantity={cartItem.quantity}
                amount={cartItem.sum}
                deletable={false}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;
