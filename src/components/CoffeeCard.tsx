import { Dimensions, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
    id: string;
    index: string;
    type: string;
    roasted: string;
    imagelink_square: string;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
            <ImageBackground
                source={imagelink_square}
                style={styles.cardImageBG}
                resizeMode='cover'
            >
                <View style={styles.cardRatingContainer}>
                    <CustomIcon name='star' color={COLORS.primaryOrangeHex} size={16} />
                    <Text style={styles.cardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
            <View style={styles.cardFooterRow}>
                <Text style={styles.cardPriceCurrency}>
                    $<Text style={styles.cardPrice}>{price.price}</Text>
                </Text>
                <TouchableOpacity onPress={() => {
                    buttonPressHandler({
                        id,
                        index,
                        name,
                        roasted,
                        imagelink_square,
                        special_ingredient,
                        type,
                        prices: [{ ...price, quantity: 1 }]
                    });
                }}>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default CoffeeCard

const styles = StyleSheet.create({
    cardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: SPACING.space_20,
        borderTopRightRadius: SPACING.space_20,
        top: 0, right: 0,
    },
    cardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    cardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    cardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    cardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    cardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    cardPrice: {
        color: COLORS.primaryWhiteHex
    }
})