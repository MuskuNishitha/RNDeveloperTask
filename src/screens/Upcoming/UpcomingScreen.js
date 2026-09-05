import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BottomTab from '../../components/Home/BottomTab';

const TAB_TITLES = {
  Bookings: 'My Bookings',
  Support: 'Support',
  Account: 'Account',
};

const UpcomingScreen = ({navigation, route}) => {
  const title = TAB_TITLES[route?.name] || 'Page';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>This page is coming soon.</Text>
      </View>
      <BottomTab
        activeTab={route?.name}
        onTabPress={tab => navigation.navigate(tab)}
      />
    </SafeAreaView>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FA',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6.4),
  },
  title: {
    color: '#111827',
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
  },
  message: {
    color: '#6B7280',
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(1),
  },
});