import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import BottomTab from '../../components/Home/BottomTab';
import HomeHeader from '../../components/Home/HomeHeader';
import MaterialCard from '../../components/Home/MaterialCard';
import MachineryCard from '../../components/Home/MachineryCard';
import PieceWorksCard from '../../components/Home/PieceWorksCard';
import AdditionalServicesCard from '../../components/Home/AdditionalServicesCard';
import ConstructionCard from '../../components/Home/ConstructionCard';

import { DEFAULT_LOCATION } from '../../config/DefaultLocation';

const HOME_SECTIONS = [
  {
    id: 'materials',
    type: 'materials',
  },
  {
    id: 'machineries',
    type: 'machineries',
  },
  {
    id: 'piece-works',
    type: 'piece-works',
  },
  {
    id: 'AdditionalServicesCard',
    type: 'additional-services',
  },
  {
    id: 'construction',
    type: 'construction',
  },
];

const HomeScreen = ({ navigation, route }) => {
  const location = route?.params?.location || DEFAULT_LOCATION;

  const handleMaterialPress = useCallback(item => {
    console.log('Selected material:', item);
  }, []);

  const handleViewAllMaterials = useCallback(() => {
    console.log('View all materials');
  }, []);

  const renderSection = useCallback(
    ({ item }) => {
      switch (item.type) {
        case 'materials':
          return (
            <MaterialCard
              onViewAll={handleViewAllMaterials}
              onPressItem={handleMaterialPress}
            />
          );
        case 'machineries':
          return (
            <MachineryCard
              onViewAll={() => {
                navigation.navigate('Machineries');
              }}
              onPressItem={item => {
                console.log('Selected machinery:', item);
              }}
            />
          );
        case 'piece-works':
          return (
            <PieceWorksCard
              onViewAll={() => {
                navigation.navigate('PieceWorks');
              }}
              onPressItem={item => {
                console.log('Selected piece work:', item);
              }}
            />
          );
        case 'additional-services':
          return (
            <AdditionalServicesCard
              onViewAll={() => {
                navigation.navigate('AdditionalServices');
              }}
              onPressItem={item => {
                console.log('Selected additional service:', item);
              }}
            />
          );
        case 'construction':
          return (
            <ConstructionCard
              onPressItem={item => {
                console.log('Construction:', item);
              }}
            />
          );
        default:
          return null;
      }
    },
    [handleMaterialPress, handleViewAllMaterials],
  );

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HomeHeader location={location} />

      {/* Home Content */}
      <FlatList
        data={HOME_SECTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        nestedScrollEnabled
        // Performance
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews
        // Avoid extra blank space
        bounces={false}
      />

      {/* Bottom Navigation */}
      <BottomTab
        activeTab={route?.name || 'Home'}
        onTabPress={tab => navigation.navigate(tab)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  contentContainer: {
    paddingBottom: 20,
  },
});
