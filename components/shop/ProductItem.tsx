import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import Colors from "../../constants/Colors";

interface ProductItemProps {
  image: string;
  price: number;
  title: string;
  onViewDetail: () => void;
  onAddToCart: () => void;
}

interface TouchableCmpProps {
  children: any,
  onPress: () => void
}

const TouchableCmp: React.FC<TouchableCmpProps> = ({children, onPress}) => {
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    return <TouchableNativeFeedback onPress={onPress} useForeground>
      {children}
    </TouchableNativeFeedback>
  }

  return <TouchableOpacity onPress={onPress}>
    {children}
  </TouchableOpacity>
}

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  title,
  price,
  onViewDetail,
  onAddToCart,
}) => {

  return (
      <View style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={onViewDetail}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>£{price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                title="View Details"
                onPress={onViewDetail}
                color={Colors.primary}
              />
              <Button title="To Cart" onPress={onAddToCart} color={Colors.primary} />
            </View>
          </TouchableCmp>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  image: {
    height: "100%",
    width: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: 'open-sans'
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
