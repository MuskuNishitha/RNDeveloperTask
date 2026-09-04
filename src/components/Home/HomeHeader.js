import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DEFAULT_LOCATION} from '../../config/DefaultLocation';

const HomeHeader = ({location = DEFAULT_LOCATION}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.location}>{location.name}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  content: {
    flexShrink: 1,
  },
  label: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  location: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginTop: 2,
  },
});
