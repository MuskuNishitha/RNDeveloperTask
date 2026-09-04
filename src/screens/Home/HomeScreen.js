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
import NriPropertyCare from '../../components/Home/NriPropertyCare';
import BecomeVendor from '../../components/Home/BecomeVendor';
import Testimonials from '../../components/Home/Testimonials';

import { DEFAULT_LOCATION } from '../../config/DefaultLocation';

const HOME_SECTIONS = [
  {
    id: 'construction',
    type: 'construction',
  },
  {
    id: 'NriPropertyCare',
    type: 'NriPropertyCare',
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
    id: 'Testimonials',
    type: 'Testimonials',
  },
  {
    id: 'BecomeVendor',
    type: 'BecomeVendor',
  },
  {
    id: 'machineries',
    type: 'machineries',
  },
  {
    id: 'materials',
    type: 'materials',
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
        case 'construction':
          return (
            <ConstructionCard
              onPressItem={item => {
                console.log('Construction:', item);
              }}
            />
          );

        case 'NriPropertyCare':
          return (
            <NriPropertyCare
              onKnowMore={() => {
                console.log('Know more pressed');
              }}
            />
          );
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
        case 'BecomeVendor':
          return (
            <BecomeVendor
              onRegister={() => {
                console.log('Register pressed');
              }}
            />
          );
        case 'Testimonials':
          return (
            <Testimonials
              onReadMore={() => {
                console.log('Read more pressed');
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
      <HomeHeader location={location} />

      <FlatList
        data={HOME_SECTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        nestedScrollEnabled
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews
        bounces={false}
      />

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
