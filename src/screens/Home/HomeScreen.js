import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../components/Home/HomeHeader';
import {DEFAULT_LOCATION} from '../../config/DefaultLocation';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const HomeScreen = ({route}) => {
  const location = route?.params?.location || DEFAULT_LOCATION;

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader location={location} />

      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.locationLabel}>Showing services in</Text>
        <Text style={styles.locationName}>{location.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  title: {
    color: '#111827',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
  locationLabel: {
    color: '#6B7280',
    fontSize: responsiveFontSize(2),
    marginTop: 24,
  },
  locationName: {
    color: '#168BD3',
    fontSize: responsiveFontSize(2),
    fontWeight: '800',
    lineHeight: responsiveFontSize(2.8),
    marginTop: 6,
  },
});
