import React, {memo, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ADDITIONAL_SERVICES_DATA = [
  {
    id: '1',
    name: 'PMC Services',
    image: require('../../../assets/additionalServices/safety.png'),
  },
  {
    id: '2',
    name: 'Legal Services',
    image: require('../../../assets/additionalServices/legal.png'),
  },
  {
    id: '3',
    name: 'Safety Services',
    image: require('../../../assets/additionalServices/pmc.png'),
  },
  {
    id: '4',
    name: 'Consulting',
    image: require('../../../assets/additionalServices/legal.png'),
  },
];

const CARD_WIDTH = responsiveWidth(41);
const CARD_HEIGHT = responsiveHeight(17);
const CARD_GAP = responsiveWidth(2.7);

const AdditionalServicesCard = memo(
  ({onViewAll, onPressItem}) => {
    const renderItem = useCallback(
      ({item}) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => onPressItem?.(item)}>
          
          <Image
            source={item.image}
            resizeMode="cover"
            style={styles.backgroundImage}
          />

          <View style={styles.overlayContainer}>
            <Text
              style={styles.serviceName}
              numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      ),
      [onPressItem],
    );

    const keyExtractor = useCallback(
      item => item.id,
      [],
    );

    const getItemLayout = useCallback(
      (_, index) => ({
        length: CARD_WIDTH + CARD_GAP,
        offset: (CARD_WIDTH + CARD_GAP) * index,
        index,
      }),
      [],
    );

    const Separator = useCallback(
      () => <View style={styles.separator} />,
      [],
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Additional Services
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onViewAll}>
            <Text style={styles.viewAll}>
              View all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ADDITIONAL_SERVICES_DATA}
          horizontal
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          ItemSeparatorComponent={Separator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          nestedScrollEnabled
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={3}
          removeClippedSubviews
          bounces={false}
        />
      </View>
    );
  },
);

export default AdditionalServicesCard;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(2.7),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4.3),
    marginBottom: responsiveHeight(1.5),
  },

  title: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '500',
    color: '#111111',
  },

  viewAll: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: '#FF8A00',
  },

  listContent: {
    paddingHorizontal: responsiveWidth(4.3),
  },

  separator: {
    width: CARD_GAP,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: responsiveWidth(3.2),
    overflow: 'hidden',
    backgroundColor: '#EEEEEE',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  overlayContainer: {
    position: 'absolute',
    left: responsiveWidth(3.2),
    right: responsiveWidth(3.2),
    bottom: responsiveHeight(1.2),
    height: responsiveHeight(3),

    borderRadius: responsiveWidth(5.3),

    backgroundColor: 'rgba(255,255,255,0.88)',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: responsiveWidth(2.7),
  },

  serviceName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: '#111111',
    textAlign: 'center',
  },
});