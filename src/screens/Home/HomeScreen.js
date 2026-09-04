import React, {useCallback, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

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

import {DEFAULT_LOCATION} from '../../config/DefaultLocation';

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

const HomeScreen = ({navigation, route}) => {
  // ==================================================
  // ALL HOOKS MUST BE AT THE TOP
  // ==================================================

  const [headerGradient, setHeaderGradient] = useState([
    '#1B9CD9',
    '#7FCBEA',
  ]);

  const location =
    route?.params?.location || DEFAULT_LOCATION;

  const handleBannerChange = useCallback(background => {
    setHeaderGradient(background);
  }, []);

  const handleMaterialPress = useCallback(item => {
    console.log('Selected material:', item);
  }, []);

  const handleViewAllMaterials = useCallback(() => {
    console.log('View all materials');
  }, []);

  const handleConstructionPress = useCallback(item => {
    console.log('Construction:', item);
  }, []);

  const handleNriKnowMore = useCallback(() => {
    console.log('Know more pressed');
  }, []);

  const handleMachineryPress = useCallback(item => {
    console.log('Selected machinery:', item);
  }, []);

  const handlePieceWorkPress = useCallback(item => {
    console.log('Selected piece work:', item);
  }, []);

  const handleAdditionalServicePress = useCallback(item => {
    console.log('Selected additional service:', item);
  }, []);

  const handleRegister = useCallback(() => {
    console.log('Register pressed');
  }, []);

  const handleReadMore = useCallback(() => {
    console.log('Read more pressed');
  }, []);

  const handleMachineryViewAll = useCallback(() => {
    navigation.navigate('Machineries');
  }, [navigation]);

  const handlePieceWorksViewAll = useCallback(() => {
    navigation.navigate('PieceWorks');
  }, [navigation]);

  const handleAdditionalServicesViewAll = useCallback(() => {
    navigation.navigate('AdditionalServices');
  }, [navigation]);

  const keyExtractor = useCallback(item => item.id, []);

  const renderSection = useCallback(
    ({item}) => {
      switch (item.type) {
        case 'construction':
          return (
            <ConstructionCard
              onPressItem={handleConstructionPress}
            />
          );

        case 'NriPropertyCare':
          return (
            <NriPropertyCare
              onKnowMore={handleNriKnowMore}
            />
          );

        case 'piece-works':
          return (
            <PieceWorksCard
              onViewAll={handlePieceWorksViewAll}
              onPressItem={handlePieceWorkPress}
            />
          );

        case 'additional-services':
          return (
            <AdditionalServicesCard
              onViewAll={handleAdditionalServicesViewAll}
              onPressItem={handleAdditionalServicePress}
            />
          );

        case 'Testimonials':
          return (
            <Testimonials
              onReadMore={handleReadMore}
            />
          );

        case 'BecomeVendor':
          return (
            <BecomeVendor
              onRegister={handleRegister}
            />
          );

        case 'machineries':
          return (
            <MachineryCard
              onViewAll={handleMachineryViewAll}
              onPressItem={handleMachineryPress}
            />
          );

        case 'materials':
          return (
            <MaterialCard
              onViewAll={handleViewAllMaterials}
              onPressItem={handleMaterialPress}
            />
          );

        default:
          return null;
      }
    },
    [
      handleConstructionPress,
      handleNriKnowMore,
      handlePieceWorksViewAll,
      handlePieceWorkPress,
      handleAdditionalServicesViewAll,
      handleAdditionalServicePress,
      handleReadMore,
      handleRegister,
      handleMachineryViewAll,
      handleMachineryPress,
      handleViewAllMaterials,
      handleMaterialPress,
    ],
  );

  // ==================================================
  // UI
  // ==================================================

  return (
    <SafeAreaView
      style={styles.container}
      edges={['left', 'right', 'bottom']}>

      {/* Status Bar */}
      <StatusBar
        translucent={false}
        backgroundColor={headerGradient[0]}
        barStyle="light-content"
      />

      {/* Header */}
      <HomeHeader
        location={location}
        onBannerChange={handleBannerChange}
      />

      {/* Home Content */}
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

      {/* Bottom Tab */}
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