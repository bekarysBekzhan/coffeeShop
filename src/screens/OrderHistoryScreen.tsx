import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/store'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PopUpAnimation from '../components/PopUpAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'

const OrderHistoryScreen = ({ navigation }: any) => {
  const orderHistoryList = useStore((state: any) => state.OrderHistoryList)
  const tabBarHeight = useBottomTabBarHeight()
  const [showAnimation, setShowAnimation] = useState(false)

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push("Details", {
      index,
      id,
      type
    });
  }

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }

  console.log('History = ', orderHistoryList);
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
                      navigationHandler={navigationHandler}
                      cartList={data.cartList}
                      cartListPrice={data.cartListPrice}
                      orderDate={data.orderDate}
                    />
                  );
                })}
              </View>


            )}
          </View>

          {orderHistoryList.length > 0 ? (
            <TouchableOpacity 
            style={styles.downloadButton}
            onPress={() => {
              buttonPressHandler();
            }}
            >
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          ) : <></>}
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
  },
  downloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  }
})