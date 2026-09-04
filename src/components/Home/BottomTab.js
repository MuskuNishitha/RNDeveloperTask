import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TAB_ITEMS = [
  {
    key: 'Home',
    label: 'Home',
    icon: 'home-filled',
  },
  {
    key: 'Bookings',
    label: 'My Bookings',
    icon: 'event-available',
  },
  {
    key: 'Support',
    label: 'Support',
    icon: 'support-agent',
  },
  {
    key: 'Account',
    label: 'Account',
    icon: 'person',
  },
];

const ACTIVE_COLOR = '#168BD3';
const INACTIVE_COLOR = '#8A8A8A';

const BottomTab = ({activeTab = 'Home', onTabPress}) => {
  return (
    <View style={styles.container}>
      {TAB_ITEMS.map(item => {
        const isActive = item.key === activeTab;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <Pressable
            key={item.key}
            style={styles.tabItem}
            onPress={() => onTabPress?.(item.key)}>
            <MaterialIcons name={item.icon} size={25} color={color} />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    elevation: 4,
    flexDirection: 'row',
    height: 74,
    justifyContent: 'space-around',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  label: {
    color: INACTIVE_COLOR,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },
  activeLabel: {
    color: ACTIVE_COLOR,
    fontWeight: '700',
  },
});
