import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { DEFAULT_LOCATION } from '../../config/DefaultLocation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeHeader = ({ location = DEFAULT_LOCATION }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();

  // Real top offset for THIS device only — no SafeAreaView double-padding
  const topOffset =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  // ==========================================
  // BANNERS
  // ==========================================
  const banners = useMemo(
    () => [
      {
        id: '1',
        title: 'Guest House layout',
        subtitle: 'Completed Project',
        image: require('../../../assets/images/house1.png'),
        background: ['#1B9CD9', '#7FCBEA'],
      },
      {
        id: '2',
        title: 'Luxury Villa',
        subtitle: 'New Project',
        image: require('../../../assets/images/house1.png'),
        background: ['#7B61FF', '#B8A9FF'],
      },
      {
        id: '3',
        title: 'Modern Apartment',
        subtitle: 'Completed Project',
        image: require('../../../assets/images/house1.png'),
        background: ['#00A88F', '#8DE3D4'],
      },
    ],
    [],
  );

  const activeBanner = banners[activeIndex] || banners[0];

  // ==========================================
  // SLIDER CHANGE
  // ==========================================
  const handleSliderChange = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index >= 0 && index < banners.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // ==========================================
  // BANNER ITEM (transparent — sits on the one shared gradient)
  // ==========================================
  const renderBanner = ({ item }) => (
    <View style={styles.bannerWrapper}>
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>

      <Image source={item.image} style={styles.houseImage} resizeMode="contain" />
    </View>
  );

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <LinearGradient
        colors={activeBanner.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container,{ paddingTop: topOffset} ]} 
      >
        {/* Location Row */}
        <View style={styles.locationRow}>
          <TouchableOpacity activeOpacity={0.7} style={styles.locationButton}>
            <Ionicons name="location" size={responsiveWidth(5)} color="#FFFFFF" />
            <Text style={styles.locationText} numberOfLines={1}>
              {location?.name || 'Madhapur, Hyderabad'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={responsiveWidth(4)}
              color="#FFFFFF"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={responsiveWidth(6.5)} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={responsiveWidth(5.5)} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder} numberOfLines={1}>
            Search properties, services, machineries
          </Text>
        </View>

        {/* Banner FlatList */}
        <FlatList
          ref={flatListRef}
          data={banners}
          keyExtractor={item => item.id}
          renderItem={renderBanner}
          horizontal
          pagingEnabled
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleSliderChange}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
        />

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View key={index} style={[styles.dot, index === activeIndex && styles.activeDot]} />
          ))}
        </View>
      </LinearGradient>
    </>
  );
};

export default HomeHeader;

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: responsiveHeight(1.5),
    borderBottomLeftRadius: responsiveWidth(7),
    borderBottomRightRadius: responsiveWidth(7),
    overflow: 'hidden',
  },
  locationRow: {
    width: '100%',
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: responsiveWidth(3),
  },
  locationText: {
    marginLeft: responsiveWidth(2),
    color: '#FFFFFF',
    fontFamily: 'Satoshi-Medium',
    fontSize: responsiveFontSize(2.1),
    fontWeight: '500',
    lineHeight: responsiveFontSize(2.5),
    flexShrink: 1,
  },
  arrowIcon: {
    marginLeft: responsiveWidth(2),
  },
  notificationButton: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: responsiveWidth(0.6),
    right: responsiveWidth(0.6),
    width: responsiveWidth(1.8),
    height: responsiveWidth(1.8),
    borderRadius: responsiveWidth(1),
    backgroundColor: '#FF9D3D',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  searchContainer: {
    height: responsiveHeight(5.2),
    marginTop: responsiveHeight(1.6),
    marginHorizontal: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveHeight(2.6),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: responsiveWidth(3),
    color: '#9CA3AF',
    fontFamily: 'Satoshi-Regular',
    fontSize: responsiveFontSize(1.7),
    fontWeight: '400',
  },
  bannerWrapper: {
    width: SCREEN_WIDTH,
    height: responsiveHeight(12),
    paddingHorizontal: responsiveWidth(6),
    marginTop: responsiveHeight(2),
    justifyContent: 'flex-start',
  },
  bannerTextContainer: {
    zIndex: 5,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontFamily: 'Satoshi-Medium',
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
    lineHeight: responsiveFontSize(2.7),
    maxWidth: responsiveWidth(55),
  },
  bannerSubtitle: {
    marginTop: responsiveHeight(0.6),
    color: '#FFFFFF',
    fontFamily: 'Satoshi-Regular',
    fontSize: responsiveFontSize(1.7),
    fontWeight: '400',
    lineHeight: responsiveFontSize(2.1),
  },
  houseImage: {
    position: 'absolute',
    width: responsiveWidth(55),
    height: responsiveHeight(25),
    right: 0,
    bottom: responsiveHeight(-6),
    zIndex: 999999,
  },
  dotsContainer: {
    marginTop: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: responsiveWidth(4),
    height: responsiveHeight(0.45),
    marginRight: responsiveWidth(1.8),
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  activeDot: {
    width: responsiveWidth(8),
    backgroundColor: '#FFFFFF',
  },
});