import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import CartItem from '../components/CartItem'
import PopUpAnimation from '../components/PopUpAnimation'

const CartScreen = ({ navigation, route }: any) => {
  const cartList = useStore((state: any) => state.CartList);
  const cartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart)
  const [showAnimation, setShowAnimation] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000)
  }

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  }

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  }

  console.log('Cartlist = ', cartList.length);
  console.log('CartPrice = ', cartPrice);
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.itemContainer}>
            <HeaderBar title='Cart' />
            {cartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is empty'} />
            ) : (
              <View>
                {cartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      })
                    }}
                    key={data.id}
                  >
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                      decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {cartList.length != 0 ? (
            <PaymentFooter
              price={{ price: cartPrice, currency: '$' }}
              buttonPressHandler={buttonPressHandler}
              buttonTitle='Add to Orders'
            />
          ) : (
            <></>
          )}

        </View>
      </ScrollView>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottieAnimation: {
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  }
})