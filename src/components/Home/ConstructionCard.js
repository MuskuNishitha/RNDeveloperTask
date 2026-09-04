import React, { memo, useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const CONSTRUCTION_DATA = [
  {
    id: '1',
    title: 'Residential',
    subtitle: 'Build your Home',
    image: require('../../../assets/construction/residential.png'),
    theme: 'blue',
  },
  {
    id: '2',
    title: 'Commercial',
    subtitle: 'Build your Home',
    image: require('../../../assets/construction/commercial.png'),
    theme: 'orange',
  },
  {
    id: '3',
    title: 'Land Development',
    subtitle: 'Build your Home',
    image: require('../../../assets/construction/land-development.png'),
    theme: 'orange',
  },
  {
    id: '4',
    title: 'Industries',
    subtitle: 'Build your Home',
    image: require('../../../assets/construction/industries.png'),
    theme: 'blue',
  },
];

const ConstructionCard = memo(({ onPressItem }) => {
  const handlePress = useCallback(
    item => {
      onPressItem?.(item);
    },
    [onPressItem],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Construction</Text>
      <View style={styles.grid}>
        {CONSTRUCTION_DATA.map(item => {
          const isBlue = item.theme === 'blue';
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handlePress(item)}
              style={[
                styles.card,
                {
                  borderColor: isBlue ? '#D8EEFF' : '#F9E1D0',

                  backgroundColor: isBlue ? '#F9FCFF' : '#FFFDFC',
                },
              ]}
            >
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>

                <View style={styles.exploreContainer}>
                  <Text
                    style={[
                      styles.exploreText,
                      {
                        color: isBlue ? '#2780B9' : '#FF8A2A',
                      },
                    ]}
                  >
                    Explore
                  </Text>

                  <View
                    style={[
                      styles.arrowCircle,
                      {
                        backgroundColor: isBlue ? '#2780B9' : '#FF8A2A',
                      },
                    ]}
                  >
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.imageBackground,
                  {
                    backgroundColor: isBlue ? '#EAF6FF' : '#FFF0E3',
                  },
                ]}
              />

              <Image
                source={item.image}
                resizeMode="contain"
                style={styles.constructionImage}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

export default ConstructionCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',

    marginTop: responsiveHeight(2.2),

    paddingHorizontal: responsiveWidth(5),
  },

  sectionTitle: {
    fontSize: responsiveFontSize(2.8),

    lineHeight: responsiveHeight(3.6),

    fontWeight: '700',

    color: '#111111',

    marginBottom: responsiveHeight(2),
  },

  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: responsiveHeight(1.4),
  },

  card: {
    width: responsiveWidth(44.5),
    height: responsiveHeight(14),
    borderWidth: responsiveWidth(0.25),

    borderRadius: responsiveWidth(3.5),

    overflow: 'hidden',

    position: 'relative',
    paddingLeft: responsiveWidth(1.4),
    paddingTop: responsiveHeight(1.5),
  },

  content: {
    zIndex: 3,
  },

  title: {
    maxWidth: responsiveWidth(30),
    fontSize: responsiveFontSize(2.3),
    lineHeight: responsiveHeight(2),
    fontWeight: '500',

    color: '#222222',
  },

  subtitle: {
    marginTop: responsiveHeight(0.2),

    fontSize: responsiveFontSize(1.7),

    lineHeight: responsiveHeight(2.3),

    fontWeight: '400',

    color: '#898989',
  },

  exploreContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: responsiveHeight(1.7),
  },

  exploreText: {
    fontSize: responsiveFontSize(2),

    lineHeight: responsiveHeight(2.6),

    fontWeight: '600',
  },

  arrowCircle: {
    width: responsiveWidth(4.8),

    height: responsiveWidth(4.8),

    borderRadius: responsiveWidth(2.4),

    marginLeft: responsiveWidth(1.5),

    alignItems: 'center',

    justifyContent: 'center',
  },

  arrow: {
    color: '#FFFFFF',

    fontSize: responsiveFontSize(1.7),

    lineHeight: responsiveFontSize(2),

    fontWeight: '700',

    includeFontPadding: false,
  },

  imageBackground: {
    position: 'absolute',

    width: responsiveWidth(20),

    height: responsiveWidth(17),

    right: responsiveWidth(2),

    bottom: responsiveHeight(-0.5),

    borderRadius: responsiveWidth(10),

    opacity: 0.9,

    transform: [
      {
        rotate: '-8deg',
      },
    ],
  },

  constructionImage: {
    position: 'absolute',
    width: responsiveWidth(14),
    height: responsiveHeight(6.8),
    right: responsiveWidth(0.2),
    bottom: responsiveHeight(0.5),
    zIndex: 2,
  },
});
