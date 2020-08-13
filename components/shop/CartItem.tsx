import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface CartItemProps {
  onRemove?: () => void,
  title: string,
  quantity: number,
  amount: number,
  deletable?: boolean
}

const CartItem: React.FC<CartItemProps> = ({onRemove, quantity, amount, title, deletable = true}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} x </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )} 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
})

export default CartItem;