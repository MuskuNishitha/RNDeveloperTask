import React, {memo, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Santosh P',
    role: 'Manager',
    duration: '02:35 s',
    image: require('../../../assets/testimonials/testimonial1.png'),
  },
  {
    id: '2',
    name: 'Santosh P',
    role: 'Manager',
    duration: '02:35 s',
    image: require('../../../assets/testimonials/testimonial2.png'),
  },
  {
    id: '3',
    name: 'Santosh P',
    role: 'Manager',
    duration: '02:35 s',
    image: require('../../../assets/testimonials/testimonial3.png'),
  },
];

const Testimonials = memo(({onPressItem}) => {
  const handlePress = useCallback(
    item => {
      onPressItem?.(item);
    },
    [onPressItem],
  );

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handlePress(item)}
        style={styles.card}>
        
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.image}
        />

        <LinearGradient
          colors={[
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0.15)',
            'rgba(0,0,0,0.82)',
          ]}
          locations={[0, 0.42, 1]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.bottomGradient}
        />

        <View style={styles.playButton}>
          <Ionicons
            name="play"
            size={responsiveWidth(5)}
            color="#FFFFFF"
            style={styles.playIcon}
          />
        </View>

        <View style={styles.bottomContent}>

          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>

            <Text style={styles.role} numberOfLines={1}>
              {item.role}
            </Text>
          </View>

          <Text style={styles.duration}>
            {item.duration}
          </Text>

        </View>
      </TouchableOpacity>
    ),
    [handlePress],
  );

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        Testimonials
      </Text>

      <FlatList
        data={TESTIMONIALS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        bounces={false}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
});

export default Testimonials;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: responsiveHeight(2.5),
  },

  sectionTitle: {
    marginLeft: responsiveWidth(4),
    marginBottom: responsiveHeight(2),

    color: '#111111',

    fontSize: responsiveFontSize(3),

    lineHeight: responsiveFontSize(3),

    fontWeight: '400',
  },

  listContent: {
    paddingLeft: responsiveWidth(4),
    paddingRight: responsiveWidth(4),
  },

  separator: {
    width: responsiveWidth(2.5),
  },

  card: {
    width: responsiveWidth(43),

    height: responsiveHeight(25),

    borderRadius: responsiveWidth(3.2),

    overflow: 'hidden',

    position: 'relative',

    backgroundColor: '#EEEEEE',

    borderWidth: responsiveWidth(0.15),

    borderColor: '#D9D9D9',
  },

  image: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: '100%',
    height: '100%',
  },

  bottomGradient: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: responsiveHeight(16),

    zIndex: 2,
  },

  playButton: {
    position: 'absolute',

    top: '43%',
    left: '50%',

    marginLeft: -responsiveWidth(6.3),
    marginTop: -responsiveWidth(6.3),

    width: responsiveWidth(12.6),
    height: responsiveWidth(12.6),

    borderRadius: responsiveWidth(6.3),

    borderWidth: responsiveWidth(0.4),

    borderColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 5,

    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  playIcon: {
    marginLeft: responsiveWidth(0.8),
  },

  bottomContent: {
    position: 'absolute',

    left: responsiveWidth(4),

    right: responsiveWidth(3),

    bottom: responsiveHeight(2),

    flexDirection: 'row',

    alignItems: 'flex-end',

    justifyContent: 'space-between',

    zIndex: 5,
  },

  nameContainer: {
    flex: 1,
    paddingRight: responsiveWidth(1),
  },

  name: {
    color: '#FFFFFF',

    fontSize: responsiveFontSize(2.25),

    lineHeight: responsiveFontSize(2.7),

    fontWeight: '500',
  },

  role: {
    marginTop: responsiveHeight(0.3),

    color: '#D8D8D8',

    fontSize: responsiveFontSize(1.7),

    lineHeight: responsiveFontSize(2.1),

    fontWeight: '400',
  },

  duration: {
    color: '#BDBDBD',

    fontSize: responsiveFontSize(1.65),

    lineHeight: responsiveFontSize(2.1),

    fontWeight: '400',

    marginBottom: responsiveHeight(0.2),
  },
});