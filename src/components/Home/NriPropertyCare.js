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

const NriPropertyCare = memo(({onKnowMore}) => {
  const handleKnowMore = useCallback(() => {
    onKnowMore?.();
  }, [onKnowMore]);

  return (
    <View style={styles.container}>
      {/* ==========================================
          SECTION TITLE
      ========================================== */}

      <Text style={styles.sectionTitle}>
        Property Care for NRIs
      </Text>

      {/* ==========================================
          MAIN BANNER
      ========================================== */}

      <View style={styles.card}>

        {/* ========================================
            IMAGE
        ========================================= */}

        <Image
          source={require('../../../assets/nri/nri_new.png')}
          resizeMode="cover"
          style={styles.nriImage}
        />

        {/* ========================================
            WHITE / BLUE GRADIENT OVER IMAGE
            This overlaps the image to create
            the smooth fade seen in the design.
        ========================================= */}

        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.05)',
            'rgba(255,255,255,0.45)',
            'rgba(255,255,255,0.88)',
            '#FFFFFF',
            '#EAF7FF',
          ]}
          locations={[
            0,
            0.12,
            0.28,
            0.43,
            0.65,
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
          style={styles.contentGradient}
          pointerEvents="box-none"
        >

          {/* ====================================
              CONTENT
          ==================================== */}

          <View style={styles.content}>

            <Text
              style={styles.contentTitle}
              numberOfLines={1}
            >
              Residential & Commercial
            </Text>

            <Text
              style={styles.contentTitle}
              numberOfLines={1}
            >
              Property Care
            </Text>

            {/* ==================================
                SERVICES
            ================================== */}

            <View style={styles.servicesRow}>

              <View style={styles.serviceItem}>
                <Text style={styles.bullet}>•</Text>

                <Text
                  style={styles.serviceText}
                  numberOfLines={1}
                >
                  Construction
                </Text>
              </View>

              <View style={styles.serviceItem}>
                <Text style={styles.bullet}>•</Text>

                <Text
                  style={styles.serviceText}
                  numberOfLines={1}
                >
                  Maintenance
                </Text>
              </View>

            </View>
          </View>

          {/* ====================================
              KNOW MORE BUTTON
          ==================================== */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleKnowMore}
            style={styles.knowMoreButton}
          >
            <Text style={styles.knowMoreText}>
              Know More
            </Text>

            <View style={styles.buttonArrowCircle}>
              <Text style={styles.buttonArrow}>
                →
              </Text>
            </View>
          </TouchableOpacity>

        </LinearGradient>

      </View>
    </View>
  );
});

export default NriPropertyCare;

const styles = StyleSheet.create({

  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    width: '100%',

    paddingHorizontal: responsiveWidth(4.5),

    marginTop: responsiveHeight(2.5),
  },

  // ==========================================
  // SECTION TITLE
  // ==========================================

  sectionTitle: {
    fontSize: responsiveFontSize(2.7),

    lineHeight: responsiveFontSize(3.7),

    fontWeight: '400',

    color: '#111111',

    marginBottom: responsiveHeight(2),
  },

  // ==========================================
  // MAIN CARD
  // ==========================================

  card: {
    width: '100%',

    height: responsiveHeight(15.5),

    minHeight: responsiveHeight(15),

    position: 'relative',

    overflow: 'hidden',

    borderRadius: responsiveWidth(3.5),

    borderWidth: responsiveWidth(0.15),

    borderColor: '#E7EEF2',

    backgroundColor: '#EAF7FF',
  },

  // ==========================================
  // NRI IMAGE
  // ==========================================

  nriImage: {
    position: 'absolute',

    left: 0,

    top: 0,

    width: responsiveWidth(58),

    height: '100%',

    zIndex: 1,

    borderTopRightRadius: responsiveWidth(3.5),

    borderBottomRightRadius: responsiveWidth(3.5),
  },

  // ==========================================
  // CONTENT GRADIENT
  // ==========================================

  contentGradient: {
    position: 'absolute',

    left: responsiveWidth(23),

    right: 0,

    top: 0,

    bottom: 0,

    zIndex: 3,

    justifyContent: 'space-between',

    paddingLeft: responsiveWidth(14),

    paddingTop: responsiveHeight(2.2),

    paddingBottom: responsiveHeight(1.7),
  },

  // ==========================================
  // CONTENT
  // ==========================================

  content: {
    width: responsiveWidth(58),

    zIndex: 5,
  },

  // ==========================================
  // TITLE
  // ==========================================

  contentTitle: {
    fontSize: responsiveFontSize(2),

    lineHeight: responsiveFontSize(2.35),

    fontWeight: '700',

    color: '#202020',

    includeFontPadding: false,
  },

  // ==========================================
  // SERVICES ROW
  // ==========================================

  servicesRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: responsiveHeight(1),
  },

  // ==========================================
  // SERVICE ITEM
  // ==========================================

  serviceItem: {
    flexDirection: 'row',

    alignItems: 'center',

    marginRight: responsiveWidth(4.5),
  },

  // ==========================================
  // BULLET
  // ==========================================

  bullet: {
    fontSize: responsiveFontSize(1.8),

    lineHeight: responsiveFontSize(2),

    color: '#222222',

    marginRight: responsiveWidth(1.3),

    includeFontPadding: false,
  },

  // ==========================================
  // SERVICE TEXT
  // ==========================================

  serviceText: {
    fontSize: responsiveFontSize(1.35),

    lineHeight: responsiveFontSize(1.8),

    color: '#333333',

    fontWeight: '500',

    includeFontPadding: false,
  },

  // ==========================================
  // KNOW MORE BUTTON
  // ==========================================

  knowMoreButton: {
    alignSelf: 'flex-end',

    minWidth: responsiveWidth(36),

    height: responsiveHeight(3.5),

    borderTopLeftRadius: responsiveWidth(6),

    borderBottomLeftRadius: responsiveWidth(6),

    backgroundColor: '#287FB5',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: responsiveWidth(3.5),

    marginBottom: responsiveHeight(0.2),

    zIndex: 10,
  },

  // ==========================================
  // BUTTON TEXT
  // ==========================================

  knowMoreText: {
    color: '#FFFFFF',

    fontSize: responsiveFontSize(1.75),

    fontWeight: '500',

    lineHeight: responsiveFontSize(2.2),

    includeFontPadding: false,
  },

  // ==========================================
  // BUTTON ARROW CIRCLE
  // ==========================================

  buttonArrowCircle: {
    width: responsiveWidth(4.2),

    height: responsiveWidth(4.2),

    marginLeft: responsiveWidth(1.8),

    borderRadius: responsiveWidth(2.1),

    backgroundColor: '#FFFFFF',

    alignItems: 'center',

    justifyContent: 'center',
  },

  // ==========================================
  // ARROW
  // ==========================================

  buttonArrow: {
    color: '#287FB5',

    fontSize: responsiveFontSize(1.6),

    fontWeight: '700',

    lineHeight: responsiveFontSize(2),

    includeFontPadding: false,
  },
});