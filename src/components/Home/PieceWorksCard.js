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
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const PIECE_WORKS_DATA = [
  {
    id: '1',
    name: 'Interiors',
    image: require('../../../assets/pieceWorks/interiors.png'),
  },
  {
    id: '2',
    name: 'Plumbing',
    image: require('../../../assets/pieceWorks/plumbing.png'),
  },
  {
    id: '3',
    name: 'Electrical',
    image: require('../../../assets/pieceWorks/electrical.png'),
  },
  {
    id: '4',
    name: 'Painting',
    image: require('../../../assets/pieceWorks/painting.png'),
  },
  {
    id: '5',
    name: 'Carpentry',
    image: require('../../../assets/pieceWorks/electrical.png'),
  },
];

const ITEM_WIDTH = 89;
const ITEM_GAP = 13;

const PieceWorksCard = memo(({ onViewAll, onPressItem }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.item}
        onPress={() => onPressItem?.(item)}
      >
        <View style={styles.iconContainer}>
          <Image source={item.image} resizeMode="contain" style={styles.icon} />
        </View>

        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [onPressItem],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_WIDTH + ITEM_GAP,
      offset: (ITEM_WIDTH + ITEM_GAP) * index,
      index,
    }),
    [],
  );

  const Separator = useCallback(() => <View style={{ width: ITEM_GAP }} />, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Piece Works</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={onViewAll}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={PIECE_WORKS_DATA}
        horizontal
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        nestedScrollEnabled
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={3}
        removeClippedSubviews
        bounces={false}
      />
    </View>
  );
});

export default PieceWorksCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '500',
    color: '#111111',
    fontFamily: 'Satoshi-Bold',
  },

  viewAll: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: '#FF8A00',
  },

  listContent: {
    paddingHorizontal: 16,
  },

  item: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },

  iconContainer: {
    width: responsiveHeight(9),
    height: responsiveHeight(9),
    borderRadius: responsiveHeight(4.5),
    borderWidth: 0.5,
    borderColor: '#A3A3A3',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: responsiveWidth(10),
    height: responsiveHeight(30),
  },

  itemName: {
    width: ITEM_WIDTH,
    marginTop: 7,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',
    color: '#111111',
  },
});
