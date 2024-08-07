import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/store'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PopUpAnimation from '../components/PopUpAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'

const OrderHistoryScreen = () => {
  const orderHistoryList = useStore((state: any) => state.OrderHistoryList)
  const tabBarHeight = useBottomTabBarHeight()
  const [showAnimation, setShowAnimation] = useState(false)

  console.log('History = ', orderHistoryList);
  return (
    <View style={styles.screenContainer}>

      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/successful.json')}
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
            <HeaderBar title='Order History' />

            {orderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (

              <View style={styles.listItemContainer}>
                {orderHistoryList.map((data: any, index: any) => {
                  console.log('cartListPrice = ', data.cartListPrice);
                  console.log('orderDate = ', data.orderDate);

                  return (
                    <OrderHistoryCard
                      key={index.toString()}
                      navigationHandler={() => { }}
                      cartList={data.cartList}
                      cartListPrice={data.cartListPrice}
                      orderDate={data.orderDate}
                    />
                  );
                })}
              </View>


            )}
          </View>
        </View>
      </ScrollView>

    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottieAnimation: {
    height: 250,
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
    gap: SPACING.space_30,
  }
})