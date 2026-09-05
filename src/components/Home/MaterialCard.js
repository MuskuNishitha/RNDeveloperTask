import React, { memo, useCallback } from 'react';
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

const MATERIAL_DATA = [
  {
    id: '1',
    name: 'Iron & Steel\nRods',
    image: require('../../../assets/material/iron-steel.jpeg'),
  },
  {
    id: '2',
    name: 'Cement',
    image: require('../../../assets/material/cement.webp'),
  },
  {
    id: '3',
    name: 'Plywood',
    image: require('../../../assets/material/plywood.jpeg'),
  },
  {
    id: '4',
    name: 'Bricks',
    image: require('../../../assets/material/bricks.jpeg'),
  },
  {
    id: '5',
    name: 'Tiles',
    image: require('../../../assets/material/tiles.jpeg'),
  },
];

const CARD_WIDTH = responsiveWidth(35.2);
const CARD_GAP = responsiveWidth(5.3);

const MaterialCard = memo(({ onViewAll, onPressItem }) => {
  const renderMaterial = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => onPressItem?.(item)}
        >
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.materialImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.materialName} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [onPressItem],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: CARD_WIDTH + CARD_GAP,
      offset: (CARD_WIDTH + CARD_GAP) * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Material Suppliers</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={onViewAll}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MATERIAL_DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderMaterial}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        nestedScrollEnabled
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews
      />
    </View>
  );
});

export default MaterialCard;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(2.2),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4.8),
    marginBottom: responsiveHeight(2),
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
    paddingLeft: responsiveWidth(4.8),
    paddingRight: responsiveWidth(4.8),
  },

  separator: {
    width: CARD_GAP,
  },

  card: {
    width: CARD_WIDTH,
    height: responsiveHeight(20.7),
    borderWidth: responsiveWidth(0.25),
    borderColor: '#E7E7E7',
    borderRadius: responsiveWidth(3.5),
    backgroundColor: '#FAFAFA',
    padding: responsiveWidth(2.1),
    alignItems: 'center',
  },

  imageContainer: {
    width: '100%',
    height: responsiveHeight(10.8),
    borderRadius: responsiveWidth(2.9),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  materialImage: {
    width: '100%',
    height: '100%',
  },

  materialName: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveFontSize(2),
    fontWeight: '500',
    color: '#111111',
    marginTop: responsiveHeight(0.5),
  },
});
