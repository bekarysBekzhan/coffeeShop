import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import OrderItemCard from './OrderItemCard';

interface orderHistoryCardProps {
    navigationHandler: any;
    cartList: any;
    cartListPrice: string;
    orderDate: string;
}

const OrderHistoryCard: React.FC<orderHistoryCardProps> = ({
    navigationHandler,
    cartList,
    cartListPrice,
    orderDate,
}) => {
    console.log('orderDate: ', orderDate)
    console.log('cartListPrice: ', cartListPrice)
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.headerTitle}>Order Time</Text>
                    <Text style={styles.headerSubtitle}>{orderDate}</Text>
                </View>
            </View>
            <View style={styles.listContainer}>
                {cartList.map((data: any, index: any) => (
                    <TouchableOpacity 
                    key={index.toString() + data.id}
                    onPress={() => {
                        navigationHandler({
                            index: data.index,
                            id: data.id,
                            type: data.type,
                        })
                    }}
                    >
                        <OrderItemCard
                            type={data.type}
                            name={data.name}
                            imagelink_square={data.imagelink_square}
                            special_ingredient={data.special_ingredient}
                            prices={data.prices}
                            itemPrice={data.ItemPrice}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default OrderHistoryCard

const styles = StyleSheet.create({
    cardContainer: {
        gap: SPACING.space_10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    headerSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    headerPrice: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    listContainer: {
        gap: SPACING.space_20,
    }
})