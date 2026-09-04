import React, {memo, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MACHINERY_DATA = [
  {
    id: '1',
    name: 'Excavators',
    image: require('../../../assets/machinery/excavator.jpeg'),
  },
  {
    id: '2',
    name: 'Tractors',
    image: require('../../../assets/machinery/tractor.jpeg'),
  },

  {
    id: '4',
    name: 'Cranes',
    image: require('../../../assets/machinery/crane.jpeg'),
  },
  {
    id: '5',
    name: 'Loaders',
    image: require('../../../assets/machinery/loader.jpeg'),
  },
  {
    id: '6',
    name: 'Bulldozers',
    image: require('../../../assets/machinery/bulldozer.jpeg'),
  },
];

const CARD_WIDTH = 97;
const CARD_HEIGHT = 82;
const CARD_GAP = 14;

const MachineryCard = memo(({onViewAll, onPressItem}) => {
  /**
   * Machinery item
   */
  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.item}
          onPress={() => onPressItem?.(item)}>
          
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.machineImage}
              resizeMode="contain"
            />
          </View>

          {/* Machinery Name */}
          <Text
            style={styles.machineName}
            numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [onPressItem],
  );

  /**
   * Key extractor
   */
  const keyExtractor = useCallback(item => item.id, []);

  /**
   * Optimized FlatList layout
   */
  const getItemLayout = useCallback(
    (_, index) => ({
      length: CARD_WIDTH + CARD_GAP,
      offset: (CARD_WIDTH + CARD_GAP) * index,
      index,
    }),
    [],
  );

  /**
   * Separator
   */
  const ItemSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Hire Machineries
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onViewAll}>
          <Text style={styles.viewAll}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Machinery Horizontal List */}
      <FlatList
        data={MACHINERY_DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal

        showsHorizontalScrollIndicator={false}

        contentContainerStyle={styles.listContent}

        ItemSeparatorComponent={ItemSeparator}

        getItemLayout={getItemLayout}

        // Performance
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews

        // Nested inside Home FlatList
        nestedScrollEnabled

        // Avoid unnecessary bounce
        bounces={false}
      />
    </View>
  );
});

export default MachineryCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 18,
  },

  // ─────────────────────────────
  // Header
  // ─────────────────────────────

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 28,

    marginBottom: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#111111',
  },

  viewAll: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF8A00',
  },

  // ─────────────────────────────
  // FlatList
  // ─────────────────────────────

  listContent: {
    paddingLeft: 28,
    paddingRight: 28,
  },

  separator: {
    width: CARD_GAP,
  },

  // ─────────────────────────────
  // Item
  // ─────────────────────────────

  item: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },

  // ─────────────────────────────
  // Image Box
  // ─────────────────────────────

  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,

    borderWidth: 1,
    borderColor: '#E5E5E5',

    borderRadius: 10,

    backgroundColor: '#FAFAFA',

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
  },

  machineImage: {
    width: 82,
    height: 70,
  },

  // ─────────────────────────────
  // Name
  // ─────────────────────────────

  machineName: {
    width: CARD_WIDTH,

    marginTop: 7,

    textAlign: 'center',

    fontSize: 14,
    fontWeight: '400',

    color: '#111111',

    includeFontPadding: false,
  },
});