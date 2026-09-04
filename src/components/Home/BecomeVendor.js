import React, {memo, useCallback} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const BecomeVendor = memo(({onRegister}) => {
  const handleRegister = useCallback(() => {
    onRegister?.();
  }, [onRegister]);

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        Become a Vendor
      </Text>

      <View style={styles.banner}>
        <Image
          source={require('../../../assets/vendor/vendor.png')}
          resizeMode="cover"
          style={styles.vendorImage}
        />

        <LinearGradient
          colors={[
            '#F7F4F1',
            'rgba(247,244,241,0.98)',
            'rgba(247,244,241,0.75)',
            'rgba(247,244,241,0.15)',
            'rgba(247,244,241,0)',
          ]}
          locations={[
            0,
            0.28,
            0.48,
            0.70,
            1,
          ]}
          start={{
            x: 0,
            y: 0.5,
          }}
          end={{
            x: 1,
            y: 0.5,
          }}
          style={styles.imageGradient}
        />

        <View style={styles.content}>
          <Text style={styles.mainTitle}>
            Grow Your Business With Us
          </Text>

          <View style={styles.titleLine} />
          <Text style={styles.subtitle}>
            Become a Trusted Vendor
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleRegister}
            style={styles.registerButton}>

            <Text style={styles.registerText}>
              Register now
            </Text>

            <View style={styles.arrowCircle}>
              <Text style={styles.arrow}>
                →
              </Text>
            </View>

          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
});

export default BecomeVendor;

const styles = StyleSheet.create({

  container: {
    width: '100%',

    paddingHorizontal: responsiveWidth(4.5),

    marginTop: responsiveHeight(2.5),
  },

  sectionTitle: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '500',
    lineHeight: responsiveFontSize(3),
    fontWeight: '400',
    color: '#111111',
    marginBottom: responsiveHeight(2),
  },

  banner: {
    width: '100%',
    height: responsiveHeight(15),

    borderRadius: responsiveWidth(3.5),

    overflow: 'hidden',

    position: 'relative',

    backgroundColor: '#F7F4F1',
  },

  vendorImage: {
    position: 'absolute',

    right: -30,

    top: 0,

    width: responsiveWidth(58),

    height: '100%',

    zIndex: 1,
  },

  imageGradient: {
    position: 'absolute',

    left: 0,

    top: 0,

    width: responsiveWidth(72),

    height: '100%',

    zIndex: 2,
  },

  content: {
    position: 'absolute',

    left: responsiveWidth(5.5),

    top: responsiveHeight(3),

    zIndex: 5,

    width: responsiveWidth(60),
  },

  mainTitle: {
    fontSize: responsiveFontSize(1.9),
    lineHeight: responsiveFontSize(2),
    fontWeight: '700',
    color: '#292929',
    includeFontPadding: false,
  },

  titleLine: {
    width: responsiveWidth(39),

    height: responsiveHeight(0.2),

    backgroundColor: '#287FB5',

    marginTop: responsiveHeight(1.2),

    marginBottom: responsiveHeight(1),
  },

  subtitle: {
    fontSize: responsiveFontSize(1.7),
    lineHeight: responsiveFontSize(2.7),

    fontWeight: '400',

    color: '#454545',

    includeFontPadding: false,
  },

  registerButton: {
    marginTop: responsiveHeight(1),

    height: responsiveHeight(3.5),

    minWidth: responsiveWidth(39),

    alignSelf: 'flex-start',

    paddingHorizontal: responsiveWidth(3),

    borderRadius: responsiveWidth(6),

    backgroundColor: '#287FB5',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  registerText: {
    color: '#FFFFFF',

    fontSize: responsiveFontSize(1.5),

    lineHeight: responsiveFontSize(2),

    fontWeight: '500',

    includeFontPadding: false,
  },

  arrowCircle: {
    width: responsiveWidth(4),

    height: responsiveWidth(4),
    borderRadius: responsiveWidth(2),

    backgroundColor: '#FFFFFF',

    marginLeft: responsiveWidth(2),

    alignItems: 'center',

    justifyContent: 'center',
  },

  arrow: {
    color: '#287FB5',

    fontSize: responsiveFontSize(1.6),

    // lineHeight: responsiveFontSize(2),

    fontWeight: '700',

    includeFontPadding: false,
  },
});