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

const CARD_WIDTH = responsiveWidth(25.9);
const CARD_HEIGHT = responsiveHeight(10.1);
const CARD_GAP = responsiveWidth(3.7);

const MachineryCard = memo(({onViewAll, onPressItem}) => {
  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.item}
          onPress={() => onPressItem?.(item)}>
          
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.machineImage}
              resizeMode="contain"
            />
          </View>

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

  const keyExtractor = useCallback(item => item.id, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: CARD_WIDTH + CARD_GAP,
      offset: (CARD_WIDTH + CARD_GAP) * index,
      index,
    }),
    [],
  );

  const ItemSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <View style={styles.container}>
      
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

      <FlatList
        data={MACHINERY_DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal

        showsHorizontalScrollIndicator={false}

        contentContainerStyle={styles.listContent}

        ItemSeparatorComponent={ItemSeparator}

        getItemLayout={getItemLayout}

        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews

        nestedScrollEnabled

        bounces={false}
      />
    </View>
  );
});

export default MachineryCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: responsiveHeight(2.2),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: responsiveWidth(7.5),

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
    paddingLeft: responsiveWidth(7.5),
    paddingRight: responsiveWidth(7.5),
  },

  separator: {
    width: CARD_GAP,
  },

  item: {
    width: CARD_WIDTH,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,

    borderWidth: responsiveWidth(0.25),
    borderColor: '#E5E5E5',
    borderRadius: responsiveWidth(2.7),
    backgroundColor: '#FAFAFA',

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
  },

  machineImage: {
    width: responsiveWidth(14),
    height: responsiveHeight(8),
  },

  machineName: {
    width: CARD_WIDTH,

    marginTop: responsiveHeight(0.5),

    textAlign: 'center',

    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',

    color: '#111111',

    includeFontPadding: false,
  },
});