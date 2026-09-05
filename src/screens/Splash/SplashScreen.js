import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {GOOGLE_MAP_KEY} from '../../config/BaseUrl';
import {DEFAULT_LOCATION} from '../../config/DefaultLocation';
import {responsiveHeight} from 'react-native-responsive-dimensions';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  locationProvider: 'playServices',
});

const FINE_LOCATION_PERMISSION =
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
const COARSE_LOCATION_PERMISSION =
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

const ANDROID_LOCATION_PERMISSIONS = [
  FINE_LOCATION_PERMISSION,
  COARSE_LOCATION_PERMISSION,
];

const hasGrantedAndroidLocation = statuses =>
  ANDROID_LOCATION_PERMISSIONS.some(
    permission => statuses[permission] === PermissionsAndroid.RESULTS.GRANTED,
  );

const ensureLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const [hasFineLocation, hasCoarseLocation] = await Promise.all([
      PermissionsAndroid.check(FINE_LOCATION_PERMISSION),
      PermissionsAndroid.check(COARSE_LOCATION_PERMISSION),
    ]);

    if (hasFineLocation || hasCoarseLocation) {
      return {
        granted: true,
        precise: hasFineLocation,
      };
    }

    const requestedPermissions = await PermissionsAndroid.requestMultiple(
      ANDROID_LOCATION_PERMISSIONS,
    );

    return {
      granted: hasGrantedAndroidLocation(requestedPermissions),
      precise:
        requestedPermissions[FINE_LOCATION_PERMISSION] ===
        PermissionsAndroid.RESULTS.GRANTED,
    };
  }

  return {
    granted: true,
    precise: false,
  };
};

const getAddressPart = (addressComponents, types) => {
  const addressComponent = types
    .map(type =>
      addressComponents.find(component => component.types.includes(type)),
    )
    .find(Boolean);

  return addressComponent?.long_name;
};

const removeDuplicateAddressParts = addressParts => {
  const seenAddressParts = new Set();

  return addressParts.filter(addressPart => {
    const normalizedAddressPart = addressPart.toLowerCase();

    if (seenAddressParts.has(normalizedAddressPart)) {
      return false;
    }

    seenAddressParts.add(normalizedAddressPart);
    return true;
  });
};

const formatAddressFromResult = geocodeResult => {
  if (geocodeResult?.formatted_address) {
    return geocodeResult.formatted_address;
  }

  const addressComponents = geocodeResult?.address_components || [];
  const area = getAddressPart(addressComponents, [
    'sublocality_level_1',
    'sublocality_level_2',
    'sublocality',
    'neighborhood',
  ]);
  const city = getAddressPart(addressComponents, [
    'locality',
    'administrative_area_level_3',
    'administrative_area_level_2',
  ]);
  const state = getAddressPart(addressComponents, [
    'administrative_area_level_1',
  ]);
  const postalCode = getAddressPart(addressComponents, ['postal_code']);
  const country = getAddressPart(addressComponents, ['country']);
  const stateWithPostalCode = [state, postalCode].filter(Boolean).join(' ');
  const addressParts = removeDuplicateAddressParts(
    [area, city, stateWithPostalCode, country].filter(Boolean),
  );

  return addressParts.length
    ? addressParts.join(', ')
    : null;
};

const getBestGeocodeResult = results => {
  return (
    results.find(result =>
      result.types.some(type =>
        [
          'sublocality',
          'sublocality_level_1',
          'neighborhood',
          'locality',
          'street_address',
          'premise',
        ].includes(type),
      ),
    ) || results[0]
  );
};

const reverseGeocodeLocation = async ({latitude, longitude}) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en&key=${GOOGLE_MAP_KEY}`,
    );
    const geocodeData = await response.json();

    if (geocodeData.status !== 'OK' || !geocodeData.results?.length) {
      console.log('Reverse Geocode Error:', geocodeData.status);
      return null;
    }

    const geocodeResult = getBestGeocodeResult(geocodeData.results);
    return formatAddressFromResult(geocodeResult);
  } catch (error) {
    console.log('Reverse Geocode Error:', error);
    return null;
  }
};

const requestCurrentPosition = options => {
  return new Promise(resolve => {
    let didFinish = false;

    const finish = location => {
      if (didFinish) {
        return;
      }

      didFinish = true;
      clearTimeout(timeoutId);
      resolve(location);
    };

    const timeoutId = setTimeout(() => {
      console.log('Location Attempt Error: timed out');
      finish(null);
    }, options.timeout);

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        finish({
          name: 'Current Location',
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          isDefault: false,
        });
      },
      error => {
        console.log('Location Attempt Error:', error);
        finish(null);
      },
      options,
    );
  });
};

const withLocationName = async location => {
  if (!location || location.isDefault) {
    return location;
  }

  const address = await reverseGeocodeLocation(location);

  return {
    ...location,
    name: address || `${location.latitude}, ${location.longitude}`,
    address,
  };
};

const getCurrentLocation = async isPreciseLocationAllowed => {
  const balancedLocation = await requestCurrentPosition({
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 300000,
  });

  if (balancedLocation) {
    return withLocationName(balancedLocation);
  }

  if (isPreciseLocationAllowed) {
    const preciseLocation = await requestCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 60000,
    });

    if (preciseLocation) {
      return withLocationName(preciseLocation);
    }
  }

  console.log('Location Error: using Hyderabad fallback');
  return DEFAULT_LOCATION;
};

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    let isMounted = true;

    const openHome = (location = DEFAULT_LOCATION) => {
      if (isMounted) {
        navigation.replace('Home', {location});
      }
    };

    initializeApp();

    async function initializeApp() {
      try {
        const locationPermission = await ensureLocationPermission();

        if (!locationPermission.granted) {
          openHome();
          return;
        }

        const location = await getCurrentLocation(locationPermission.precise);
        openHome(location);
      } catch (error) {
        console.log('Initialization Error:', error);
        openHome();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/splash-background.png')}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#168BD3" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingContainer: {
    position: 'absolute',
    bottom: responsiveHeight(8.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
