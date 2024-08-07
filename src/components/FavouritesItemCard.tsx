import { ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface FavouritesItemCardProps {
    id: string;
    imagelink_portrait: ImageProps;
    name: string;
    special_ingredient: string;
    type: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    description: string;
    favourite: boolean;
    toggleFavouriteItem: any;
}

const FavouritesItemCard: React.FC<FavouritesItemCardProps> = ({
    id,
    imagelink_portrait,
    name,
    special_ingredient,
    type,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    description,
    favourite,
    toggleFavouriteItem,
}) => {
    return (
        <View style={styles.cardContainer}>
            <ImageBackgroundInfo
                enableBackHandler={false}
                imagelink_portrait={imagelink_portrait}
                type={type}
                id={id}
                favourite={favourite}
                name={name}
                special_ingredient={special_ingredient}
                ingredients={ingredients}
                average_rating={average_rating}
                ratings_count={ratings_count}
                roasted={roasted}
                toggleFavourite={toggleFavouriteItem}
            />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={[
                    COLORS.primaryGreyHex,
                    COLORS.primaryBlackHex,
                ]}
                style={styles.containerLinearGradient}
            >
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </LinearGradient>
        </View>
    )
}

export default FavouritesItemCard

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
    },
    containerLinearGradient: {
        gap: SPACING.space_10,
        padding: SPACING.space_20,
    },
    descriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
    },
    descriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    }
})